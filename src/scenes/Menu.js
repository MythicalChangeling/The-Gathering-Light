class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {
        this.add.image(0, 0, 'menu').setOrigin(0)

        let menuConfig = {
            fontFamily: 'Noteworthy',
            fontSize: '28px',
            color: '#77e2ff',
            align: 'right',
        }

        //display menu text
        this.add.text(gameWidth/2 - gameWidth/30, gameHeight - gameHeight/5, 'Use ←→ to dodge obstacles', menuConfig)
        this.add.text(gameWidth/2 + gameWidth/10, gameHeight - gameHeight/6 + gameHeight/150, '& gather Lights', menuConfig)
        menuConfig.fontSize = '20px'
        this.add.text(gameWidth/2 + gameWidth/8, gameHeight - gameHeight/10, 'Press → to start', menuConfig)
        menuConfig.fontSize = '14px'
        this.add.text(gameWidth/50, gameHeight - gameHeight/75, 'Made by Evelyn Hald', menuConfig).setOrigin(0, 1)

        //keys setup
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}