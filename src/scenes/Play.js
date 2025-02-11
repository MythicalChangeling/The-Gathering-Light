class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        flySpeed = 1.5
        this.cave = this.add.tileSprite(0, 0, 600, 1048, 'cave').setOrigin(0)
        
        //keys setup
        this.keys = this.input.keyboard.createCursorKeys()

        this.mc = new MC(this, gameWidth/2, gameHeight/5, 'mc', 0)
        MCSpeed = 0

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

        //Collision groups setup
        this.obstacleGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        this.lightGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        this.crystalGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        this.firstCrystal = true
        this.useCrystal = false 

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
        
        // check for collisions
        if (!gameOver) {
            this.physics.world.collide(this.mc, this.lightGroup, this.lightCollide, null, this)
            this.physics.world.collide(this.mc, this.crystalGroup, this.crystalCollide, null, this)
            this.physics.world.collide(this.mc, this.obstacleGroup, this.obstacleCollide, null, this)
        }

        if (gameOver) {
            if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
                gameOver = false
                this.scene.start('menuScene')
            }
            if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
                gameOver = false
                this.scene.start('playScene')
            }
        }
    }

    newObstacle(scene, speed) {
        this.colors = ['blue', 'pink', 'purple']
        let random = Math.floor(Math.random()*this.colors.length)
        let obstacle = new Obstacle(this, obstacleSpeed, Phaser.Math.Between(obstacleWidth/2, gameWidth - obstacleWidth/2), gameHeight, this.colors[random] + '-obstacle').setOrigin(.5, 0)
        this.obstacleGroup.add(obstacle)
    }

    lightCollide(object1, object2) {
        object2.play('light-get', true)
        this.lights += 1
        this.lightScore.text = this.lights
        this.lightGroup.remove(object2)
        object2.once('animationcomplete', () => {
            object2.destroy()
        })
    }

    crystalCollide(object1, object2) {
        object2.play('crystal-get', true)
        this.crystals += 1
        this.crystalScore.text = this.crystals
        this.crystalGroup.remove(object2)
        object2.once('animationcomplete', () => {
            object2.destroy()
        })
    }

    obstacleCollide(object1, object2) {
        gameOver = true
        flySpeed = 0
        this.obstacleGroup.remove(object2)
        object2.setVelocity(0)
        object1.play('game-over', true)
        object1.setVelocity(0,0)
        object1.once('animationcomplete', () => {
            object1.anims.stop()
            object1.body.setCollideWorldBounds(false)
            MCSpeed = -800
        })

        // destroy mc once off screen
        if(object1.y < -this.height) {
            object1.destroy();
        }
        let gameOverConfig = {
            fontFamily: 'Zapfino',
            fontSize: '48px',
            color: '#d7fffe',
            align: 'center'
        }

        this.lightScore.text = ''
        this.crystalScore.text = ''
        this.UILight.destroy()
        this.UICrystal.destroy()
        
        this.time.delayedCall(500, () => {
            this.add.text(gameWidth/5, gameHeight/4, 'Game Over ', gameOverConfig)
        gameOverConfig.fontFamily = 'Noteworthy'
        gameOverConfig.fontSize = '20px'

        this.time.delayedCall(750, () => {
            this.add.text(gameWidth/3 + gameWidth/15, gameHeight/3 + gameHeight/15, 'Lights gathered: ' + this.lights, gameOverConfig)

            this.time.delayedCall(750, () => {
                this.add.text(gameWidth/3 + gameWidth/75, gameHeight/2 - gameHeight/27, 'Press (space) to play again', gameOverConfig)
                this.add.text(gameWidth/3, gameHeight/2, 'or ← to go back to the menu', gameOverConfig)
            })
        })
    })

    }
}