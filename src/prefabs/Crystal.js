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

        //show crystals tutorial
        if (this.scene.crystals >= 1 && this.scene.firstCrystal == true) {
            this.scene.firstCrystal = false
            this.tutorial.alpha = 1
        }
        if (this.scene.crystals > 0) {
            this.crystalsActive()
        }

        if (this.scene.mc.y > gameHeight - gameHeight/5 && this.MCRewind && !gameOver) {
            MCSpeed = 0
            obstacleSpeed = -holdObstacleSpeed
            flySpeed = -holdFlySpeed
        }

        if (this.scene.mc.y < gameHeight/5 && this.MCUnwind && !gameOver) {
            MCSpeed = 0
            obstacleSpeed = -holdObstacleSpeed
            flySpeed = -holdFlySpeed
        }
    }

    crystalsActive() {
        //rewind setup
        if (this.scene.crystals > 0 && !gameOver) {
            if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
                this.scene.sound.play('sfx-crystal-use')
                this.tutorial.alpha = 0
                this.scene.crystals -= 1
                this.scene.crystalScore.text = this.scene.crystals
                this.scene.useCrystal = true
            this.rewind()
            }
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
        this.scene.time.delayedCall(2000000/-holdObstacleSpeed, () => {
            this.scene.sound.play('sfx-crystal-use')
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