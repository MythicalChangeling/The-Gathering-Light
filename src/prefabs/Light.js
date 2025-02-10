class Light extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed, x, y, texture) {
        super(scene, x, y, texture)

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setImmovable()

        this.setVelocityY(speed)
        this.new = true
    }
}