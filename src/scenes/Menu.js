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
        this.add.text(gameWidth/2 + gameWidth/10, gameHeight - gameHeight/6, 'Press → to start', menuConfig)

        //keys setup
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
            this.scene.start('playScene')
        }
    }
}