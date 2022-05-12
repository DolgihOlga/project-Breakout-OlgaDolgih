'use strict';

const header = {
    render() {
        return `      
      <header class="header" id="header">
        <ul class="menu-buttons">
            <li class="menu-button button-home" id="button-home"><a href="#"></a></li>
            <li class="menu-button button-sound" id="button-sound"><a href="#"></a></li>
        </ul>
    </header>
    `;
    }
};

const navBar = {
    render() {
        return `
      <div class="content" id="content">        
       <h1>Breakout</h1>     
       <nav class="mainMenu" id="mainMenu">
            <input type="button" value="Play" class="mainMenu_link" id="play">
            <input type="button" value="Rules" class="mainMenu_link" id="rules">
            <input type="button" value="Records" class="mainMenu_link" id="records">
        </nav>
      </div>`;
    }
};


