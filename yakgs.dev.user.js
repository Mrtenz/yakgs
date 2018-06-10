// ==UserScript==
// @name         Yet Another Kittens Game Script (Developer Version)
// @namespace    https://mrten.nl
// @version      1.0.0
// @description  Developer version of YAKGS.
// @author       Morten
// @match        *bloodrizer.ru/games/kittens*
// @grant        GM_xmlhttpRequest
// @connect      localhost
// ==/UserScript==

// Note: This userscript is made for local development only. See README.md for instructions.

(function() {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://localhost:8080/yakgs.user.js',
    onload: function(response) {
      const script = document.createElement('script');
      script.innerHTML = response.responseText;
      document.body.appendChild(script);
    }
  });
})();
