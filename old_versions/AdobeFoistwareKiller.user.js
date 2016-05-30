// ==UserScript==
// @author      たかだか。(TakaDaka.)
// @name        Adobe Foistware Killer
// @namespace   http://sotmentd0zaki.myhome.cx/
// @description Counter the Adobe's "Optional Offer" foistware (for Flash Player and Reader)
// @include     *://get*.adobe.com/*
// @version     beta 0.14
// @grant       none
// ==/UserScript==

(function() {
    //var already_run = false;
    console.log("AFK: Started.");
    window.addEventListener ("DOMContentLoaded", check_elem());

    var mo =
        new MutationObserver(function(mutationEventList){
            //console.log("Mutation observed");
            check_elem();
        });
    var mo_conf = {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: true
    }
    mo.observe(document.querySelector("body"), mo_conf);

    function check_elem() {
        console.log("AFK: Checking elements...");
        loc = location.href;
        if(document.getElementById("offerCheckbox") != null) {
            mo.disconnect();
            var event = new Event('change');
            console.log("AFK: AFK has found a foistware offer! Unchecking the offerCheckbox.");
            document.getElementById("offerCheckbox").checked=false
            document.getElementById("offerCheckbox").dispatchEvent(event);
            var info = document.createElement("p");
            info.innerHTML = "Adobe Foistware Killer によりチェックボックスが解除されました。";
            document.getElementById("offersInformationPane").appendChild(info);

            console.log("AFK: Redirecting to Distribution page.");
            /* 無関係なソフトを勧めてきたら */

            if(loc.match("/flashplayer/") != null) {
                location.href="https://www.adobe.com/jp/products/flashplayer/distribution3.html";
            } else if (loc.match("/reader/") != null) {
                location.href="http://get.adobe.com/jp/reader/enterprise/";
            }

        }
    }

})();

