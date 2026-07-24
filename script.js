// ---------- Unit conversions ----------

function toKg(value, unit) {

    if (unit === "kg") return value;
    if (unit === "lb") return value * 0.453592;

    return value;
}

function fuelToKg(value, unit) {

    if (unit === "kg") return value;
    if (unit === "liter") return value * 0.8;
    if (unit === "usgal") return value * 3.785 * 0.8;
    if (unit === "impgal") return value * 4.546 * 0.8;

    return value;
}

function thrustToKN(value, unit) {

    if (unit === "kN") return value;
    if (unit === "lbf") return value * 0.00444822;
    if (unit === "kgf") return value * 0.00980665;

    return value;
}

function areaToM2(value, unit) {

    if (unit === "m2") return value;
    if (unit === "ft2") return value * 0.092903;

    return value;
}

// ---------- Update table ----------

function updateRow(prefix, weight, wingArea, mil, ab) {

    document.getElementById(prefix + "Weight").textContent =
        Math.round(weight) + " kg";

    document.getElementById(prefix + "WingLoading").textContent =
        Math.round(weight / wingArea);

    document.getElementById(prefix + "MilTwr").textContent =
        (mil / (weight * 9.81 / 1000)).toFixed(2);

    document.getElementById(prefix + "AbTwr").textContent =
        (ab / (weight * 9.81 / 1000)).toFixed(2);

}

// ---------- Calculate ----------

function calculate() {

    const emptyWeight =
        toKg(
            Number(document.getElementById("emptyWeight").value),
            document.getElementById("emptyWeightUnit").value
        );

    const fuel =
        fuelToKg(
            Number(document.getElementById("fuel").value),
            document.getElementById("fuelUnit").value
        );

    const mtow =
        toKg(
            Number(document.getElementById("maxWeight").value),
            document.getElementById("maxWeightUnit").value
        );

    const mil =
        thrustToKN(
            Number(document.getElementById("milPower").value),
            document.getElementById("milUnit").value
        );

    const ab =
        thrustToKN(
            Number(document.getElementById("abPower").value),
            document.getElementById("abUnit").value
        );

    const wingArea =
        areaToM2(
            Number(document.getElementById("wingArea").value),
            document.getElementById("wingAreaUnit").value
        );

    // ---------- Base Weight ----------

    const baseWeight =
        emptyWeight +
        100 +
        fuel * 0.5;

    // ---------- Payload ----------

    const payload =
        mtow - baseWeight;

    // ---------- Load Classes ----------

    const lightWeight =
        baseWeight;

    const mediumWeight =
        baseWeight +
        payload * 0.50;

    const heavyWeight =
        baseWeight +
        payload * 0.75;

    // ---------- Update ----------

    updateRow("light", lightWeight, wingArea, mil, ab);

    updateRow("medium", mediumWeight, wingArea, mil, ab);

    updateRow("heavy", heavyWeight, wingArea, mil, ab);

}

// ---------- Reset ----------

function resetForm() {

    document.querySelectorAll("input").forEach(input => input.value = "");

    document.querySelectorAll("td").forEach(td => {

        if (td.id) td.textContent = "-";

    });

}

// ---------- Buttons ----------

document
    .getElementById("calculateBtn")
    .addEventListener("click", calculate);

document
    .getElementById("resetBtn")
    .addEventListener("click", resetForm);
