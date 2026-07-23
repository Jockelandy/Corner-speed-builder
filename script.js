// Corner Speed Builder v0.2

document.getElementById("calculateBtn").addEventListener("click", calculate);
document.getElementById("resetBtn").addEventListener("click", resetForm);

function calculate() {

    // ---------- INPUT ----------

    let emptyWeight = Number(document.getElementById("emptyWeight").value);
    let fuel = Number(document.getElementById("fuel").value);
    let externalLoad = Number(document.getElementById("externalLoad").value);

    let milPower = Number(document.getElementById("milPower").value);
    let abPower = Number(document.getElementById("abPower").value);
    let wingArea = Number(document.getElementById("wingArea").value);

    // ---------- UNITS ----------

    const emptyWeightUnit = document.getElementById("emptyWeightUnit").value;
    const fuelUnit = document.getElementById("fuelUnit").value;
    const externalLoadUnit = document.getElementById("externalLoadUnit").value;

    const milUnit = document.getElementById("milUnit").value;
    const abUnit = document.getElementById("abUnit").value;
    const wingAreaUnit = document.getElementById("wingAreaUnit").value;

    // ---------- WEIGHT ----------

    if (emptyWeightUnit === "lb")
        emptyWeight *= 0.453592;

    if (externalLoadUnit === "lb")
        externalLoad *= 0.453592;

    // ---------- FUEL ----------

    switch (fuelUnit) {

        case "liter":
            fuel *= 0.8;
            break;

        case "usgal":
            fuel *= 3.785 * 0.8;
            break;

        case "impgal":
            fuel *= 4.546 * 0.8;
            break;

    }

    // ---------- THRUST ----------

    if (milUnit === "lbf")
        milPower *= 0.00444822;

    if (abUnit === "lbf")
        abPower *= 0.00444822;

    // ---------- WING AREA ----------

    if (wingAreaUnit === "ft2")
        wingArea *= 0.092903;

    // ---------- CALCULATIONS ----------

    const calculatedWeight =
        emptyWeight +
        100 +
        (fuel * 0.5);

    const wingLoading =
        calculatedWeight / wingArea;

    const twr =
        abPower / (calculatedWeight * 9.81 / 1000);

    // ---------- OUTPUT ----------

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

    document.getElementById("calcWeight").value = "";
    document.getElementById("wingLoading").value = "";
    document.getElementById("twr").value = "";

}
