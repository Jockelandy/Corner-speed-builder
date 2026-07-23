document.getElementById("calculateBtn").addEventListener("click", calculateAircraft);

function calculateAircraft() {

  const emptyWeight = Number(document.getElementById("emptyWeight").value) || 0;
  const fuel = Number(document.getElementById("fuel").value) || 0;
  const wingArea = Number(document.getElementById("wingArea").value) || 0;

  if (wingArea <= 0) {
    alert("Ange vingyta.");
    return;
  }

  // Beräkningsvikt = Tomvikt + Pilot + 50 % internbränsle
  const calcWeight = emptyWeight + 100 + (fuel * 0.5);

  // Wing Loading
  const wingLoading = calcWeight / wingArea;

  // Visa resultat
  document.getElementById("calcWeight").value = Math.round(calcWeight);
  document.getElementById("wingLoading").value = Math.round(wingLoading);

}
