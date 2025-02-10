class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed, x, y, texture) {
        super(scene, x, y, texture)

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setImmovable()

        this.setVelocityY(speed)
        this.new = true
    }

    update() {
        // recursive call new obstacle
        if(this.new && this.y < gameHeight/3 + gameHeight/3) {
            // refers back to scene context
            this.scene.newObstacle(this.scene, this.velocity)
            this.new = false
        }

        // destroy paddle if it reaches the left edge of the screen
        // if(this.y < -this.width) {
        //     this.destroy();
        // }
    }
}