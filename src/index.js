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
            debug: false
        }
    },
    scene: [Map]
};

// window.sizeChanged = () => {
//     if (window.game.isBooted) {
//         setTimeout(() => {
//             window.game.scale.resize(window.innerWidth, window.innerHeight);
//             window.game.canvas.setAttribute(
//                 'style',
//                 `display: block; width: ${window.innerWidth}px ; height: ${window.innerHeight}px`
//             )
//         }, 100);
//     }
// }

// window.onresize = () => window.sizeChanged();

const game = new Phaser.Game(config);
