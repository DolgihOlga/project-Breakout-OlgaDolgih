import {game} from "./breakout.js";


export const rules = {
    render() {
        return `
      <section class="rules">
         <h1>Breakout Game</h1>
         <h2>How To Play:</h2>      
      <div class="rules-container">
         <p>Use your right and left keys to move the paddle to bounce the ball up and break the bricks.</p>
         <p>If the player's paddle misses the ball's rebound, they will lose a turn.
            The player has three turns to try to clear screen of bricks</p> 
       <input type="button" value="Play" class=" buttonPlay" id="play"> 
       </div>      
      </section>
    `;
    }
};
export const Game = {
    render() {
        return `    
    <canvas id="breakout"></canvas>`

    },
};

export const records = {
    render() {
        return `
       <h1>Breakout Game</h1>    
       <h2>BEST RESULTS</h2> 
       <div id="results"></div>      
      `
    },
};
export const registration = {
    render() {
        return `
        <div class="container">    
        <form  id="form" class="form">
        <h2>Register With Us</h2>
        <div class="form-control">        
        <label for="username">Username</label>
        <input type="text" placeholder="Enter username" id="username">
        <button id="submit">Save</button>
        <small>error massage</small>
        </div>
        </form> 
        </div>   
        `
    }
}


export const score = {
    render() {
        let input = document.getElementById('username')
        return `
        <div class="gameOver">
           <h2>GAME OVER!</h2>
           <div class="gameScore"><p>${input.value} YOUR SCORE: ${game.score}</p></div>
           <button id="btn">Try again</button>

        </div>
        `
    }
}


export function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


export const checkLength = (input, min, max) => {
    return new Promise((resolve, reject) => {
        if (input.value.length > min && input.value.length < max && input.value.length !== '') {
            const formControl = input.parentElement;
            formControl.className =  'form-control success';
            resolve()
        } else   {
            const formControl = input.parentElement;
            formControl.className = 'form-control error';
            const small = formControl.querySelector('small');
            small.innerText = `${getFieldName(input)} must be less than ${max} and must be at least ${min}characters`;
            reject(small.innerText);
        }
    });
}