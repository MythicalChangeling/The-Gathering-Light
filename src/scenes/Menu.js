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
        this.add.text(gameWidth/2 - gameWidth/100, gameHeight - gameHeight/5, 'Use ←→ to dodge barriers', menuConfig)
        this.add.text(gameWidth/2 + gameWidth/10, gameHeight - gameHeight/6 + gameHeight/150, '& gather Lights', menuConfig)
        menuConfig.fontSize = '20px'
        this.add.text(gameWidth/2 + gameWidth/8, gameHeight - gameHeight/10, 'Press → to start', menuConfig)

        //keys setup
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
            this.scene.start('playScene')
        }
    }
}