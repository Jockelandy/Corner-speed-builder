// Corner Speed Builder v0.4

document.getElementById("calculateBtn").addEventListener("click", calculate);
document.getElementById("resetBtn").addEventListener("click", resetForm);

// ----------------------
// Unit conversions
// ----------------------

function toKg(value, unit) {
    return unit === "lb" ? value * 0.453592 : value;
}

function fuelToKg(value, unit) {

    switch (unit) {

        case "kg":
            return value;

        case "liter":
            return value * 0.80;

        case "usgal":
            return value * 3.78541 * 0.80;

        case "impgal":
            return value * 4.54609 * 0.80;

        default:
            return value;

    }

}

function thrustToKN(value, unit) {
    return unit === "lbf" ? value * 0.00444822 : value;
}

function areaToM2(value, unit) {
    return unit === "ft2" ? value * 0.092903 : value;
}

// ----------------------
// Calculate
// ----------------------

function calculate() {

    let emptyWeight = toKg(
        Number(document.getElementById("emptyWeight").value),
        document.getElementById("emptyWeightUnit").value
    );

    let fuel = fuelToKg(
        Number(document.getElementById("fuel").value),
        document.getElementById("fuelUnit").value
    );

    let mtow = toKg(
        Number(document.getElementById("maxWeight").value),
        document.getElementById("maxWeightUnit").value
    );

    let milPower = thrustToKN(
        Number(document.getElementById("milPower").value),
        document.getElementById("milUnit").value
    );

    let abPower = thrustToKN(
        Number(document.getElementById("abPower").value),
        document.getElementById("abUnit").value
    );

    let wingArea = areaToM2(
        Number(document.getElementById("wingArea").value),
        document.getElementById("wingAreaUnit").value
    );

    // Basvikt

    const baseWeight =
        emptyWeight +
        100 +
        fuel * 0.5;

    // Lastklasser

    const lightWeight =
        baseWeight + (mtow - baseWeight) * 0.33;

    const mediumWeight =
        baseWeight + (mtow - baseWeight) * 0.66;

    const heavyWeight =
        mtow;

    updateRow(
        "light",
        lightWeight,
        wingArea,
        milPower,
        abPower
    );

    updateRow(
        "medium",
        mediumWeight,
        wingArea,
        milPower,
        abPower
    );

    updateRow(
        "heavy",
        heavyWeight,
        wingArea,
        milPower,
        abPower
    );

}

// ----------------------
// Update table
// ----------------------

function updateRow(prefix, weight, wingArea, milPower, abPower) {

    const wingLoading =
        weight / wingArea;

    const milTwr =
        milPower /
        (weight * 9.81 / 1000);

    const abTwr =
        abPower /
        (weight * 9.81 / 1000);

    document.getElementById(prefix + "Weight").textContent =
        weight.toFixed(0);

    document.getElementById(prefix + "WingLoading").textContent =
        wingLoading.toFixed(0);

    document.getElementById(prefix + "MilTwr").textContent =
        milTwr.toFixed(2);

    document.getElementById(prefix + "AbTwr").textContent =
        abTwr.toFixed(2);

}

// ----------------------
// Reset
// ----------------------

function resetForm() {

    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });

    document.querySelectorAll("select").forEach(select => {
        select.selectedIndex = 0;
    });

    [
        "light",
        "medium",
        "heavy"
    ].forEach(prefix => {

        document.getElementById(prefix + "Weight").textContent = "-";
        document.getElementById(prefix + "WingLoading").textContent = "-";
        document.getElementById(prefix + "MilTwr").textContent = "-";
        document.getElementById(prefix + "AbTwr").textContent = "-";

    });

}
