/* By clicking on the extension's logo you can execute the cookiePredator function or redirect to a url.
 * by default it is activated so that the cookiePredator function is executed 
 * 
 * Comment out the option you don't want to use using // 
 */
chrome.browserAction.onClicked.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        
         /* current url */
        let url = tabs[0].url;

        /* Delete browser data */
        cookiePredator();

        //chrome.tabs.update(null, { url: "https://www.google.com?start" });
    });

})

/* If the word start is detected in the url, the script "main.js" is executed */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.active && changeInfo.url) {
        if (changeInfo.url.match(/start/gi) != null) {
            chrome.tabs.executeScript(null, { file: "main.js" });
        }
    }
});

/* If the word clear is detected in the url of the current tab, the cookiePredator(); function is executed */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.active && changeInfo.url) {
        if (changeInfo.url.match(/clear/gi) != null) {
            cookiePredator();
        }
    }
});


/* Delete all browser data, including cookies, cache and localStorage */
function cookiePredator() {
    var callback = function() {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {

            /* current url */
            let url = tabs[0].url;

            /* At the end of the function you can redirect to a Url or run a script, example: "do.js"
             * Comment out the option you don't want to use using // */

            chrome.tabs.update(null, { url: "https://www.google.com/?start" });
            //chrome.tabs.executeScript(null, { file: "main.js" });

        });
    };

    var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7; // One week
    var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
    chrome.browsingData.remove({
        "since": oneWeekAgo
    }, {
        "appcache": true,
        "cache": true,
        "cacheStorage": true,
        "cookies": true,
        "downloads": true,
        "fileSystems": true,
        "formData": true,
        "history": true,
        "indexedDB": true,
        "localStorage": true,
        "serverBoundCertificates": true,
        "pluginData": true,
        "passwords": true,
        "serviceWorkers": true,
        "webSQL": true
    }, callback);


}