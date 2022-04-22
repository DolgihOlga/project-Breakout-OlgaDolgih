game.paddle = {
    game: game,
    width: 100,
    height: 20,
    speed: 6,
    dx: 0,
    coords: [],
    setCoords() {
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
        if (direction === 37) {
            this.dx = -this.speed
        } else if (direction === 39) {
            this.dx = this.speed
        }
    },
    stop() {
        this.dx = 0;
    },
    move() {
        if (this.dx) {
            this.coords[0].x += this.dx;
        }
    },
}

