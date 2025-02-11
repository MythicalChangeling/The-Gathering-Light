class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed, x, y, texture) {
        super(scene, x, y, texture)
        this.scene = scene
        this.speed = speed

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setImmovable()

        this.setVelocityY(speed)
        this.new = true
        this.scene.time.delayedCall(2000000/-holdObstacleSpeed, () => {spawnCrystals = true})
    }

    update() {
        //keep velocity up-to-date
        this.setVelocityY(obstacleSpeed)

        // recursive call new obstacle
        if(this.new && this.y < gameHeight/3 + gameHeight/4) {
            // refers back to scene context
            this.scene.newObstacle(this.scene, this.velocity)
            this.new = false

            //Decide whether to add collectibles
            //random boolean code from: https://www.geeksforgeeks.org/how-to-generate-a-random-boolean-using-javascript/
            if (Math.random() <= 0.5) {
                let light = new Light(this.scene, obstacleSpeed, Phaser.Math.Between(obstacleWidth/2, gameWidth - obstacleWidth/2), gameHeight + gameHeight/6, 'light').setOrigin(.5, 0)
                this.scene.lightGroup.add(light)
            } else if(Math.random() <= .2 && spawnCrystals) {
                let crystal = new Crystal(this.scene, obstacleSpeed, Phaser.Math.Between(obstacleWidth/2, gameWidth - obstacleWidth/2), gameHeight + gameHeight/6, 'crystal').setOrigin(.5, 0)
                this.scene.crystalGroup.add(crystal)
            }
        }

        if (gameOver) {
            this.setVelocityY(0)
        }

        // destroy obstacle if no longer needed
        if(this.y < -gameHeight*3) {
            this.destroy();
        }
    }
}