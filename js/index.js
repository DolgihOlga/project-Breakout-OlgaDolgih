
import {header} from "./components.js";
import {navBar} from "./components.js";
import {rules} from "./pages.js";
import {Game} from "./pages.js";
import {records} from "./pages.js";

import {SwitchToMainPage} from "./states.js";
import {SwitchToGamePage} from "./states.js";
import {SwitchToRecordsPage} from "./states.js";
import {SwitchToRulesPage} from "./states.js";



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

                $.ajax({
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



                    results.forEach((el) => {
                        if(el.score > 20) {
                            PageHTML +=`<div><p>${el.name}: ${el.score}</p> </div>`;
                        }

                    });

                    spa.innerHTML = PageHTML;
                    document.getElementById('button-home').addEventListener('click', SwitchToMainPage);
                }

            }
            function errorHandler(jqXHR, statusStr, errorStr) {
                alert(statusStr + ' ' + errorStr);
            }

        }
        spa.innerHTML = PageHTML;

        document.getElementById('button-home').addEventListener('click', SwitchToMainPage);
        document.getElementById('play').addEventListener('click', SwitchToGamePage);
        document.getElementById('rules').addEventListener('click', SwitchToRulesPage);
        document.getElementById('records').addEventListener('click', SwitchToRecordsPage);
    }

    SwitchToStateFromURLHash();
})();
