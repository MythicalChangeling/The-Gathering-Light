class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload(){
        //loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, gameWidth/2, gameWidth * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });
        
        this.load.path = './assets/'

        //load images
        this.load.image('menu', 'bg-menu.png')
        this.load.image('cave', 'bg-play.png')
        this.load.image('blue-obstacle', 'blue-obstacle.png')
        this.load.image('pink-obstacle', 'pink-obstacle.png')
        this.load.image('purple-obstacle', 'purple-obstacle.png')

        //load sprites
        this.load.spritesheet('crystal', 'crystal.png', {
            frameWidth: 45,
            frameHeight: 61,
        })
        this.load.spritesheet('light', 'light.png', {
            frameWidth: 39,
            frameHeight: 60,
        })
        this.load.spritesheet('mc', 'mc.png', {
            frameWidth: 87,
            frameHeight: 88,
        })
        this.load.spritesheet('game-over', 'game-over.png', {
            frameWidth: 85,
            frameHeight: 91,
        })
    }

    create() {
        //create animations
        this.anims.create({
            key: 'crystal-get',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('crystal', {start: 0, end: 7})
        })
        this.anims.create({
            key: 'light-get',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('light', {start: 0, end: 6})
        })
        this.anims.create({
            key: 'mc-flying',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('mc', {start: 0, end: 3})
        })
        this.anims.create({
            key: 'game-over',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('game-over', {start: 0, end: 11})
        })
    }

    update() {
        //go to Menu
        this.scene.start('menuScene')
    }
}