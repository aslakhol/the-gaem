var Gaem = (function(module) {
    
    /*
     * Public methods
     */
    module.utilities = {
        randomInt: function(min, max) {
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
        secToPretty: function(val) {
            if (val < 60) {
                return val + ' sec';
            }
            else {
                var min = Math.floor(val / 60);
                var sec = val - (60 * min);
                return min + ' min' + ((sec == 0) ? '' : (' and ' + sec + ' sec'))
            }
        },
        getSettings: function() {
            var settings = null;

            // Check if there are any stored setting
            if (localStorage.getItem('the_gaem') === null) {
                // No settings exists in the system, create the default ones
                settings = {
                    'state': false,
                    'sounds': true,
                    'min': 60,
                    'max': 120,
                    'double': 10,
                    'triple': 10,
                    'names': []
                };

                // Store for later
                localStorage.setItem('the_gaem', JSON.stringify(settings));
            }
            else {
                // Just decode the settings
                settings = JSON.parse(localStorage.getItem('the_gaem'));
            }

            // Return the settings
            return settings;
        },
        setSettings: function(key, value) {
            // Get the current settings
            var settings = this.getSettings();

            // Update the setting
            settings[key] = value;

            // Store the new settings
            localStorage.setItem('the_gaem', JSON.stringify(settings));
        }
    };
    
    /*
     * Return module with sub module functions
     */
    return module;
})(Gaem || {});