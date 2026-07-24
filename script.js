function calculate() {

    // ===== INPUT =====

    const emptyWeight = Number(document.getElementById("emptyWeight").value) || 0;
    const internalFuel = Number(document.getElementById("internalFuel").value) || 0;
    const externalLoad = Number(document.getElementById("externalLoad").value) || 0;

    const milThrust = Number(document.getElementById("milThrust").value) || 0;
    const abThrust = Number(document.getElementById("abThrust").value) || 0;
    const wingArea = Number(document.getElementById("wingArea").value) || 1;

    const pilotWeight = 100;

    // ===== CURRENT WEIGHT =====

    const currentWeight =
        emptyWeight +
        pilotWeight +
        (internalFuel * 0.5) +
        externalLoad;

    // ===== LOAD POINTS =====

    const loadPoints = Math.round(externalLoad / 500);

    // ===== CURRENT PERFORMANCE =====

    const currentWingLoading =
        currentWeight / wingArea;

    const currentMilTwr =
        milThrust /
        (currentWeight * 9.81 / 1000);

    const currentAbTwr =
        abThrust /
        (currentWeight * 9.81 / 1000);

    // ===== EBK INDEX =====

    const fuelTon =
        internalFuel / 1000;

    const ebkIndex =
        currentAbTwr *
        Math.sqrt(fuelTon) *
        50;

    // ===== FUEL POINTS =====

    let fuelPoints =
        Math.floor(ebkIndex / 10);

    if (fuelPoints < 0) fuelPoints = 0;
    if (fuelPoints > 13) fuelPoints = 13;

    // ===== LIGHT / MEDIUM / HEAVY =====

    const lightWeight =
        currentWeight;

    const mediumWeight =
        currentWeight + 1000;

    const heavyWeight =
        currentWeight + 2000;

    updateRow(
        "light",
        lightWeight,
        wingArea,
        milThrust,
        abThrust
    );

    updateRow(
        "medium",
        mediumWeight,
        wingArea,
        milThrust,
        abThrust
    );

    updateRow(
        "heavy",
        heavyWeight,
        wingArea,
        milThrust,
        abThrust
    );

    // ===== RESULTS =====

    document.getElementById("currentWeight").textContent =
        currentWeight.toFixed(0) + " kg";

    document.getElementById("currentWingLoading").textContent =
        currentWingLoading.toFixed(0);

    document.getElementById("currentMilTwr").textContent =
        currentMilTwr.toFixed(2);

    document.getElementById("currentAbTwr").textContent =
        currentAbTwr.toFixed(2);

    document.getElementById("loadPoints").textContent =
        loadPoints;

    document.getElementById("ebkIndex").textContent =
        ebkIndex.toFixed(0);

    document.getElementById("fuelPoints").textContent =
        fuelPoints;
}


function updateRow(prefix, weight, wingArea, milThrust, abThrust) {

    const wingLoading =
        weight / wingArea;

    const milTwr =
        milThrust /
        (weight * 9.81 / 1000);

    const abTwr =
        abThrust /
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


function resetForm() {

    const inputs =
        document.querySelectorAll("input");

    inputs.forEach(input => input.value = "");

    const ids = [

        "currentWeight",
        "currentWingLoading",
        "currentMilTwr",
        "currentAbTwr",

        "loadPoints",
        "ebkIndex",
        "fuelPoints",

        "lightWeight",
        "lightWingLoading",
        "lightMilTwr",
        "lightAbTwr",

        "mediumWeight",
        "mediumWingLoading",
        "mediumMilTwr",
        "mediumAbTwr",

        "heavyWeight",
        "heavyWingLoading",
        "heavyMilTwr",
        "heavyAbTwr"

    ];

    ids.forEach(id => {
        document.getElementById(id).textContent = "-";
    });

}
