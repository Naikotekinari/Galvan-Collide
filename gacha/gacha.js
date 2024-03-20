let fourPity = 0
let fivePity = 0
let eventBanner = false
let fiveGuaranteed = false

let gachaRollCharas = []
let fiveChance = 9950
let fourChance = 9200

console.log("Is working")

window.onload = init
function init() {
    const onePullButton = document.getElementById("gacha1Pull")
    const tenPullButton = document.getElementById("gacha10Pull")
    const fourPityText = document.getElementById("fourPity")
    const fivePityText = document.getElementById("fivePity")
    const guaranteedText = document.getElementById("guaranteed?")
    const eventBannerCheckbox = document.getElementById("enableEvent")

    onePullButton.addEventListener('click', function() {
        gachaActivate(1)
    })

    tenPullButton.addEventListener('click', function() {
        gachaActivate(10)
    })

    function gachaActivate(i) {
        for (let ii = 0; ii = i; i++) {
            gachaRoll(ii)
         }
    }   

    function gachaRoll(i) {
        if (fivePity > 72) {
            fiveChance = (9950 - (fivePity * 10))
            console.log(fiveChance)
        }
        if (fivePity > 89) {
            fiveRoll()
            console.log("5 star pity reached...")
            return 
        }
    }
}