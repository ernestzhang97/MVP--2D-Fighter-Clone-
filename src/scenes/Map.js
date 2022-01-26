import { Scene } from 'phaser'
import Fighter from '../classes/Player.js'
import Bot from '../classes/Bot.js'
import mapImg from '../assets/Map.gif'
import fighterJSON from '../assets/Kyo.json'
import fighterImg from '../assets/Kyo.png'

export default class Map extends Scene {
  constructor (){
    super();

  }

    preload () {
      this.load.image('map', mapImg);
      this.load.atlas('fighter', fighterImg, fighterJSON)
    }

    create () {
      //creating background map
      const map = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2,  'map');
      let scaleX = this.cameras.main.width / map.width
      let scaleY = this.cameras.main.height/ map.height
      let scale = Math.max(scaleX, scaleY)
      map.setScale(scale).setScrollFactor(0)

      this.physics.world.setBounds(0 , 0, window.innerWidth, window.innerHeight)

      //creating and displaying initial state of fighter
      this.createFighter()
      this.createBot()

      this.handlingCollision();
      // this.physics.add.collider(this.fighter1, this.fighter2, () => console.log('collide'), null, this)

      //initialize character state
      this.fighterHealth = 100;
      this.botHealth = 100;
      this.fighterHit = false;
      this.botBlock = false;
      this.botHit = false;
      this.botCombo = false;

      // this.physics.world.enable([this.fighter1, this.fighter2], Phaser.Physics.ARCADE, true);
    }

  createFighter() {
    this.fighter1 = new Fighter(this, {
      key: 'fighter',
      isActivePlayer: true,
      x: 300,
      y: 1000,
      flip: true
    })
    this.physics.world.enable(this.fighter1)
    // console.log(this.fighter1)
  }

  createBot() {
    this.fighter2 = new Bot(this, {
      key: 'fighter',
      isActivePlayer: false,
      x: 1400,
      y: 1000,
      health: 100,
      block: false,
      hit: false
    })
    this.physics.world.enable(this.fighter2)
  }

  hitEnemy() {
    // console.log('hi')
  }

  handlingCollision() {
    console.log(this.fighter1)
    console.log(this.fighter2)
    this.physics.add.collider(this.fighter1, this.fighter2, (x) => console.log('hi'), null, this)
  }

  update() {
    this.fighter1.update();
    this.fighter2.update();

    // this.physics.add.collider(this.fighter1.fighter, this.fighter2.fighter, () => console.log('hi'), null, this)
  }
}
