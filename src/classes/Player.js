import Phaser from 'phaser'

const { KeyCodes } = Phaser.Input.Keyboard;
const KEY_BINDINGS = {
  jump: KeyCodes.SPACE,
}
export default class Player {

  constructor(scene, config) {

    this.scene = scene

    this.texture = config.key
    this.active = config.isActivePlayer
    this.x = 300;
    this.y = 1000;

    //create character
    this.createBody()
    this.createAnims()
    this.playerControl()

  }

  createBody() {
    this.fighter = this.scene.physics.add.sprite(this.x, this.y, `${this.texture}`)
    this.fighter.flipX = true;
    this.fighter.setScale(5);
  }

  createAnims() {
    let atlasTextures = this.scene.textures.get(`${this.texture}`)
    console.log(atlasTextures)
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

  }

  playerControl() {
    this.fighter.anims.play('Idle')
  }

}












// export default class Player extends Physics.Arcade.Sprite {

//  private keyW: Phaser.Input.Keyboard.Key;
//  private keyA: Phaser.Input.Keyboard.Key;
//  private keyS: Phaser.Input.Keyboard.Key;
//  private keyD: Phaser.Input.Keyboard.Key;

  // constructor(scene, x, y) {
  //   super('Map', x, y)

  //   this.scene = scene;
  //   this.scene.add.existing(this);
  //   this.scene.physics.add.existing(this);
  //   this.getBody().setBoundsRectangle(this);

  //   this.keyW = this.scene.input.keyboard.addKey('W');
  //   this.keyA = this.scene.input.keyboard.addKey('A');
  //   this.keyS = this.scene.input.keyboard.addKey('S');
  //   this.keyD = this.scene.input.keyboard.addKey('D');

  //   this.getBody().setSize(200, 200);
  //   this.getBody().setOffset(8, 0);

  // }

  // create() {
  //   let atlasTexture = this.textures.get('fighter')
  //     let frames = atlasTexture.getFrameNames();
  //     console.log(frames)

  //     this.anims.create({
  //       key: 'Idle',
  //       frames: this.anims.generateFrameNames('fighter', {
  //         start: 1,
  //         end: 10,
  //         prefix: 'Idle/',
  //         suffix:'.png'
  //       }),
  //       frameRate: 10,
  //       repeat: -1
  //     })

  //     this.fighter1 = this.add.sprite(100, 100, 'fighter')
  //     this.fighter1.flipX = true;
  //     this.fighter1.play('Idle')
  // }

  // update() {
  //   this.getBody().setVelocity(0);

  //   if(this.keyW.isDown) {
  //     this.body.velocity.y = -110
  //   }
  //   if(this.keyA.isDown) {
  //     this.body.velocity.x = -110;
  //     this.getBody().setOffset(48,15)
  //   }
  //   if(this.keyS.isDown) {
  //     this.body.velocity.y = -110;
  //   }
  //   if(this.keyD.isDown) {
  //     this.body.velocity.x = -110;
  //     this.getBody().setOffset(15, 15)
  //   }
  // }

  // getBody() {
  //   let atlasTexture = this.textures.get('fighter')
  //     let frames = atlasTexture.getFrameNames();
  //     console.log(frames)

  //     this.anims.create({
  //       key: 'Idle',
  //       frames: this.anims.generateFrameNames('fighter', {
  //         start: 1,
  //         end: 10,
  //         prefix: 'Idle/',
  //         suffix:'.png'
  //       }),
  //       frameRate: 10,
  //       repeat: -1
  //     })

  //     this.fighter1 = this.add.sprite(100, 100, 'fighter')
  //     this.fighter1.flipX = true;

  // }
// }