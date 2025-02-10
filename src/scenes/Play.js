class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        this.cave = this.add.tileSprite(0, 0, 600, 1048, 'cave').setOrigin(0)
        
        //keys setup
        this.keys = this.input.keyboard.createCursorKeys()

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

        this.obstacleGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        //first obstacle
        this.time.delayedCall(1000, () => {
            this.newObstacle()
        })
        
    }

    update() {
        this.cave.tilePositionY += flySpeed

        //keep UI in front
        this.children.bringToTop(this.UILight)
        this.children.bringToTop(this.UICrystal)
        this.children.bringToTop(this.lightScore)
        this.children.bringToTop(this.crystalScore)

        this.mc.update()
    }

    newObstacle(scene, speed) {
        this.colors = ['blue', 'pink', 'purple']
        let random = Math.floor(Math.random()*this.colors.length)
        let obstacle = new Obstacle(this, obstacleSpeed, Phaser.Math.Between(obstacleWidth/2, gameWidth - obstacleWidth/2), gameHeight, this.colors[random] + '-obstacle').setOrigin(.5, 0)
        this.obstacleGroup.add(obstacle)
    }
}

//code to add sprites
// let over = this.add.sprite(0, 0, 'game-over', 0).setOrigin(0)

//code for playing animations:
// crystal.play('crystal-get')
// light.play('light-get')
// mc.play('mc-flying')
// over.play('game-over')