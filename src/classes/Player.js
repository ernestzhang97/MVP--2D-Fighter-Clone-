import Phaser from 'phaser'

const { KeyCodes } = Phaser.Input.Keyboard;
const KEY_BINDINGS = {
  jump: KeyCodes.SPACE,
  left: KeyCodes.LEFT,
  right: KeyCodes.RIGHT,
  down: KeyCodes.DOWN,
  hit1: KeyCodes.Z
}
export default class Player {

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
    this.playerControl()
  }

  createBody() {
    const fighter = this.scene.physics.add.sprite(this.x, this.y, `${this.texture}`)
    .setCollideWorldBounds(true)

    if (this.flip) {
      fighter.flipX = true;
    }
    // this.fighter.setGravityY(100);
    // this.scene.physics.add.collider(this.fighter, this.scene)
    fighter.setScale(5);
    // fighter.setSize(1400, 1000)
    fighter.enableBody = true;
    fighter.class = this
    fighter.body.setSize(fighter.width, fighter.height, true)
    this.fighter = fighter
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
      frameRate: 5
    })
    this.scene.anims.create({
      key: 'Move Back',
      frames: this.scene.anims.generateFrameNames(`${this.texture}`, {
        start: 1,
        end: 7,
        prefix: 'Movement/Backwards/',
        suffix: '.png'
      }),
      frameRate: 7
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

  }

  playerControl() {
    this.KEYS = this.scene.input.keyboard.addKeys(KEY_BINDINGS)
    // console.log(this.KEYS)
  }

  // movesets() {

  // }

  update() {
    // this.fighter.body.offset.x = 0;
    // this.fighter.body.offset.y = 0;
      if (this.KEYS.left.isDown) {
        this.fighter.setVelocityX(-200)
        !this.scene.isPlaying && this.fighter.anims.play('Move Back', true)
      } else if (this.KEYS.right.isDown) {
        this.fighter.setVelocityX(200)
        !this.scene.isPlaying && this.fighter.anims.play('Move Forward', true)
      } else if (this.KEYS.down.isDown) {
        this.fighter.body.velocity.x = 0;
        !this.scene.isPlaying && this.fighter.anims.play('Crouch', true)
      } else if (this.KEYS.hit1.isDown) {
        this.fighter.body.velocity.x = 0;
        !this.scene.isPlaying && this.fighter.anims.play('Hit1', true)
      }
      else {
        this.fighter.setVelocityX(0);
        this.fighter.setVelocityY(0);
        !this.scene.isPlaying && this.fighter.anims.play('Idle', true)
      }
  }
}
