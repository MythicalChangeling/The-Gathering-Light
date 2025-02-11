class Crystal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed, x, y, texture) {
        super(scene, x, y, texture)
        this.scene = scene
        this.keys = scene.keys
        this.speed = speed

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setImmovable()
            
        //tutorial text
        this.tutorial = this.scene.add.text(gameWidth/10, gameHeight/13, '← You got a crystal! Press (space) to see what it does!', {
            fontFamily: 'Noteworthy',
            fontSize: '16px',
            color: '#d7fffe',
        })
        this.tutorial.alpha = 0

        this.setVelocityY(speed)
        this.new = true
    }

    update() {
        //keep velocity up-to-date
        this.setVelocityY(obstacleSpeed)

        if (gameOver) {
            this.setVelocityY(0)
        }

        if (this.scene.crystals >= 1 && this.scene.firstCrystal == true) {
            this.scene.firstCrystal = false
            this.tutorial.alpha = 1
        }

        //rewind setup
        if (this.scene.crystals > 0 && !gameOver) {
            if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
                this.tutorial.alpha = 0
                this.scene.crystals -= 1
                this.scene.crystalScore.text = this.scene.crystals
                this.scene.useCrystal = true
            this.rewind()
            }
        }

        if (this.scene.mc.y > gameHeight - gameHeight/5 && this.MCRewind) {
            MCSpeed = 0
            obstacleSpeed = -holdObstacleSpeed
            flySpeed = -holdFlySpeed
        }

        if (this.scene.mc.y < gameHeight/5 && this.MCUnwind) {
            MCSpeed = 0
            obstacleSpeed = -holdObstacleSpeed
            flySpeed = -holdFlySpeed
        }
    }

    rewind() {
        holdObstacleSpeed = obstacleSpeed
        obstacleSpeed = 0
        holdFlySpeed = flySpeed
        flySpeed = 0

        MCSpeed = -holdObstacleSpeed * 2
        this.MCRewind = true
        this.MCUnwind = false

        this.unwind()
    }

    unwind() {
        console.log(-holdObstacleSpeed)
        this.scene.time.delayedCall(2000000/-holdObstacleSpeed, () => {
            holdObstacleSpeed = obstacleSpeed
            obstacleSpeed = 0
            holdFlySpeed = flySpeed
            flySpeed = 0

            MCSpeed = -holdObstacleSpeed * 2
            this.MCRewind = false
            this.MCUnwind = true
        })
    }
}