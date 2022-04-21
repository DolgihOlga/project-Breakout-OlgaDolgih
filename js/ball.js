game.ball = {
    game: game,
    x: 0,
    y: 0,
    render() {
        let ballWidth = this.game.sprites.ball.width;
        let ballHeight = this.game.sprites.ball.height;
        let offsetX = (this.game.width - ballWidth) / 2;
        let offsetY = (this.game.height - ballHeight)/2 + 120;
        this.game.ctx.drawImage(this.game.sprites.ball,offsetX,offsetY);
    },
}