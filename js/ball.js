import {game} from "./breakout.js";

game.ball = {
    game: game,
    size: 20,
    dx: 0,
    dy: 0,
    speed: 3,
    coordsBall: [],
    setBallCoords() {
        let x = (this.game.width - this.size) / 2;
        let y = (this.game.height - this.size) / 2 + 120;
        this.coordsBall.push({
            x: x,
            y: y
        });
    },
    render() {
        this.game.ctx.drawImage(this.game.sprites.ball,this.coordsBall[0].x,this.coordsBall[0].y);
    },
    start() {
        this.dy -= this.speed;
        this.dx = game.random(-this.speed, this.speed);
    },
    move() {
        if (this.dy) {
            this.coordsBall[0].y += this.dy;
        }
        if (this.dx) {
            this.coordsBall[0].x += this.dx;
        }
    },
    collideBricks() {
        for (let brick of this.game.board.bricks) {
            if(brick.active && this.collide(brick)) {
                    this.bumpBlock(brick);
                    game.addScore();
                    game.sounds.collision.play();
                }
            }
    },
    collidePaddle() {
        if (this.game.paddle.collide(this.game.paddle)) {
            console.log('ball collides paddle')
            this.bumpPaddle(this.game.paddle);
            game.sounds.collision.play();
        }
    },
    collide(brick) {
        let x = this.coordsBall[0].x + this.dx;
        let y = this.coordsBall[0].y + this.dy;
        return x + this.size > brick.x &&
            x < brick.x + brick.width &&
            y + this.size > brick.y &&
            y < brick.y + brick.height;
    },
    collideWall: function () {
        let x = this.coordsBall[0].x + this.dx;
        let y = this.coordsBall[0].y + this.dy;

        let ballLeft = x;
        let ballRight = ballLeft + this.size;
        let ballTop = y;
        let ballBottom = ballTop + this.size;

        let worldLeft = (this.game.width - this.game.sprites.background.width) / 2;
        let worldRight = (this.game.width - this.game.sprites.background.width) / 2 + this.game.sprites.background.width;
        let worldTop = (this.game.height - this.game.sprites.background.height) / 2;
        let worldBottom = (this.game.height - this.game.sprites.background.height) / 2 + this.game.sprites.background.height;

        if (ballLeft < worldLeft) {
            this.coordsBall[0].x = (this.game.width - this.game.sprites.background.width) / 2;
            this.dx = this.speed;

        } else if (ballRight > worldRight) {
            this.coordsBall[0].x = worldRight - this.size;
            this.dx = -this.speed;

        } else if (ballTop < worldTop) {
            this.coordsBall[0].y = (this.game.height - this.game.sprites.background.height) / 2;
            this.dy = this.speed;

        } else if (ballBottom > worldBottom) {
            --game.lives;
            if (!game.lives) {
                game.end();

            } else {
                this.dx = 0;
                this.dy = 0;
                this.coordsBall[0].x = (this.game.width - this.size) / 2;
                this.coordsBall[0].y = (this.game.height - this.size) / 2 + 120;
                game.paddle.coords[0].x = (this.game.width - game.paddle.width) / 2;
                this.start();
            }
        }
    },
    bumpBlock(brick) {
        this.dy *= -1;
        brick.active = false;
    },
    bumpPaddle(paddle) {
        if(paddle.dx) {
            this.coordsBall[0].x += paddle.dx;
        }
        if(this.dy > 0) {
            this.dy = -this.speed;
            let touchX = this.coordsBall[0].x + this.size / 2;
            this.dx = this.speed * paddle.getTouchOffset(touchX);
        }
    },
}