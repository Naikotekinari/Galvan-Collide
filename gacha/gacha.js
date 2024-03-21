import { gachaStandardCharas } from "../banners.js";
import { gachaEventCharas } from "../banners.js";

let fourPity = 0;
let fivePity = 0;
let eventBanner = false;
let fiveGuaranteed = false;
let fourGuaranteed = false;

let gachaRollCharas = [""];
let item = [];
let fiveChance = 9950;
let fourChance = 9250;

console.log("Is working");

window.onload = init;
function init() {
  const onePullButton = document.getElementById("gacha1Pull");
  const tenPullButton = document.getElementById("gacha10Pull");
  const fourPityText = document.getElementById("fourPity");
  const fivePityText = document.getElementById("fivePity");
  const guaranteedText = document.getElementById("guaranteed");
  const eventBannerCheckbox = document.getElementById("enableEvent");
  const deleteLocal = document.getElementById("deleteLocal")

  let eventBannerLS = localStorage.getItem("eventBanner")
  console.log(eventBannerLS)

  if (eventBannerLS === "false") {
    eventBanner = false;
    eventBannerCheckbox.checked = false;
    console.log(`event banner is turned off (LS)`);
    localStorage.setItem("eventBanner", "false");
  } else {
    eventBanner = true;
    eventBannerCheckbox.checked = true;
    console.log(`event banner is turned on (LS)`);
    localStorage.setItem("eventBanner", "true");
  }

  let fivePityD = localStorage.getItem("fivePityD")
  let fourPityD = localStorage.getItem("fourPityD")
  let fiveGuaranteedD = localStorage.getItem("fiveGuaranteedD")

  console.log(`LS 5 pity: ${fivePityD}`)

  fivePity = fivePity + parseInt(fivePityD)
  fourPity = fourPity + parseInt(fourPityD)
  fiveGuaranteed = fiveGuaranteedD

  console.log(`base + LS 5 pity: ${fivePity}`)
  console.log(`base + LS 4 pity: ${fourPity}`)
  console.log(`five guaranteed: ${fiveGuaranteed}`)

  fourPityText.textContent = "fourPity: " + fourPity;
  fivePityText.textContent = "fivePity: " + fivePity;
  if (fiveGuaranteed === true) {
    guaranteedText.innerHTML = "guaranteed!"
  } else {
    guaranteedText.innerHTML = "not guaranteed."
  }

  onePullButton.addEventListener("click", function () {
    gachaActivate(1);
  });

  tenPullButton.addEventListener("click", function () {
    gachaActivate(10);
  });

  eventBannerCheckbox.addEventListener("click", function () {
    if (eventBanner === true) {
      eventBanner = false;
      eventBannerCheckbox.checked = false;
      console.log(`event banner is turned off`);
      localStorage.setItem("eventBanner", "false");
    } else {
      eventBanner = true;
      eventBannerCheckbox.checked = true;
      console.log(`event banner is turned on`);
      localStorage.setItem("eventBanner", "true");
    }
  });

  deleteLocal.addEventListener("click", function() {
    localStorage.clear()
  }) 

  console.log(gachaEventCharas.limited4Stars[0]);
  console.log(gachaStandardCharas.gacha3Stars[0]);

  function gachaActivate(i) {
    gachaRollCharas = [];
    fiveChance = 9950
    for (let ii = 0; ii < i; ii++) {
      gachaRoll(ii);
      console.log(fivePity);
      console.log(fourPity);
      console.log(gachaRollCharas[ii]);
      fiveChance = 9950
    }
    fourPityText.textContent = "fourPity: " + fourPity;
    fivePityText.textContent = "fivePity: " + fivePity;
    localStorage.setItem("fivePityD", fivePity)
    localStorage.setItem("fourPityD", fourPity)
    localStorage.setItem("fiveGuaranteedD", fiveGuaranteed)
    localStorage.setItem("gachaRollCharas", JSON.stringify(gachaRollCharas));
    loadResults()
  }

  function gachaRoll(i) {
    console.log("NEW ROLL")
    if (fivePity > 72) {
      fiveChance = fiveChance - fivePity * 10;
      console.log(`soft pity, current pity is: ${fiveChance}`);
      console.log(`what`)
    }
    if (fivePity > 89) {
      fiveRoll();
      console.log("5 star pity reached...");
      return (gachaRollCharas[i] = item);
    } else if (fourPity > 8) {
      let gachaRNG = RNG(10000);
      if (gachaRNG > fiveChance) {
        fiveRoll();
        console.log(`boops. big one`)
        return (gachaRollCharas[i] = item);
      } else {
        fourRoll();
        console.log("pity 4 star");
        return (gachaRollCharas[i] = item);
      }
    } else {
      let gachaRNG = RNG(10000);
      console.log(`gachaRNG: ${gachaRNG}`)
      if (gachaRNG > fiveChance) {
        fiveRoll();
        console.log(`simply lucky.`)
        return (gachaRollCharas[i] = item);
      } else if (gachaRNG > fourChance) {
        fourRoll();
        return (gachaRollCharas[i] = item);
      } else {
        threeRoll();
        return (gachaRollCharas[i] = item);
      }
    }
  }

  function fiveRoll() {
    if (eventBanner === true) {
      let eventRoll = RNG(3);
      console.log(eventRoll);
      if (eventRoll > 1 || fiveGuaranteed === true) {
        let charaRNG = RNG(gachaEventCharas.limited5Stars.length);
        console.log(`charaRNG: ${charaRNG}`);
        fivePity = 0;
        fourPity = fourPity + 1;
        fiveGuaranteed = false;
        console.log("50/530 won yippee!!");
        return item = gachaEventCharas.limited5Stars[charaRNG - 1];
      }
    }
    let charaRNG = RNG(gachaStandardCharas.gacha5Stars.length);
    console.log(`charaRNG: ${charaRNG}`);
    fivePity = 0;
    fourPity = fourPity + 1;
    fiveGuaranteed = true
    console.log("50/50 lost...");
    return item = gachaStandardCharas.gacha5Stars[charaRNG - 1];
  }
}

function fourRoll() {
  if (eventBanner === true) {
    let eventRoll = RNG(3);
    console.log(`4 star`)
    console.log(eventRoll);
    if (eventRoll > 1 || fourGuaranteed) {
      let charaRNG = RNG(gachaEventCharas.limited4Stars.length);
      console.log(`charaRNG: ${charaRNG}`);
      fourPity = 0;
      fivePity = fivePity + 1;
      fourGuaranteed = false
      console.log("event 4 star");
      return item = gachaEventCharas.limited4Stars[charaRNG - 1];
    }
  }
  let charaRNG = RNG(gachaStandardCharas.gacha4Stars.length);
  console.log(`charaRNG: ${charaRNG}`);
  fourPity = 0;
  fourGuaranteed = true;
  fivePity = fivePity + 1;
  console.log("Standard 4 star");
  return item = gachaStandardCharas.gacha4Stars[charaRNG - 1];
}

function threeRoll() {
  let charaRNG = RNG(gachaStandardCharas.gacha3Stars.length);
  console.log(`charaRNG: ${charaRNG}`);
  fivePity = fivePity + 1;
  fourPity = fourPity + 1;
  console.log("3 star. loser");
  console.log(gachaStandardCharas.gacha3Stars[charaRNG - 1]);
  return item = gachaStandardCharas.gacha3Stars[charaRNG - 1];
}

function RNG(maxNum) {
  let num = Math.floor(Math.random() * maxNum + 1);
  console.log(`the number was ${num}`);
  return num;
}

function loadResults() {
  window.location.href = "gachaResults.html"
}