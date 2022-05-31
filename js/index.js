import {header, navBar} from "./components.js";
import {rules, Game, records} from "./pages.js";

import {SwitchToMainPage, SwitchToGamePage, SwitchToRecordsPage, SwitchToRulesPage} from "./states.js";
import {turnOnMusic} from "./components.js";

(function () {

    window.onhashchange = SwitchToStateFromURLHash;
    let spa = document.getElementById ('spa');
    function SwitchToStateFromURLHash() {
        let URLHash = window.location.hash;
        let StateJSON = decodeURIComponent(URLHash.substr(1));
        if (StateJSON === '') {
            StateJSON = {pagename: 'main'};
        } else {
            StateJSON = JSON.parse(StateJSON);
        }
        let PageHTML = "";
        switch (StateJSON.pagename) {
            case 'main':
                PageHTML += header.render();
                PageHTML += navBar.render();
                break;
            case 'rules':
                PageHTML += header.render();
                PageHTML += rules.render();
                break;
            case 'play':
                PageHTML += Game.render();
                break;
            case 'records':
                PageHTML += header.render();
                PageHTML += records.render();

                let password = Math.random();
                let formData = new FormData();
                formData.append("f", "READ");
                formData.append("n", "DOLGIH_GAME_SCORES");
                formData.append("p", password);

                let requestOptions = {
                    method: "POST",
                    body: formData,
                };
                fetch("https://fe.it-academy.by/AjaxStringStorage2.php", requestOptions)
                    .then((response) =>  response.json())
                    .then((data) => {

                        if (data.error !== undefined) {
                            alert(data.error);
                        } else if (data.result !== "") {
                            let results = [];

                            results = JSON.parse(data.result);
                            console.log("results", JSON.parse(data.result));
                            let records = document.getElementById('results');
                            let sortedRes = results.sort(function (a, b) {
                                if (a.score < b.score) {
                                    return 1;
                                }
                                if (a.score > b.score) {
                                    return -1;
                                }
                                return 0;
                            });
                            sortedRes.slice(0,10).forEach((el) => {
                                    records.innerHTML +=`<div>${el.name}: ${el.score}</div>`;
                            });
                            document.getElementById('button-home').addEventListener('click', SwitchToMainPage);
                            document.getElementById('button-sound').addEventListener('click', turnOnMusic);
                        }

                    }).catch((error) => console.log("error", error));

        }
        spa.innerHTML = PageHTML;
        document.getElementById('button-sound').addEventListener('click', turnOnMusic);
        document.getElementById('button-home').addEventListener('click', SwitchToMainPage);
        document.getElementById('play').addEventListener('click', SwitchToGamePage);
        document.getElementById('rules').addEventListener('click', SwitchToRulesPage);
        document.getElementById('records').addEventListener('click', SwitchToRecordsPage);

    }

    SwitchToStateFromURLHash();
})();
