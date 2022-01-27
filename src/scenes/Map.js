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

    this.fighters = this.add.group()
    this.combo = this.add.group()
    //creating and displaying initial state of fighter
    this.createGround()
    this.createFighter()
    this.createBot()
    this.createAudio()
    this.handlingCollision();


    let playerBar = this.healthBar(140, 100, 0xff0000)
    this.setValue(100, 100)
    this.add.text(140, 150, 'Player 1', {fontSize: '34px'})

    let botBar = this.healthBar(1400, 100, 0x3d85c6)
    this.setValue(100, 100)
    this.add.text(1840, 150, 'Player 2', {fontSize: '34px'})
    this.add.text(1050, 80, '∞', {fontSize: '100px'})

    //initialize character state
    this.fighterHealth = 100;
    this.botHealth = 100;
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
  }

  createBot() {
    this.fighter2 = new Bot(this, {
      key: 'bot',
      isActivePlayer: false,
      x: 1800,
      y: 925,
    })
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

  handlingCollision() {
    // console.log(this.fighters.children.entries[1])
    this.physics.add.overlap(this.fighters, this.fighters, () => {
      this.fighter2.hit = true
      this.fighter2.updateHealth()
      if (this.fighter1.fighterCombo.length === 2) {
        this.fighter2.combo = true;
      }
    })
    this.physics.add.collider(this.fighters, this.platform)
    this.physics.add.collider(this.fighters, this.platform)
  }

  healthBar(x , y, color) {
    this.bar = this.add.graphics()
    this.bar.setDepth(100)
    this.bar.fillStyle(color, 1);
    this.bar.fillRect(0, 0, 600, 50);

    this.bar.x = x
    this.bar.y = y

    return this.bar
  }

  setValue(current, max) {
    this.bar.scaleX = current / max;
  }

  victory() {
    this.fighter1.win = true;
    this.fighter1.victoryPose()
    this.fighter2.onLose()
    this.add.text(700, 500, 'Player 1 Wins', {fontSize: '100px'})
  }

  update() {

    if(this.fighter2.health === 0 && !this.fighter2.lose) {
      this.victory()
    }

    if(this.fighter2.health > 0) {
      this.fighter1.update();
      this.fighter2.update();
    }

    if (this.fighter2.hit) {
      this.setValue(this.fighter2.health, 100)
    }

    if(this.fighter1.knockDown && this.fighter2.combo) {
      this.fighter2.knockDown()
    }
  }
}
