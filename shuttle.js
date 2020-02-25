const proto     = 'https://';
const domain    = 'api.foundry.ga';
const endpoint  = '/plica/analyst'; //mxfr = metadata transfer

let collectedData = {};
let url         = proto + domain + endpoint;

window.onload = function () {
    collectedData   = {
        'hostname':     getHostname(),
        'queryString':  getQueryString(),
        'referer':      getReferer(),
        'cookie':       getCookies(),
        'visitTime':    getTimestampSec(),
    };
};

if (window.attachEvent) {
    /*IE and Opera*/
    window.attachEvent("onunload", function() {
        return unloadFunc()
    });

} else if (document.addEventListener) {
    /*Chrome, FireFox*/
    window.onbeforeunload = function() {
        return unloadFunc()
    };
    /*IE 6, Mobile Safari, Chrome Mobile*/
    window.addEventListener("unload", function() {
        return unloadFunc()
    }, false);

} else {
    /*etc*/
    document.addEventListener("unload", function() {
        return unloadFunc()
    }, false);
}

const unloadFunc = function () {
    collectedData['leaveTime'] = getTimestampSec();

    /*
    * Object {
    *   "cookie": {},               // cookie 값
    *   "hostname": "String",       // 접속한 사이트 호스트네임
    *   "queryString": {},          // 사이트 접속 시 쿼리스트링 값
    *   "referer": {                // 레퍼러 값
    *       "hostname": "String",   // 레퍼러의 호스트 명
    *       "origin": "String",     // utf-8 decode 된 레퍼러 원본
    *       "queryString": {}       // 레퍼러에 포함된 쿼리스트링
    *   },
    *   "arriveTime": Integer       // 방문 한 시간의 timestamp
    *   "leaveTime": Integer        // 종료 한 시간의 timestamp
    * }
    * */

    //transfer(url, collectedData, postProcess());
};

const getTimestampSec = function () {
    return Math.floor(+ new Date() / 1000);
};

const getHostname = function () {
    return window.location.hostname
};

const getQueryString = function () {
    return parseQueryString(decodeURIComponent(window.location.search));
};

const parseQueryString = function (s) {
    let params = {};
    s.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(str, key, value) {
            params[key] = value;
        });

    return params;
};

const getReferer = function () {
    let data = {};
    data['origin'] = decodeURIComponent(document.referrer);
    if (data.origin === '') {
        return ''
    }

    data['hostname']    = data.origin.split('?')[0].match(/^(http(s))?:\/\/([^\/]+)/)[3];
    data['queryString'] = parseQueryString(data.origin.split('?')[1]);

    return data
};

const getCookies = function () {
    const rawCookies = document.cookie.split(';');
    let cookies = {};
    for (let i = 0; i < rawCookies.length ; i++) {
        // 공백 제거
        rawCookies[i] = rawCookies[i].trim();
        let splitCookie = rawCookies[i].split('=');
        cookies[splitCookie[0]] = splitCookie[1];
    }

    return cookies
};

const transfer = function (url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && (xhr.status/200)===1) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
};

const postProcess = function (data) {
    console.log(data)
};
