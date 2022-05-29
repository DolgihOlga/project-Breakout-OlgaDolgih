

export const header = {
    render() {
        return `      
      <header class="header" id="header">
        <ul class="menu-buttons">
            <li class="menu-button button-home" id="button-home"><a href="#"></a></li>
            <li class="menu-button button-sound" id="button-sound"></li>
        </ul>        
    </header>
    <audio id="audio"  loops>
            <source src="sounds/stereomadness.mp3" type="audio/mpeg">
     </audio>
    `;
    }
};

export const navBar = {
    render() {
        return `
      <div class="content" id="content">        
       <h1>Breakout Game</h1>     
       <nav class="mainMenu" id="mainMenu">
            <input type="button" value="Play" class="mainMenu_link" id="play">
            <input type="button" value="Rules" class="mainMenu_link" id="rules">
            <input type="button" value="Records" class="mainMenu_link" id="records">            
        </nav>
      </div>`;
    }
};

export function turnOnMusic() {
    let music = document.getElementById('audio');
    if (music.paused) {
        document.getElementById('button-sound').classList.add('on');
        music.play();
    } else {
        document.getElementById('button-sound').classList.remove('on');
        music.currentTime = 0;
        music.pause();
    }

}
