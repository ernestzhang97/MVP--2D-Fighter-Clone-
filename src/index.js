import Phaser from 'phaser';
import Map from './scenes/Map'

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            debugShowBody: true
        }
    },
    scene: [Map]
};

const game = new Phaser.Game(config);
