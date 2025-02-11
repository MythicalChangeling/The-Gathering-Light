class Light extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed, x, y, texture) {
        super(scene, x, y, texture)
        this.speed = speed

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setImmovable()

        this.setVelocityY(speed)
        this.new = true
    }

    update() {
        //keep velocity up-to-date
        this.setVelocityY(obstacleSpeed)

        if (gameOver) {
            this.setVelocityY(0)
        }
    }
}