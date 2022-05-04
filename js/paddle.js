game.paddle = {
    game: game,
    width: 100,
    height: 20,
    speed: 6,
    dx: 0,
    coords: [],
    ball: game.ball,
    push() {
        if(this.ball) {
            this.ball.start();
            this.ball = null;
        }
    },
    setCoordsPaddle() {
        let x = (this.game.width - this.width) / 2;
        let y = (this.game.height - this.height) / 2 + 140;
        this.coords.push({
            x: x,
            y: y
        });
    },
    render() {
        this.game.ctx.drawImage(this.game.sprites.paddleShot, this.coords[0].x, this.coords[0].y);
    },
    start(direction) {
        if (direction === 'ArrowLeft') {
            this.dx = -this.speed
        } else if (direction === 'ArrowRight') {
            this.dx = this.speed
        }
    },
    stop() {
        this.dx = 0;
    },
    move() {
        if (this.dx) {
            this.coords[0].x += this.dx;
            if (this.ball) {
                this.ball.coordsBall[0].x += this.dx;
            }
        }
    },
    collide(paddle) {
        let x = this.game.ball.coordsBall[0].x + this.game.ball.dx;
        let y = this.game.ball.coordsBall[0].y + this.game.ball.dy;
        return x + this.game.ball.size > this.coords[0].x &&
            x < this.coords[0].x + paddle.width &&
            y + this.game.ball.size > this.coords[0].y &&
            y < this.coords[0].y + paddle.height;
    },
    getTouchOffset(x) {
        let diff = (this.coords[0].x + this.width) - x;
        let offset = this.width - diff;
        let result = 2*offset / this.width;
        return result - 1;
    },
    collideWall() {
        let paddleLeft = this.coords[0].x + this.dx;
        let paddleRight = paddleLeft + this.width;

        let worldLeft = (this.game.width - this.game.sprites.background.width) / 2;
        let worldRight = (this.game.width - this.game.sprites.background.width) / 2 + this.game.sprites.background.width;

        if (paddleLeft < worldLeft || paddleRight > worldRight) {
            this.dx = 0;
        }
    },
}

