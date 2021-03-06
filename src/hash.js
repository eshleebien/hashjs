/**
    hasher.js
    @author Eshlee Romero | hello@esh.ph
*/

var Hash = function () {
    var source, key;

    function getParams (key) {
        source = source.replace(/#|\?/, '');
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
        var kwargs = '',
            key = [];

        if (!arguments[1]) {
            kwargs = source.replace(/#|\?/, '');

            if (kwargs !== '') {
                key = str.split('='),
                kwarg = kwargs.split('&'),
                srch = new RegExp(key[0], 'g');

                for (i in kwarg) {

                    if (kwarg[i].match(srch) !== null) {

                        if (i == 0) { // == works. i don't know why fvck
                            kwargs = kwargs.replace(kwarg[i], '');
                        }
                        else {
                            kwargs = kwargs.replace('&' + kwarg[i], '');
                        }
                    }
                }

                if (kwargs !== '') {
                    kwargs = kwargs + '&';
                }

                return kwargs + str;
            }
        }

        return str;
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
        set: function (kwarg) {
            setSource(window.location.hash);

            return window.location.hash = setParams(kwarg);
        },
        setQueryString: function (kwarg) {
            setSource(window.location.search);

            return window.location.search = setParams(kwarg);
        },
        remote: function(key) {

        }
    };
};

var hasher = new Hash;
