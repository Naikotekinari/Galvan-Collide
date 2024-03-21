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
let fourChance = 9200;

console.log("Is working");

window.onload = init;
function init() {
  const onePullButton = document.getElementById("gacha1Pull");
  const tenPullButton = document.getElementById("gacha10Pull");
  const fourPityText = document.getElementById("fourPity");
  const fivePityText = document.getElementById("fivePity");
  const guaranteedText = document.getElementById("guaranteed?");
  const eventBannerCheckbox = document.getElementById("enableEvent");

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

  console.log(gachaEventCharas.limited4Stars[0]);
  console.log(gachaStandardCharas.gacha3Stars[0]);

  function gachaActivate(i) {
    gachaRollCharas = [];
    for (let ii = 0; ii < i; ii++) {
      gachaRoll(ii);
      console.log(fivePity);
      console.log(fourPity);
      console.log(gachaRollCharas[0]);
    }
    fourPityText.textContent = fourPity;
    fivePityText.textContent = fivePity;
    localStorage.setItem("gachaRollCharas", JSON.stringify(gachaRollCharas));
    window.location.href = "gachaResults.html"
  }

  function gachaRoll(i) {
    if (fivePity > 72) {
      fiveChance = 9950 - fivePity * 10;
      console.log(`soft pity, current pity is: ${fiveChance}`);
    }
    if (fivePity > 89) {
      fiveRoll();
      console.log("5 star pity reached...");
      return (gachaRollCharas[i] = item);
    } else if (fourPity > 8) {
      let gachaRNG = RNG(10000);
      if (gachaRNG > fiveChance) {
        fiveRoll();
        return (gachaRollCharas[i] = item);
      } else {
        fourRoll();
        console.log("pity 4 star");
        return (gachaRollCharas[i] = item);
      }
    } else {
      let gachaRNG = RNG(10000);
      if (gachaRNG > fiveChance) {
        fiveRoll();
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
    console.log("50/50 lost...");
    return item = gachaStandardCharas.gacha5Stars[charaRNG - 1];
  }
}

function fourRoll() {
  if (eventBanner === true) {
    let eventRoll = RNG(3);
    console.log(eventRoll);
    if (eventRoll > 1 || fourGuaranteed) {
      let charaRNG = RNG(gachaEventCharas.limited4Stars.length);
      console.log(`charaRNG: ${charaRNG}`);
      fourPity = 0;
      fivePity = fivePity + 1;
      console.log("event 4 star");
      return item = gachaEventCharas.limited4Stars[charaRNG - 1];
    }
  }
  let charaRNG = RNG(gachaStandardCharas.gacha4Stars.length);
  console.log(`charaRNG: ${charaRNG}`);
  fourPity = 0;
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
