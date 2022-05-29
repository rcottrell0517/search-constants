// Adds date and time to the page
document.getElementById("date").innerText = new Date();

// Puts the focus on the rated current input field
window.onload = function () {
  document.getElementById("Whatistheratedcurrent").focus();
};

// Pulls the data from local storage and adds to the appropriate input fields
document.getElementById("K1").value = localStorage.getItem("myTconK1");
document.getElementById("K2").value = localStorage.getItem("myTconK2");
document.getElementById("n").value = localStorage.getItem("myTconN");
document.getElementById("timeConstant").value =
  localStorage.getItem("myTconTime");

let d = new Date();
let val = d;


// Adds the style number to the heading of the page
document.getElementById("po").innerHTML =
  localStorage.getItem("myTconStyle") +
  " Thermal Contants for Calculating The Loss of Life";

// Calculates both per unit current before, at overload and Hottest Spot Rise before Overload
function perUnitCurrentBeforeOverload(x, y) {
  return x / y;
}

function perUnitCurrentAtOverload(x, y) {
  return x / y;
}

function doCalculation() {
  let n1 = Number(document.getElementById("Whatistheoperatingcurrent").value);
  let n2 = Number(document.getElementById("Whatistheratedcurrent").value);
  let n3 = Number(document.getElementById("Whatistheoverloadcurrent").value);

  let findPerUnitBeforeOverload = perUnitCurrentBeforeOverload(n1, n2);
  let findPerUnitAtOverload = perUnitCurrentBeforeOverload(n3, n2);

  document.getElementById("perUnitCurrentbeforeOverload").value =
    findPerUnitBeforeOverload.toFixed(2);
  document.getElementById("perUnitCurrentatOverload").value =
    findPerUnitAtOverload.toFixed(2);

  let K1 = Number(document.getElementById("K1").value);
  let K2 = Number(document.getElementById("K2").value);
  let n = Number(document.getElementById("n").value);
  let WhatisthetopoiltemperaturerisebeforeoverloadinCelsius = Number(
    document.getElementById(
      "WhatisthetopoiltemperaturerisebeforeoverloadinCelsius"
    ).value
  );
  let WhatisthetopoiltemperatureriseafteroverloadinCelsius = Number(
    document.getElementById(
      "WhatisthetopoiltemperatureriseafteroverloadinCelsius"
    ).value
  );

  let Whatisthetotalelapsedtimeoftheoverloadinminutes = Number(
    document.getElementById("Whatisthetotalelapsedtimeoftheoverloadinminutes")
      .value
  );
  let Whatisthetransformeroiltimeconstantinminutes = Number(
    document.getElementById("Whatisthetransformeroiltimeconstantinminutes")
      .value
  );
  let timeConstant = Number(document.getElementById("timeConstant").value);

  // console.log(findPerUnitAtOverload);
  // console.log(findPerUnitBeforeOverload);

  // Calculates the value of Hottest Spot Rise before Overload C
  let results =
    K1 * findPerUnitBeforeOverload ** n +
    K2 * WhatisthetopoiltemperaturerisebeforeoverloadinCelsius;

  document.getElementById("HottestSpotRisebeforeOverload").value =
    results.toFixed(2);

    

  paren1 = findPerUnitAtOverload.toFixed(2) ** n;
  paren2 =
    WhatisthetopoiltemperatureriseafteroverloadinCelsius -
    WhatisthetopoiltemperaturerisebeforeoverloadinCelsius +
    WhatisthetopoiltemperaturerisebeforeoverloadinCelsius;
  paren3 =
    Whatisthetotalelapsedtimeoftheoverloadinminutes /
    Whatisthetransformeroiltimeconstantinminutes;
  paren4 = Whatisthetotalelapsedtimeoftheoverloadinminutes / timeConstant;

  console.log(paren1);
  console.log(paren2);
  console.log(paren3);
  console.log(paren4);

  let results1 = K1 * paren1 + K2 * paren2;

  // let results1 =
  //   K1 * paren1 + (K2 * (WhatisthetopoiltemperaturerisebeforeoverloadinCelsius +
  //       paren2 * Math.log(paren3)) - results) * Math.log(paren4);

  console.log(results1);

  document.getElementById("DeltaHottestSpotRiseDuetoOverload").value =
    results1.toFixed(2);

  let results2 = results1 + results;

  console.log(results2);

  document.getElementById("HottestSpotRiseatendofOverload").value =
    results2.toFixed(2);

  let maxAmbient = document.getElementById(
    "WhatisthemaximumambientinCelsius"
  ).value;

  let results3 = Number(results2) + Number(maxAmbient);

  document.getElementById("HottestSpotAbsoluteatendofOverloadC").value =
    results3.toFixed(2);

  let results4 = results3 + 273;

  document.getElementById("HottestSpotAbsoluteatendofOverloadK").value =
    results4.toFixed(2);
    

// Start of calculating the loss of life percentage    
  const A = 14.133;
  const B = 6972.15;

  let lossLife1st = Whatisthetotalelapsedtimeoftheoverloadinminutes / 60;
  let lossLife2nd = B / results4 - A;

  lossLife();

  function lossLife() {
    let newResults3 = results3;
    console.log(newResults3);
    if (newResults3 > 105) {
      lossLife3rd = lossLife1st / 10 ** lossLife2nd;
      document.getElementById("info").innerHTML =
        "Loss of Life is" + " " + lossLife3rd.toFixed(3) + "%";
    } else {
      document.getElementById("info").innerHTML = "None";
    }
  }
}

//https://www.youtube.com/watch?v=gxOCF5r6BJg
//https://www.youtube.com/watch?v=oDUjP4N_MtQ
//https://www.youtube.com/watch?v=gxOCF5r6BJg
//https://www.youtube.com/watch?v=oDUjP4N_MtQ
//https://www.youtube.com/watch?v=lrayWWmzde4
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math
