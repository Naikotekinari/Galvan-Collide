import { gachaRollCharas } from "./gacha/gacha.js"

export let gachaRollResults = []
window.onload = init
function init() {
    gachaRollResults = gachaRollCharas
    console.log(gachaRollResults)
}