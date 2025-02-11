//Evelyn Hald
//The Gathering Light
//Time Spent: ~30 hrs
//Creative Tilt: I'm very proud of the crystal mechanics where the player can temporarily reverse gravity, it was interesting to implement and made for several fascinating edge cases that I had to debug and work around. For style, I'm fairly happy with the art that I made, particularly the animations for picking up the lights and the crystals. I also think that the music I made, while simple, contributes well to the overall feel I was aiming for.

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 750,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        },
    },
    scene: [Load, Menu, Play]
}

let game = new Phaser.Game(config)

let gameWidth = game.config.width
let gameHeight = game.config.height
let flySpeed = 1.5
let dodgeSpeed = 250
let obstacleSpeed = -200
let speedMax = -1000
let MCSpeed = 0
let holdObstacleSpeed = -200
let holdFlySpeed = 1.5
let obstacleWidth = 156
let spawnCrystals = false
let gameOver = false