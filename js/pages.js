'use strict';

const rules = {
    render() {
        return `
      <section class="rules">
      <h1>Breakout Game</h1>
      <h2>How To Play:</h2>
      <div class="rules-container">
      <p>Use your right and left keys to move the paddle to bounce the ball up and break the bricks.</p>
      <p>If the player's paddle misses the ball's rebound, they will lose a turn.
       The player has three turns to try to clear two screens of bricks</p> 
       <input type="button" value="Play" class="buttonPlay" id="play"> 
       </div>      
      </section>
    `;
    }
};

const Game = {
    render() {
        return `    
        <canvas id="breakout"></canvas>`
    },
};