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
      this.health = 100;
      this.hit = false;
      this.combo = false;
      this.lose = false;

      //create health bar
  }

    createBody() {
      this.bot = this.scene.physics.add.sprite(this.x, this.y, `${this.texture}`)
                .setCollideWorldBounds(true)
      this.bot.setScale(5);
      this.scene.physics.world.enable(this.bot)
      this.bot.body.setSize(50, 30, true)
      this.bot.refreshBody();
      this.bot.body.setOffset(20, 25)

      this.scene.fighters.add(this.bot)
    }

    createAnims() {
      let atlasTextures = this.scene.textures.get(`${this.texture}`)

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
        frameRate: 10
      })
      this.scene.anims.create({
        key:'Lose',
        frames: this.scene.anims.generateFrameNames('fighter', {
          start: 1,
          end: 6,
          prefix: 'Hurt/Lose/',
          suffix:'.png'
        }),
        frameRate: 0.8
      })
    }

    updateHealth() {
      if (this.health > 0) {
       this.health = this.health - 0.1
      }

      if (this.health < 1 && this.health > 0) {
        this.health = 0
      }
    }

    animationComplete() {
      this.scene.physics.world.enable(this.bot)
      this.hit = false;
      this.bot.anims.play('Idle', true)
    }

    knockDown() {
      !this.isPlaying && this.bot.anims.play('HurtCombo', true)

      this.bot.once('animationupdate', (anim, frames, sprite, frameKey) => {
        if (frames.index === 2) {
          this.scene.physics.world.disable(this.bot)
        }
        if (frames.index === 16) {
          this.scene.physics.world.enable(this.bot)
        }
      })

      this.bot.once('animationcomplete', ()=> {

        this.combo = false;
        this.animationComplete()
      })
    }

    onLose() {
      this.bot.x = 1800
      this.bot.y = 940
      this.bot.anims.play('Lose', false)
      this.lose = true;
      this.bot.on('animationcomplete', ()=> {this.bot.destroy(true)})
    }

    update() {
      if (this.health > 0 && !this.lose) {
      if (this.hit && !this.combo) {
        this.scene.physics.world.enable(this.bot)
        this.bot.anims.play('Hurt1', true)
        this.bot.on('animationcomplete', ()=> this.animationComplete())
      } else if (!this.hit && !this.isPlaying) {
        this.scene.physics.world.enable(this.bot)
        this.bot.anims.play('Idle', true)
      }
    }
  }
}
