var Gaem = (function (module) {
    
    /*
     * Public methods
     */
    module.utilities = {
        randomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        randomString: function () {
            var text = '';
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

            for (var i = 0; i < 10; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            
            return text;
        },
        secToPretty: function (val) {
            if (val < 60) {
                return val + ' sec';
            }
            else {
                var min = Math.floor(val / 60);
                var sec = val - (60 * min);
                return min + ' min' + ((sec == 0) ? '' : (' and ' + sec + ' sec'))
            }
        }
    };
    
    /*
     * Return module with sub module functions
     */
    return module;
})(Gaem || {});