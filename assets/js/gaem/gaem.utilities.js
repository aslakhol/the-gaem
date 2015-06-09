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
    }
    
    /*
     * Return module with sub module functions
     */
    return module;
})(Gaem || {});