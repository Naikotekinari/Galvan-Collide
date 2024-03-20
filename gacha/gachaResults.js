//import { gachaRollResults } from "../serverData.js"

window.onload = init
console.log("this is working")
function init() {
    let gachaRollResults = localStorage.getItem("gachaRollCharas")
    console.log(gachaRollResults)
}
