class MC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)           // add mc sprite to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        this.play('mc-flying', true)

        this.body.setCollideWorldBounds(true)
        this.setImmovable()

        this.keys = scene.keys
    }

    update() {
        //keep velocity up-to-date
        this.setVelocityY(MCSpeed)

        if(!gameOver) {
            // left/right movement
            let moveDirection = new Phaser.Math.Vector2(0, 0)
            if(this.keys.left.isDown) {
                moveDirection.x = -1
            } else if(this.keys.right.isDown) {
                moveDirection.x = 1
            }
            this.setVelocityX(dodgeSpeed*moveDirection.x)
        }
    }
}