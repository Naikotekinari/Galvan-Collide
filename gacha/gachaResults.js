//import { gachaRollResults } from "../serverData.js"
import { charas } from "/charas.js";

window.onload = init;
console.log("this is working");
console.log(`should show only zenos: ${charas[1].name}`);
function init() {
  let gachaImages = []
  for (let i = 0; i < 10; i++) {
    gachaImages[i] = document.getElementById("gachaImage" + (i + 1))
  }

  const returnGacha = document.getElementById("returnGacha")

  returnGacha.addEventListener("click", function () {
    window.location.href = "gacha.html"
  })

  console.log(gachaImages)
  console.log(charas);
  let charaImg = [];
  let gachaRollResults = localStorage.getItem("gachaRollCharas");
  gachaRollResults = JSON.parse(gachaRollResults)
  console.log(gachaRollResults)

  for (let i = 0; i < 10; i++) {
    charaImg[i] = charas[gachaRollResults[i].charaID]
    console.log(charaImg[i])
    gachaImages[i].src = "/" + charaImg[i].img
  }
  
  console.log(charaImg[0].name)
}
