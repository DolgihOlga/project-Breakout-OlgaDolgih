'use strict';

let game = {
    canvas:null,
    ctx: null,
    board: null,
    paddle: null,
    ball: null,
    width: 0,
    height: 0,
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
    dimensions: {
        max: {
            width: 640,
            height: 450
        },
        min: {
            width: 500,
            height: 400
        }
    },

    init() {
        this.canvas = document.getElementById('breakout');
        this.ctx = this.canvas.getContext('2d');
        this.initDimensions();
    },
    initDimensions() {
        let data = {
            maxWidth: this.dimensions.max.width,
            maxHeight: this.dimensions.max.height,
            minWidth: this.dimensions.min.width,
            minHeight: this.dimensions.min.height,
            realWidth: window.innerWidth,
            realHeight: window.innerHeight
        }
        if(data.realWidth / data.realHeight > data.maxWidth / data.maxHeight) {
            this.fitWidth(data) // если коэфициент realWidth/ realHeight больше, то подгоняем по ширине
        } else {
            this.fitHeight(data) //растянуть по высоте
        }

        this.canvas.width = this.width;
        this.canvas.height = this.height;

    },
    fitWidth(data) {
        this.height = Math.round(this.width * data.realHeight / data.realWidth);
        this.height = Math.min(this.height, data.maxHeight);
        this.height = Math.max(this.height, data.minHeight);
        this.width = Math.round(data.realWidth * this.height / data.realHeight);
        this.canvas.style.width = '100%';

    },

    fitHeight(data) {


        this.width = Math.round((data.realWidth * data.maxHeight)/data.realHeight);
        this.width = Math.min(this.width, data.maxWidth);
        this.width = Math.max(this.width, data.minWidth);
        this.height = Math.round((this.width * data.realHeight) / data.realWidth);
        this.canvas.style.height = '100%';
        console.log(this.width, this.height);
            // realWidth / realHeight
           // resultWidth / maxHeight
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
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.drawImage(this.sprites.background, (this.width - this.sprites.background.width)/2,(this.height - this.sprites.background.height)/2);
        this.board.render();
        this.paddle.render();
        this.ball.render();
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
