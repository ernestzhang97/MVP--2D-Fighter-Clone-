import { Scene } from 'phaser'
import Fighter from '../classes/Player.js'
import mapImg from '../assets/Map.gif'
import fighterJSON from '../assets/Kyo.json'
import fighterImg from '../assets/Kyo.png'

export default class Map extends Scene {
  constructor ()
    {
      super();

    }

    preload ()
    {
      this.load.image('map', mapImg);
      this.load.atlas('fighter', fighterImg, fighterJSON)
    }

    create ()
    {
      //creating background map
      const map = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2,  'map');
      let scaleX = this.cameras.main.width / map.width
      let scaleY = this.cameras.main.height/ map.height
      let scale = Math.max(scaleX, scaleY)
      map.setScale(scale).setScrollFactor(0)
      this.physics.world.setBounds(0 , 0, window.innerWidth, window.innerHeight)

      //creating and displaying initial state of fighter
      this.createFighter()

      // this.fighter1.flipX = true;
      // this.fighter1.play('Idle')
    }
  createFighter() {
    this.fighter1 = new Fighter(this, {
      key: 'fighter',
    })
  }

  // update() {
  //   this.fighter1.update();
  // }
}

// let atlasTexture = this.textures.get('fighter')
//       let frames = atlasTexture.getFrameNames();
//       console.log(frames)

//       this.anims.create({
//         key: 'Idle',
//         frames: this.anims.generateFrameNames('fighter', {
//           start: 1,
//           end: 10,
//           prefix: 'Idle/',
//           suffix:'.png'
//         }),
//         frameRate: 10,
//         repeat: -1
//       })

//       this.fighter1 = this.add.sprite(100, 100, 'fighter')
//       this.fighter1.flipX = true;
//       this.fighter1.play('Idle')