import { Scene } from 'phaser';
import mapImg from '../assets/Map.gif';
import fighterJSON from '../assets/Kyo.json'
import fighterImg from '../assets/Kyo.png'

// function importAll(r) {
//   r.keys().forEach(r);
// }

// importAll(require.context('../assets/Sprites/', true, /\.png$/))

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
      const map = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2,  'map');
      let scaleX = this.cameras.main.width / map.width
      let scaleY = this.cameras.main.height/ map.height
      let scale = Math.max(scaleX, scaleY)
      map.setScale(scale).setScrollFactor(0)

      let atlasTexture = this.textures.get('fighter')
      let frames = atlasTexture.getFrameNames();
      console.log(frames)
      this.fighter = this.add.sprite(100, 100, 'fighter')
    }
}