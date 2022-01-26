import Phaser from 'phaser'
import Fighter from '../classes/Player.js'
import Bot from '../classes/Bot.js'
import mapImg from '../assets/Map.gif'
import fighterJSON from '../assets/Kyo.json'
import fighterImg from '../assets/Kyo.png'
import soundtrack from '../assets/audio.mp3'
import ground from '../assets/ground.jpeg'

export default class Map extends Phaser.Scene {
  constructor () {
    super();
  }

  preload () {
    this.load.image('map', mapImg);
    this.load.atlas('fighter', fighterImg, fighterJSON)
    this.load.atlas('bot', fighterImg, fighterJSON)
    this.load.audio('ost', soundtrack)
    this.load.image('ground', ground)
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
    this.createGround()
    this.createFighter()
    this.createBot()
    this.createAudio()

    this.handlingCollision();

    let playerBar = this.healthBar(140, 100, 0xff0000)
    this.setValue(playerBar, 100);
    this.add.text(140, 150, 'Player 1', {fontSize: '34px'})

    let botBar = this.healthBar(1400, 100, 0x3d85c6)
    this.setValue(botBar, 100);
    this.add.text(1840, 150, 'Player 2', {fontSize: '34px'})

    this.add.text(1050, 80, '∞', {fontSize: '100px'})

    //initialize character state
    this.fighterHealth = 100;
    this.botHealth = 100;
    this.fighterHit = false;
    this.botBlock = false;
    this.botHit = false;
    this.botCombo = false;

  }

  createGround() {
    this.platform = this.physics
    .add.image(100, 1200, 'ground')
    .setSize(5000, 0.1)
    .setVisible(false)
    .setImmovable(true)
    .refreshBody();
  }

  createFighter() {
    this.fighter1 = new Fighter(this, {
      key: 'fighter',
      isActivePlayer: true,
      x: 300,
      y: 925,
      flip: true
    })

    this.physics.world.enable(this.fighter1)
    // console.log(this.fighter1)
  }

  createBot() {
    this.fighter2 = new Bot(this, {
      key: 'bot',
      isActivePlayer: false,
      x: 1800,
      y: 925,
    })

    this.physics.world.enable(this.fighter2)
  }

  createAudio() {
    const audio = this.sound.add('ost', {volume: 0.4, loop: true})

    if (!this.sound.locked) {
      audio.play()
    } else {
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        audio.play()
      })
    }
  }

  hitEnemy() {
    // console.log('hi')
  }

  handlingCollision() {
    this.physics.add.collider(this.fighter1, this.fighter2, (x, y) => console.log('hi'), null, this)
    this.physics.add.collider(this.fighter1, this.platform)
    this.physics.add.collider(this.fighter2, this.platform)
  }

  healthBar(x , y, color) {
    let bar = this.add.graphics()

    bar.fillStyle(color, 1);

    bar.fillRect(0, 0, 600, 50);

    bar.x = x
    bar.y = y

    return bar
  }

  setValue(bar, percentage) {
    bar.scaleX = percentage / 100;
  }

  update() {
    this.fighter1.update();
    this.fighter2.update();

    // this.physics.add.collider(this.fighter1.fighter, this.fighter2.fighter, () => console.log('hi'), null, this)
  }
}
