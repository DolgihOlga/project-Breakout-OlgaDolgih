game.paddle = {
    game: game,

    x: 0,
    y: 0,

    render() {
        let paddleWidth = this.game.sprites.paddleShot.width;
        let paddleHeight = this.game.sprites.paddleShot.height;
        let offsetX = (this.game.width - paddleWidth) / 2;
        let offsetY = (this.game.height - paddleHeight)/2 + 140;
        this.game.ctx.drawImage(this.game.sprites.paddleShot,offsetX,offsetY);
    },

}