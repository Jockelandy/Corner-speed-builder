// Corner Speed Builder v0.3

document.getElementById("calculateBtn").addEventListener("click", calculate);
document.getElementById("resetBtn").addEventListener("click", resetForm);

function toKg(value, unit) {
    switch (unit) {
        case "lb":
            return value * 0.453592;
        default:
            return value;
    }
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

    if (unit === "lbf")
        return value * 0.00444822;

    return value;

}

function areaToM2(value, unit) {

    if (unit === "ft2")
        return value * 0.092903;

    return value;

}

function calculate() {

    // INPUT

    let emptyWeight = Number(document.getElementById("emptyWeight").value);
    let fuel = Number(document.getElementById("fuel").value);
    let externalLoad = Number(document.getElementById("externalLoad").value);

    let abPower = Number(document.getElementById("abPower").value);

    let wingArea = Number(document.getElementById("wingArea").value);

    // CONVERT

    emptyWeight = toKg(
        emptyWeight,
        document.getElementById("emptyWeightUnit").value
    );

    externalLoad = toKg(
        externalLoad,
        document.getElementById("externalLoadUnit").value
    );

    fuel = fuelToKg(
        fuel,
        document.getElementById("fuelUnit").value
    );

    abPower = thrustToKN(
        abPower,
        document.getElementById("abUnit").value
    );

    wingArea = areaToM2(
        wingArea,
        document.getElementById("wingAreaUnit").value
    );

    // CALCULATED WEIGHT

    const calculatedWeight =
        emptyWeight +
        100 +
        (fuel * 0.5) +
        externalLoad;

    // WING LOADING

    const wingLoading =
        calculatedWeight / wingArea;

    // TWR

    const twr =
        abPower /
        (calculatedWeight * 9.81 / 1000);

    // OUTPUT

    document.getElementById("calcWeight").value =
        calculatedWeight.toFixed(0);

    document.getElementById("wingLoading").value =
        wingLoading.toFixed(0);

    document.getElementById("twr").value =
        twr.toFixed(2);

}

function resetForm() {

    document.querySelectorAll("input").forEach(input => {

        if (!input.readOnly)
            input.value = "";

    });

    document.querySelectorAll("select").forEach(select => {

        select.selectedIndex = 0;

    });

    document.getElementById("calcWeight").value = "";
    document.getElementById("wingLoading").value = "";
    document.getElementById("twr").value = "";

}
