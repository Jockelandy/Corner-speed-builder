// function calculate() {

    // INPUT

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

    // BASVIKT
    const baseWeight = emptyWeight + 100 + (fuel * 0.5);

    // LASTKLASSER
    const lightWeight = baseWeight + (mtow - baseWeight) * 0.33;
    const mediumWeight = baseWeight + (mtow - baseWeight) * 0.66;
    const heavyWeight = mtow;

    function calc(weight) {
        return {
            weight: weight,
            wingLoading: weight / wingArea,
            milTwr: milPower / (weight * 9.81 / 1000),
            abTwr: abPower / (weight * 9.81 / 1000)
        };
    }

    const light = calc(lightWeight);
    const medium = calc(mediumWeight);
    const heavy = calc(heavyWeight);

    // OUTPUT
    document.getElementById("lightWeight").textContent = light.weight.toFixed(0);
    document.getElementById("lightWingLoading").textContent = light.wingLoading.toFixed(0);
    document.getElementById("lightTwr").textContent = light.abTwr.toFixed(2);

    document.getElementById("mediumWeight").textContent = medium.weight.toFixed(0);
    document.getElementById("mediumWingLoading").textContent = medium.wingLoading.toFixed(0);
    document.getElementById("mediumTwr").textContent = medium.abTwr.toFixed(2);

    document.getElementById("heavyWeight").textContent = heavy.weight.toFixed(0);
    document.getElementById("heavyWingLoading").textContent = heavy.wingLoading.toFixed(0);
    document.getElementById("heavyTwr").textContent = heavy.abTwr.toFixed(2);

}
