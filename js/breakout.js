'use strict';

let game = {
    canvas: null,
    ctx: null,
    board: null,
    paddle: null,
    ball: null,
    running: true,
    score: 0,
    lives: 3,
    width: 0,
    height: 0,
    sounds: {
        collision: null,
    },
    sprites: {
        background: null,
        ball: null,
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
            height: 400
        },
        min: {
            width: 640,
            height: 400
        }
    },
    init() {
        this.canvas = document.getElementById('breakout');
        this.ctx = this.canvas.getContext('2d');
        this.initDimensions();
        this.setEvents();
        this.setTextFont();
    },
    setTextFont() {
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = '#FFFFFF';
    },
    setEvents() {
        window.addEventListener('keydown', e => {
            if (e.code === 'Space') {
                this.paddle.push();
            } else if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
                this.paddle.start(e.code);
            }
        });
        window.addEventListener("keyup", e => {
            this.paddle.stop();
        });

        this.canvas.addEventListener('touchstart', e => {
            this.paddle.touchStart(e);
        });

        this.canvas.addEventListener('touchmove', e => {
            this.paddle.touchMove(e);
        });

        this.canvas.addEventListener('touchend', e => {
            this.paddle.touchEnd(e);
        });
    },
    initDimensions() {
        let data = {
            maxWidth: this.dimensions.max.width,
            maxHeight: this.dimensions.max.height,
            minWidth: this.dimensions.min.width,
            minHeight: this.dimensions.min.height,
            realWidth: window.innerWidth,
            realHeight: window.innerHeight
        };

        if (data.realWidth/data.realHeight > data.maxWidth/data.maxHeight) {
            this.fitWidth(data);
        } else {
            this.fitHeight(data);
        }
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },
    fitWidth(data) {
        this.height = Math.round(this.width * data.realHeight / data.realWidth);
        this.height = Math.min(this.height, data.maxHeight);
        this.height = Math.max(this.height, data.minHeight);
        this.width = Math.round(data.realWidth * this.height / data.realHeight);
        this.canvas.style.width = "100%";
    },
    fitHeight(data) {
        this.width = Math.round(data.realWidth * data.maxHeight / data.realHeight);
        this.width = Math.min(this.width, data.maxWidth);
        this.width = Math.max(this.width, data.minWidth);
        this.height = Math.round(this.width * data.realHeight / data.realWidth);
        this.canvas.style.height = "100%";
    },
    preload(callback) {
        let load = 0;
        let required = Object.keys(this.sprites).length;
        required += Object.keys(this.sounds).length;
        let onAssetLoad = () => {
            ++load;
            if (load >= required) {
                callback();
            }
        }
        this.preloadSprites(onAssetLoad);
        this.preloadAudio(onAssetLoad);
    },
    preloadSprites(onAssetLoad) {
        for (let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = 'img/' + key + '.png';
            this.sprites[key].addEventListener('load', onAssetLoad);
        }
    },
    preloadAudio(onAssetLoad) {
        for (let key in this.sounds) {
            this.sounds[key] = new Audio('sounds/' + key + '.wav');
            this.sounds[key].addEventListener('canplaythrough', onAssetLoad, {once: true});
        }
    },
    create() {
        this.board.create();
        this.paddle.setCoordsPaddle();
        this.ball.setBallCoords();
    },
    random(min, max) {
        return Math.floor(Math.random()*(max-min + 1) + min);
    },
    addScore() {
        ++this.score;
        if (this.score >= game.board.bricks.length) {
            this.end("You win");
        }
    },
    end(message) {
        this.running = false;
        alert(message);
        window.location.reload();
    },
    update() {
        this.ball.collideBricks();
        this.ball.collidePaddle();
        this.ball.collideWall();
        this.paddle.collideWall();

        this.paddle.move();
        this.ball.move();
    },
    run() {
        if(this.running) {
            window.requestAnimationFrame(() => {
                this.update();
                this.render();
                this.run();
            })
        }
    },
    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);// перед тем как отрисовать новый кадр, очистить все, что было
        this.ctx.drawImage(this.sprites.background,(this.width - this.sprites.background.width) / 2, (this.height - this.sprites.background.height) / 2);
        this.board.render();
        this.paddle.render();
        this.ball.render();
        this.ctx.fillText(`Score: ${this.score}`, (this.width - this.sprites.background.width) / 2 + 20, (this.height - this.sprites.background.height) /2 + 20 );
        this.ctx.fillText(`Lives: ${this.lives}`,(this.width - this.sprites.background.width) / 2 + this.sprites.background.width - 90, (this.height - this.sprites.background.height) /2 + 20 )
    },
    start() {
        this.init();
        this.preload(() => {
            this.create();
            this.run();
        });
    }
}

window.addEventListener('load', () => {
    game.start();
})

