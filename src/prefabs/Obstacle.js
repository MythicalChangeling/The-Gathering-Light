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

            //Decide whether to add collectibles
            //random boolean code from: https://www.geeksforgeeks.org/how-to-generate-a-random-boolean-using-javascript/
            if (Math.random() <= 0.5) {
                let light = new Light(this.scene, obstacleSpeed, Phaser.Math.Between(obstacleWidth/2, gameWidth - obstacleWidth/2), gameHeight + gameHeight/6, 'light').setOrigin(.5, 0)
            } else if(Math.random() <= 0.2) {
                let crystal = new Crystal(this.scene, obstacleSpeed, Phaser.Math.Between(obstacleWidth/2, gameWidth - obstacleWidth/2), gameHeight + gameHeight/6, 'crystal').setOrigin(.5, 0)
            }
        }

        // destroy paddle if it reaches the left edge of the screen
        // if(this.y < -this.width) {
        //     this.destroy();
        // }
    }
}