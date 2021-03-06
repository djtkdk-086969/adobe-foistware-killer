// ==UserScript==
// @author         たかだか。(TakaDaka.)
// @name           Adobe Foistware Killer
// @namespace      https://twitter.com/djtkdk_086969
// @description:ja Adobe製品ダウンロードページの「オプションのプログラム」のチェックを自動的に外します。
// @description    Automatically unchecks the "Optional Offer" checkbox on download pages of Adobe products.
// @include        *://get*.adobe.com/*
// @version        0.25
// @grant          none
// @license        https://opensource.org/licenses/mit-license.php
// ==/UserScript==

(function() {
    console.log("AFK: Started.");
    window.addEventListener ("DOMContentLoaded", check_elem());

    var mo =
        new MutationObserver(function(mutationEventList){
            check_elem();
        });
    var mo_conf = {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: true
    };
    mo.observe(document.querySelector("body"), mo_conf);

    function check_elem() {
        console.log("AFK: Checking elements...");
        var offer = document.getElementById("offersInformationPane");
        if(offer === null) return;
        var cb = offer.getElementsByTagName("input");
        if(cb.length > 0) {
            mo.disconnect();
            Array.prototype.slice.call(cb).forEach(function (node) {
                if(node.checked) {
                    console.log("AFK: Foistware offer detected! Unchecking the #offerCheckbox.");
                    var event = new Event('change');
                    node.checked = false;
                    node.dispatchEvent(event);
                }
            });
            if(offer.querySelectorAll("p.afk_info").length === 0) {
                var info = document.createElement("p");
                info.className = "afk_info";
                if(navigator.language.substr(0,2) === "ja") {
                    info.innerHTML = "Adobe Foistware Killer によりオプションのプログラムが拒否されました。";
                } else {
                    info.innerHTML = "Adobe Foistware Killer declined the optional offer.";
                }
                offer.appendChild(info);
            }
        }
    }
})();

