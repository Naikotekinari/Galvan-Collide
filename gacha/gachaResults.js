import { gachaRollResults } from "../serverData.js"

console.log(gachaRollResults)
window.onload = init
console.log("this is working")
function init() {

const gachaImage1 = document.getElementById("gachaImage1")
const gacha1 = JSON.parse(getCookie(""))
gachaImage1.style = "width:50px"

gachaImage1.src = "/img/emetselch.png"
}
