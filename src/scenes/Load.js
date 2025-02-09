class Load extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload(){
        this.load.path = './assets/'

        this.load.image('menu', 'bg-menu.png')

        this.load.spritesheet('crystal', 'crystal.png', {
            frameWidth: 45,
            frameHeight: 61
        })
    }

    create() {
        this.add.image(0, 0, 'menu').setOrigin(0, 0)
        this.crystal = this.add.sprite(gameWidth / 2, gameHeight / 2, 'crystal', 0).setOrigin(0)

        this.crystal.anims.create({
            key: 'crystal-get',
            frameRate: 10,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('crystal', {start: 0, end: 7})
        })

        this.crystal.anims.play('crystal-get')

    }

    update() {
        
    }
}