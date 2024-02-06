const mainScreen = document.getElementById('main-screen')
const keranjang = document.getElementById('keranjang')
const scoreElement = document.getElementById('score')
const sfxKoin = new Audio('../assets/sfx/coin.mp3')
let score = 0
let jumlahCoin = 20
let koinJatuh = 0
let keranjangCordinateData

let persiapanGame = () => {
    for(let i = 0; i < jumlahCoin; i++){
        let angkaRandom = Math.ceil((Math.random() * 40) + i)
        let coin = document.createElement('img')
        coin.setAttribute('src', '../assets/icons/coin.png')
        coin.classList.add('coin')
        coin.setAttribute('id', `coinId-${i}`)
        coin.setAttribute('alt', `coin-${i}`)
        mainScreen.append(coin)
        coin.style.marginLeft = `${angkaRandom}rem`
    }
}
persiapanGame()

setInterval(() => {
    keranjangCordinateData = keranjang.getBoundingClientRect()
    if(koinJatuh === jumlahCoin) window.location.href = '../ending-state/ending.html'
}, 1)

// Pergerakan Koin
for(let i = 0; i < jumlahCoin; i++){
    setTimeout(() => {
        koinJatuh++
        let currentCoin = document.getElementById(`coinId-${i}`)
        let currentPosition = 0
        setInterval(() => {
            let cordinateKoinData = currentCoin.getBoundingClientRect()
            currentCoin.style.top = `${currentPosition += 3}px`
            if(keranjangCordinateData.x + keranjangCordinateData.width > cordinateKoinData.x && keranjangCordinateData.x < cordinateKoinData.x + cordinateKoinData.width && keranjangCordinateData.y + keranjangCordinateData.height > cordinateKoinData.y && keranjangCordinateData.y < cordinateKoinData.y + cordinateKoinData.height){
                sfxKoin.play()
                currentCoin.remove()
                score++
                scoreElement.innerHTML = `Score Kamu : ${score}`
            }
            }, 1)
    }, 1500 * i)
}

// Menggerakkan Keranjang
window.addEventListener('mousemove', e => {
    keranjangCordinateData = keranjang.getBoundingClientRect()
    keranjang.style.left = `${e.x + 5}px`
    keranjang.style.top = `${e.y + 5}px`
})