class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        this.cave = this.add.tileSprite(0, 0, 600, 1048, 'cave').setOrigin(0)
        
        //keys setup
        this.keys = this.input.keyboard.createCursorKeys()

        // this.mc = this.physics.add.sprite(gameWidth/2, gameHeight/5, 'mc', 0)
        // this.mc.body.setCircle(this.mc.width/2)
        // this.mc.body.setCollideWorldBounds(true)
        this.mc = new MC(this, gameWidth/2, gameHeight/5, 'mc', 0)

        //UI setup
        this.UILight = this.add.sprite(gameWidth/100, gameHeight/150, 'light', 0).setOrigin(0).setScale(.75)
        this.UICrystal = this.add.sprite(gameWidth/150, gameHeight/19, 'crystal', 0).setOrigin(0).setScale(.75)

        this.lights = 0
        this.crystals = 0
        let UIConfig = {
            fontFamily: 'Zapfino',
            fontSize: '16px',
            color: '#d7fffe',
            align: 'left'
        }

        this.lightScore = this.add.text(gameWidth/17, gameHeight/100, this.lights, UIConfig)
        this.crystalScore = this.add.text(gameWidth/17, gameHeight/17, this.crystals, UIConfig)
    }

    update() {
        this.cave.tilePositionY += flySpeed

        //keep UI in front
        this.children.bringToTop(this.UILight)
        this.children.bringToTop(this.UICrystal)
        this.children.bringToTop(this.lightScore)
        this.children.bringToTop(this.crystalScore)

        this.mc.update()

        // this.mc.play('mc-flying', true)

        // left/right movement
        // let moveDirection = new Phaser.Math.Vector2(0, 0)
        // if(this.keys.left.isDown) {
        //     moveDirection.x = -1
        // } else if(this.keys.right.isDown) {
        //     moveDirection.x = 1
        // }
        // this.mc.setVelocity(dodgeSpeed*moveDirection.x, 0)
    }
}

//code to add sprites
// let over = this.add.sprite(0, 0, 'game-over', 0).setOrigin(0)

//code for playing animations:
// crystal.play('crystal-get')
// light.play('light-get')
// mc.play('mc-flying')
// over.play('game-over')