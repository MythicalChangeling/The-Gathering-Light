//Evelyn Hald
//Gatherer
//Time Spent:
//Creative Tilt:

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
let MCSpeed = 0
let holdObstacleSpeed = -200
let holdFlySpeed = 1.5
let obstacleWidth = 156
let gameOver = false