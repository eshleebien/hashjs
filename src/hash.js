/**
    hasher.js
    @author Eshlee Romero | hello@esh.ph
*/

var Hash = function () {
    var source, key;

    function getParams (key) {
        source = source.replace(/#/, '');
        source = source.split('&');

        key = new RegExp(key + '\=', 'g');

        for (i = 0; i < source.length; i++) {
            if (source[i].match(key)) {
                result = source[i].split('=');

                if (result[1]) {
                    return result[1];
                }
            }
        }

        return null;
    }

    function setParams(str) {
        var oldHash = '',
            key = [];

        if (arguments[1]) {
            oldHash = source.replace(/#|?/, ''),

            if (oldHash !== '') {
                key = str.split('='),
                arrHash = oldHash.split('&'),
                srch = new RegExp(key[0], 'g');

                for (i in arrHash) {

                    if (arrHash[i].match(srch) !== null) {

                        if (i == 0) { // == works. i don't know why fvck
                            oldHash = oldHash.replace(arrHash[i], '');
                        }
                        else {
                            oldHash = oldHash.replace('&' + arrHash[i], '');
                        }
                    }
                }

                if (oldHash !== '') {
                    oldHash = oldHash + '&';
                }

                return window.location.hash = oldHash + str;
            }
        }

        return window.location.hash=str;
    }

    function setSource (src) {
        source = src;
    }

    return {
        get: function (key) {
            setSource(window.location.hash);

            return getParams(key);
        },
        getQueryString: function (key) {
            setSource(window.location.search);

            return getParams(key);
        },
        set: function (key) {
            setSource(window.location.hash);

            return setParams(key);
        },
        setQueryString: function () {
            setSource(window.location.search);

            return setParams(key);
        },


    };


};

function getHash(getParam, src) {
    var hash = window.location.hash,
        temp = {};

    if (src) {
        hash = src;
    }

    hash = hash.replace('#', '');
    hash = hash.split('&');

    getParam = new RegExp(getParam + '\=', 'g');

    for (i = 0; i < hash.length; i++) {
        if (hash[i].match(getParam)) {
            result = hash[i].split('=');

            if (result[1]) {
                return result[1];
            }
        }
    }

    return null;
}

function setHash(str) {
    if (arguments[1]) {
        var oldHash = window.location.hash.replace('#', ''),
            key = [];

        if (oldHash !== '') {
            key = str.split('='),
            arrHash = oldHash.split('&'),
            srch = new RegExp(key[0], 'g');

            for (i in arrHash) {

                if (arrHash[i].match(srch) !== null) {

                    if (i == 0) { // == works. i don't know why fvck
                        oldHash = oldHash.replace(arrHash[i], '');
                    }
                    else {
                        oldHash = oldHash.replace('&' + arrHash[i], '');
                    }
                }
            }

            if (oldHash !== '') {
                oldHash = oldHash + '&';
            }

            return window.location.hash = oldHash + str;
        }
    }

    return window.location.hash=str;
}

function removeHash(key) {
    var oldHash = window.location.hash.replace('#', ''),
        pattern = new RegExp(key + '(.+)(?=\&)', 'i');

    if (oldHash !== '') {
        oldHash = oldHash.replace(pattern, '');
        oldHash = oldHash.replace(/&+(?=\&)/i, '');
    }

    return window.location.hash = oldHash;
}
