import Phaser from 'phaser';

export default class Bot {

  constructor(scene, config) {

      this.scene = scene

      this.texture = config.key
      // this.active = config.isActivePlayer
      this.x = config.x;
      this.y = config.y;
      this.flip = config.flip;

      //create character
      this.createBody()
      this.createAnims()

      //initial state of character
      // this.health = 100;
      // this.hit = false;
      // this.combo = false;
      // console.log(this.health)
  }

    createBody() {
      const bot = this.scene.physics.add.sprite(this.x, this.y, `${this.texture}`)
                .setCollideWorldBounds(true)
                // .setInteractive(new Phaser.Geom.Rectangle(0, 0, 128, 128), null)
      // this.bot.setGravityY(100);
      // this.scene.physics.add.collider(this.bot, this.scene)
      bot.class = this;
      bot.setScale(5);
      bot.enableBody = true;
      bot.body.setSize(bot.width, bot.height, true)
      bot.refreshBody();
      bot.body.setOffset(12, 5)

      this.bot = bot

      this.scene.fighters.add(bot)
    }

    createAnims() {
      let atlasTextures = this.scene.textures.get(`${this.texture}`)
      // console.log(atlasTextures)
      this.scene.anims.create({
        key: 'Idle',
        frames: this.scene.anims.generateFrameNames(`${this.texture}`, {
          start: 1,
          end: 10,
          prefix: 'Idle/',
          suffix:'.png'
        }),
        frameRate: 10,
        repeat: -1
      })
      this.scene.anims.create({
        key: 'Hurt1',
        frames: this.scene.anims.generateFrameNames('fighter', {
          start: 1,
          end: 5,
          prefix: 'Hurt/HitOnce/',
          suffix: '.png'
        }),
        frameRate: 10
      })
      this.scene.anims.create({
        key:'HurtCombo',
        frames: this.scene.anims.generateFrameNames('fighter', {
          start:1,
          end: 18,
          prefix: 'Hurt/HitCombo/',
          suffix: '.png'
        }),
        frameRate:18
      })
    }

    updateHealth() {
      this.health = this.health - 1;
    }

    update() {
      this.bot.anims.play('Idle', true)
      // this.updateHealth()
    }
  }
