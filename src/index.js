import Phaser from 'phaser';
import Map from './scenes/Map'

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.ScaleModes.NONE,
        width: window.innerWidth,
        height: window.innerHeight,
        resizeInterval: 500
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    callbacks: {
        postBoot: () => {
            window.sizeChanged();
        }
    },

    scene: [Map]
};

window.sizeChanged = () => {
    if (window.game.isBooted) {
        setTimeout(() => {
            window.game.scale.resize(window.innerWidth, window.innerHeight);
            window.game.canvas.setAttribute(
                'style',
                `display: block; width: ${window.innerWidth}px ; height: ${window.innerHeight}px`
            )
        }, 100);
    }
}

window.onresize = () => window.sizeChanged();

const game = new Phaser.Game(config);
