
import {header, navBar} from "./components.js";
import {rules,Game, records} from "./pages.js";

import {SwitchToMainPage, SwitchToGamePage, SwitchToRecordsPage, SwitchToRulesPage, SwitchToState} from "./states.js";
import {turnOnMusic} from "./components.js";

(function () {

    window.onhashchange = SwitchToStateFromURLHash;
    let SPAStateH = {};
    let spa = document.getElementById ('spa');
    function SwitchToStateFromURLHash() {
        let URLHash = window.location.hash;
        let StateJSON = decodeURIComponent(URLHash.substr(1));
        if (StateJSON !== "") {
            SPAStateH = JSON.parse(StateJSON);
        } else {
            SPAStateH = {pagename: 'main'};
        }
        let PageHTML = "";
        switch (SPAStateH.pagename) {
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

                /*$.ajax({
                    url: 'https://fe.it-academy.by/AjaxStringStorage2.php',
                    type: 'POST',
                    dataType: 'json',
                    cache: false,
                    data: {f: 'READ', n: 'DOLGIH_SCORE'},
                    success: readReady,
                    error: errorHandler
                });

            function readReady(data) {
                console.log("data", data.result);

                if (data.error !== undefined) {
                    alert(data.error);
                } else if (data.result !== "") {
                    let results = [];

                    results = JSON.parse(data.result);
                    console.log("results", JSON.parse(data.result));
                    let records = document.getElementById('results');
                    results.sort(function (a, b) {
                        if (a.score < b.score) {
                            return 1;
                        }
                        if (a.score > b.score) {
                            return -1;
                        }
                        return 0;
                    });
                    results.forEach((el) => {
                        if(el.score > 20) {
                            records.innerHTML +=`<div>${el.name}: ${el.score}</div>`;
                        }
                    });

                    document.getElementById('button-home').addEventListener('click', SwitchToMainPage);
                    document.getElementById('button-sound').addEventListener('click', turnOnMusic);
                }

            }
            function errorHandler(jqXHR, statusStr, errorStr) {
                alert(statusStr + ' ' + errorStr);
            }*/

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
