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
      this.onLose()

      //initial state of character
      this.health = 100;
      this.hit = false;
      this.combo = false;
      this.lose = false;

      //create health bar
  }

    createBody() {
      const bot = this.scene.physics.add.sprite(this.x, this.y, `${this.texture}`)
                .setCollideWorldBounds(true)
      bot.class = this;
      bot.setScale(5);
      bot.enableBody = true;
      bot.body.setSize(50, 30, true)
      bot.refreshBody();
      bot.body.setOffset(20, 25)

      this.bot = bot
      this.scene.fighters.add(bot)
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
        frameRate:18
      })
      this.scene.anims.create({
        key:'Lose',
        frames: this.scene.anims.generateFrameNames('fighter', {
          start: 1,
          end: 6,
          prefix: 'Hurt/Lose/',
          suffix:'.png'
        }),
        frameRate: 1
      })
    }

    updateHealth() {
      if (this.health > 0) {
       this.health = this.health - 0.2
      } else {
        this.lose = true;
      }
    }

    animationComplete() {
      this.hit = false;
      this.bot.anims.play('Idle', true)
    }

    onLose() {
      this.bot.anims.play('Lose', false)
      this.bot.on('animationcomplete', ()=> {this.bot.anims.stop()})
    }

    update() {
       if (this.health > 0 && !this.lose) {
        if(!this.hit && !this.isPlaying) {
          this.bot.anims.play('Idle', true)
        } else if (this.hit) {
          this.bot.anims.play('Hurt1', true)
          this.bot.on('animationcomplete', ()=> this.animationComplete())
        } else if (this.hit && this.fighterCombo.length === 3) {
          this.bot.anims.play('HurtCombo', true)
          this.bot.on('animationcomplete', ()=> this.animationComplete())
        }
      }
    }
}

//this.scene.pause();