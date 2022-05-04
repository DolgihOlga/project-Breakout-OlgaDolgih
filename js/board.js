game.board = {
    game: game,
    bricks: [],
    bricksLine: [],
    rows: 4,
    cols: 8,
    create() {
        this.createCells();
        this.createBricksLine();
    },
    createCells() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.bricks.push(this.createCell(row, col));
            }
        }
    },
    createCell(row, col) {
        let brickWidth = this.game.sprites.greyBrick.width + 2;
        let brickHeight = this.game.sprites.greyBrick.height + 2;
        let offsetX = (this.game.width - brickWidth * this.cols) / 2;
        let offsetY = (this.game.height - brickHeight * this.rows * 4) / 2;
        return {
            active: true,
            width: 60,
            height: 20,
            x: offsetX + brickWidth * col,
            y: offsetY + brickHeight * row,
        }
    },
    createBricksLine() {
        for (let line = 0; line < this.bricks.length / this.cols; line++) {
            this.bricksLine[line] = this.bricks.slice(line * this.cols, (line * this.cols) + this.cols);
        }
    },
    render() {
        for (let brick of this.bricksLine[0]) {
            if(brick.active) {
                this.game.ctx.drawImage(this.game.sprites.greenBrick, brick.x, brick.y);
            }
        }
        for (let brick of this.bricksLine[1]) {
            if(brick.active) {
                this.game.ctx.drawImage(this.game.sprites.redBrick, brick.x, brick.y);
            }
        }
        for (let brick of this.bricksLine[2]) {
            if(brick.active) {
                this.game.ctx.drawImage(this.game.sprites.yellowBrick, brick.x, brick.y);
            }
        }
        for (let brick of this.bricksLine[3]) {
            if(brick.active) {
                this.game.ctx.drawImage(this.game.sprites.greyBrick, brick.x, brick.y);
            }
        }
    }
}


