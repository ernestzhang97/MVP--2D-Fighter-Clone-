import Phaser from 'phaser'

const { KeyCodes } = Phaser.Input.Keyboard;
const KEY_BINDINGS = {
  jump: KeyCodes.SPACE,
  left: KeyCodes.LEFT,
  right: KeyCodes.RIGHT,
  down: KeyCodes.DOWN,
  hit1: KeyCodes.Z,
  hit2: KeyCodes.X,
  hit3: KeyCodes.C,
  block: KeyCodes.B
}
export default class Player {

  constructor(scene, config) {

    this.scene = scene

    this.texture = config.key
    // this.active = config.isActivePlayer
    this.x = config.x;
    this.y = config.y;
    this.flip = config.flip;
    this.fighterCombo = '';
    this.knockDown = false;

    //create character
    this.createBody()
    this.createAnims()
    this.playerControl()

    this.win = false;
  }

  createBody() {
    this.fighter = this.scene.physics.add.sprite(this.x, this.y, `${this.texture}`)
    .setCollideWorldBounds(true)
    .setScale(5)

    if (this.flip) {
      this.fighter.flipX = true;
    }
    this.fighter.body.setSize(30, 30, true).setOffset(15, 30)

    this.fighter.class = this
    this.fighter.refreshBody()

    this.scene.fighters.add(this.fighter)
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
      key: 'Move Forward',
      frames: this.scene.anims.generateFrameNames(`${this.texture}`, {
        start: 1,
        end: 5,
        prefix: 'Movement/Forward/',
        suffix: '.png'
      }),
      frameRate: 7
    })
    this.scene.anims.create({
      key: 'Move Back',
      frames: this.scene.anims.generateFrameNames(`${this.texture}`, {
        start: 1,
        end: 7,
        prefix: 'Movement/Backwards/',
        suffix: '.png'
      }),
      frameRate: 9
    })
    this.scene.anims.create({
      key: 'Crouch',
      frames: this.scene.anims.generateFrameNames(`${this.texture}`, {
        start: 1,
        end: 1,
        prefix: 'Crouch/',
        suffix: '.png'
      }),
      frameRate: 1
    })
    this.scene.anims.create({
      key: 'Hit1',
      frames: this.scene.anims.generateFrameNames(`${this.texture}`, {
        start: 1,
        end: 3,
        prefix: 'Moveset/Hit1/',
        suffix: '.png'
      }),
      frameRate: 10
    })
    this.scene.anims.create({
      key: 'Hit2',
      frames: this.scene.anims.generateFrameNames('fighter', {
        start: 1,
        end: 8,
        prefix: 'Moveset/Hit2/',
        suffix: '.png'
      }),
      frameRate: 7
    })
    this.scene.anims.create({
      key: 'Hit3',
      frames:this.scene.anims.generateFrameNames('fighter', {
        start: 1,
        end: 16,
        prefix: 'Moveset/Hit3/',
        suffix: '.png'
      }),
      frameRate: 12
    })
    this.scene.anims.create({
      key: 'Win',
      frames: this.scene.anims.generateFrameNames('fighter', {
        start: 1,
        end: 17,
        prefix: 'Victory/',
        suffix: '.png'
      }),
      frameRate: 10
    })
    this.scene.anims.create({
      key: 'Block',
      frames: this.scene.anims.generateFrameNames('fighter', {
        start: 1,
        end: 4,
        prefix: 'Block/Standing/',
        suffix: '.png'
      }),
      frameRate: 10
    })
  }

  punch() {
    !this.isPlaying && this.fighter.anims.play('Hit1', true)

    this.fighter.once('animationupdate', (anim, frames, sprite, frameKey) => {
      if (frames.index === 1) {
        this.fighter.setCircle(10).setOffset(15,15)
      }
      if (frames.index === 2) {
        this.scene.physics.world.enable(this.fighter)
        this.fighter.setCircle(10).setOffset(80,20)
      }
    })

    this.fighter.on('animationcomplete', () => {
      this.fighterCombo = '1'
      this.fighter.body.setSize(30, 30, true).setOffset(15, 20)
    })
  }

  comboStart() {
    this.fighter.once('animationstart', (anim, frames, sprite, frameKey) => {
      if (frames.index === 1) {
        this.scene.physics.world.enable(this.fighter)
        this.fighter.setCircle(10).setOffset(80,20)
      }
    })

    !this.isPlaying && this.fighter.anims.play('Hit2', true)

    this.fighter.once('animationupdate', (anim, frames, sprite, frameKey) => {
      if(frames.index === 4) {
        this.fighter.setCircle(10).setOffset(80,60)
      }
      if(frames.index ===5) {
        this.fighter.setCircle(10).setOffset(60,30)
      }
      if (frames.index === 6) {
        this.fighter.body.setSize(30, 30, true).setOffset(15, 20)
      }
    })

    this.fighter.once('animationcomplete', ()=> {
      this.fighterCombo = '12'
    })
  }

  comboFull() {
    if (this.fighterCombo.length === 2) {
      this.knockDown = true;
    }
    !this.isPlaying && this.fighter.anims.play('Hit3', true)

    this.fighter.once('animationupdate', (anim, frames, sprite, frameKey) => {
      if(frames.index === 6) {
        this.fighter.setCircle(10).setOffset(90,15)
      }
      if (frames.index === 8) {
        this.fighter.body.setSize(30, 30, true).setOffset(15, 20)
      }
    })

    this.fighter.once('animationcomplete', ()=> {
      this.fighterCombo = ''
      this.knockDown = false;
      this.scene.time.addEvent({
        delay: 1000
      })
    })
  }

  playerControl() {
    this.KEYS = this.scene.input.keyboard.addKeys(KEY_BINDINGS)
  }

  victoryPose() {
    setTimeout(
      () => { !this.scene.isPlaying && this.fighter.anims.play('Win', false)}, 8000
    )

    this.fighter.once('animationcomplete', () => {this.win = false})
  }

  update() {
      if (this.KEYS.left.isDown) {
        this.fighter.setVelocityX(-400)
        !this.scene.isPlaying && this.fighter.anims.play('Move Back', true)
      } else if (this.KEYS.right.isDown) {
        this.fighter.setVelocityX(400)
        !this.scene.isPlaying && this.fighter.anims.play('Move Forward', true)
      } else if (this.KEYS.down.isDown) {
        this.fighter.body.velocity.x = 0;
        !this.scene.isPlaying && this.fighter.anims.play('Crouch', true)
      } else if (this.KEYS.block.isDown) {
        this.fighter.body.velocity.x = 0;
        !this.scene.isPlaying && this.fighter.anims.play('Block', false)
      } else if (this.KEYS.hit1.isDown && this.fighterCombo.length === 0 ) {
        this.fighter.body.velocity.x = 0;
        this.punch()
      } else if ((this.KEYS.hit1.isDown && this.fighterCombo.length === 1) || this.KEYS.hit2.isDown) {
        this.fighter.body.velocity.x = 0;
        this.comboStart()
      } else if ((this.KEYS.hit1.isDown && this.fighterCombo.length === 2) || this.KEYS.hit3.isDown) {
        this.fighter.body.velocity.x = 0;
        this.comboFull()
      }  else {
        this.fighter.setVelocityX(0);
        this.fighter.setVelocityY(0);
        this.fighter.body.setSize(30, 30, true).setOffset(15, 20)
        !this.scene.isPlaying && this.fighter.anims.play('Idle', true)
      }
  }
}

