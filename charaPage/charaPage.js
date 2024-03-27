import { tempSaveData } from "../tempSaveData.js"
import { charas } from "../charas.js"

window.onload = init()

function init() {
  let charaData = tempSaveData
  let charaButtons = []

  console.log(`chara name: ${charas[1].name} and their priority: ${charas[1].priority}`)
  console.log(`charaData level: ${charaData[1].level} and their cons: ${charaData[1].cons}`)

  charaPriorityCalc()
  charaData = charaData.sort(bubbleSortArray)
  console.log(charaData)

  const backButton = document.getElementById("backButton")

  for (let i = 0; i < 20; i++) { 
    charaButtons[i] = document.getElementById("charaButton" + (i + 1))
    if (charaData[i] !== undefined) {
    charaButtons[i].src = "/" + charas[charaData[i].charaID].img
    } else {
      charaButtons[i].src = "/img/dummy1.png"
    }
  }

  backButton.addEventListener("click", function () {
    window.location.href = "/index.html"
  })

  charaButtons[0].addEventListener("click", function () {
    console.log("Working")
    //temp solution, fix with proper localStorage afterwards
    localStorage.setItem("charaInfoPage", charas[charaData[0].charaID])
    window.location.href = "charaInfoPage.html"
  })

  function charaPriorityCalc() {
    for (let i = 0; i < charaData.length; i++) {
      charaData[i].calcPrio = (charaData[i].level * 300) + charas[charaData[i].charaID].priority
      console.log(`character ${i} priority: ${charaData[i].calcPrio}`)
    }
  }

  function bubbleSortArray(a, b) {
    if (a.calcPrio === b.calcPrio) {
      console.log(`a equals 3`)
      return 0;
    }
    return a.calcPrio > b.calcPrio ? -1 : 1;
  }


  
  
}