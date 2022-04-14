game.board = {
    game: game,
    cells: [],
    bricksLine: [],
    rows: 4,
    cols: 8,
    createCells() {
        for(let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.cells.push({
                    x: 64*col + 65,
                    y: 24*row + 35
                })
            }
        }

    },
    createBricksLine() {
        for(let line = 0; line < this.cells.length/this.cols; line++) {
            this.bricksLine[line] = this.cells.slice(line*this.cols, (line*this.cols) + this.cols);
        }
    },
    render() {
        for (let brick of this.bricksLine[0]) {
            this.game.ctx.drawImage(this.game.sprites.greenBrick,brick.x,brick.y);
        }
        for (let brick of this.bricksLine[1]) {
            this.game.ctx.drawImage(this.game.sprites.redBrick,brick.x,brick.y);
        }
        for (let brick of this.bricksLine[2]) {
            this.game.ctx.drawImage(this.game.sprites.yellowBrick,brick.x,brick.y);
        }
        for (let brick of this.bricksLine[3]) {
            this.game.ctx.drawImage(this.game.sprites.greyBrick,brick.x,brick.y);
        }
    }
}

