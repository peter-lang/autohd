chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.url.indexOf('hd=1') != -1)
            return;

        var urlSplit = details.url.split('#');
        var urlPart = urlSplit.splice(0,1)[0];
        var hashPart = urlSplit.join('#');

        var redirectUrl = urlPart + (urlPart.indexOf('?') != -1 ? '&' : '?') + 'hd=1';

        if (hashPart > '') {
            redirectUrl = redirectUrl + '#' + hashPart;
        }
        
        return {
            redirectUrl: redirectUrl
        };
    },
    {
        urls: [
            "*://www.youtube.com/watch*"
        ],
        types: ["main_frame"]
    },
    ["blocking"]
);