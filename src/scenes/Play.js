class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        //reset variables
        flySpeed = 1.5
        dodgeSpeed = 250
        obstacleSpeed = -200
        MCSpeed = 0
        gameOver = false

        this.cave = this.add.tileSprite(0, 0, 600, 1048, 'cave').setOrigin(0)
        
        //music setup
        this.music1 = this.sound.add('music1', {volume: .5, loop: true})
        this.music2 = this.sound.add('music2', {volume: .5, loop: true})
        this.music3 = this.sound.add('music3', {volume: .5, loop: true})
        this.music1.play()
        this.time.delayedCall(17500, () => {
            this.music1.stop()
            this.music2.play()
        })
        this.time.delayedCall(34250, () => {
            this.music2.stop()
            this.music3.play()
        })

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

        //variables to control crystal spawning and activation
        this.firstCrystal = true
        this.useCrystal = false 
        spawnCrystals = false

        //offscreen crystal to maintain access to the Crystal object
        let crystal = new Crystal(this, obstacleSpeed, gameWidth*2, gameHeight + gameHeight/6, 'crystal').setOrigin(.5, 0)
        this.crystalGroup.add(crystal)

        //first obstacle
        this.time.delayedCall(1000, () => {
            this.newObstacle()
        })

        // set up difficulty increase over time
        this.speedTimer = this.time.addEvent({
            delay: 5000,
            callback: this.speedUp,
            callbackScope: this,
            loop: true
        });
        
    }

    update() {
        this.cave.tilePositionY += flySpeed

        //keep UI in front
        this.children.bringToTop(this.UILight)
        this.children.bringToTop(this.UICrystal)
        this.children.bringToTop(this.lightScore)
        this.children.bringToTop(this.crystalScore)

        //manually update
        this.mc.update()
        
        // check for collisions
        if (!gameOver) {
            this.physics.world.collide(this.mc, this.lightGroup, this.lightCollide, null, this)
            this.physics.world.collide(this.mc, this.crystalGroup, this.crystalCollide, null, this)
            this.obstacleCollision = this.physics.world.collide(this.mc, this.obstacleGroup, this.obstacleCollide, null, this)
        }

        if (gameOver) {
            if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
                this.sound.removeAll()
                this.sound.play('sfx-select')
                gameOver = false
                this.scene.start('menuScene')
            }
            if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
                this.sound.removeAll()
                this.sound.play('sfx-select')
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

    speedUp() {
        if (obstacleSpeed > speedMax && !gameOver) {
            obstacleSpeed -= 20
            flySpeed += .15
        }
    }
    
    lightCollide(object1, object2) {
        object2.play('light-get', true)
        this.sound.play('sfx-light')
        this.lights += 1
        this.lightScore.text = this.lights
        this.lightGroup.remove(object2)
        object2.once('animationcomplete', () => {
            object2.destroy()
        })
    }

    crystalCollide(object1, object2) {
        object2.play('crystal-get', true)
        this.sound.play('sfx-crystal')
        this.crystals += 1
        this.crystalScore.text = this.crystals
        this.crystalGroup.remove(object2)
        object2.once('animationcomplete', () => {
            object2.alpha = 0
        })
    }

    obstacleCollide(object1, object2) {
        this.sound.play('sfx-game-over')
        flySpeed = 0
        this.obstacleGroup.remove(object2)
        object2.setVelocity(0)
        object1.play('game-over', true)
        if (!gameOver) {
            object1.setVelocity(0,0)
        }
            
        gameOver = true
        object1.once('animationcomplete', () => {
            object1.anims.stop()
            object1.body.setCollideWorldBounds(false)
            MCSpeed = -800
        })

        // destroy mc once off screen
        if(object1.y < -gameHeight) {
            object1.destroy();
        }

        let gameOverConfig = {
            fontFamily: 'Zapfino',
            fontSize: '48px',
            color: '#d7fffe',
            align: 'center'
        }

        //clear UI
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
                this.add.text(gameWidth/3 + gameWidth/35, gameHeight/2 - gameHeight/27, 'Press ↑ to play again', gameOverConfig)
                this.add.text(gameWidth/3, gameHeight/2, 'or ↓ to go back to the menu', gameOverConfig)
            })
        })
    })

    }
}