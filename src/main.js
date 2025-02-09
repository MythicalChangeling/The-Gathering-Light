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
            debug: true
        },
    },
    scene: [Load, Menu, Play, GameOver]
}

let game = new Phaser.Game(config)

let gameWidth = game.config.width
let gameHeight = game.config.height