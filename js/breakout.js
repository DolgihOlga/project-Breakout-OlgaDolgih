'use strict';

let game = {
    canvas:null,
    ctx: null,
    board: null,
    paddle: null,
    ball: null,
    sprites: {
        background: null,
        ball:null,
        greenBrick: null,
        greyBrick: null,
        redBrick: null,
        yellowBrick: null,
        paddleShot: null,
        paddleLong: null
    },

    init() {
        this.canvas = document.getElementById('breakout');
        this.ctx = this.canvas.getContext('2d');
    },
    preload(callback) {
        let load = 0;
        let required = Object.keys(this.sprites).length;
        let onAssetLoad = () => {
            ++load;
            if(load >= required) {
                callback();
            }
        }
        this.preloadSprites(onAssetLoad);
    },
    preloadSprites(onAssetLoad) {

        for(let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = 'img/' + key + '.png';
            this.sprites[key].addEventListener('load', onAssetLoad);
        }
    },
    create() {
        this.board.createCells();
        this.board.createBricksLine();
        console.log(this.board);
    },
    run() {
        this.create();
        window.requestAnimationFrame(() => {
            this.render(); //отрисовываем, что заплапировали
        })

    },
    render() {
        this.ctx.drawImage(this.sprites.background,0,0);
        this.ctx.drawImage(this.sprites.paddleShot, this.paddle.x, this.paddle.y);
        this.ctx.drawImage(this.sprites.ball, this.ball.x, this.ball.y);
        /*this.ctx.drawImage(this.sprites.greenBrick,65,100);
        this.ctx.drawImage(this.sprites.greyBrick,65,24);
        this.ctx.drawImage(this.sprites.redBrick,65,50);
        this.ctx.drawImage(this.sprites.yellowBrick,65,75);*/
        this.board.render();
    },
    start() {
        this.init();
        this.preload(() => {
            this.run();
        });
    }
}

window.addEventListener('load', () => {
    game.start();
})
