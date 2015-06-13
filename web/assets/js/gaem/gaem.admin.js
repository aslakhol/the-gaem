var Gaem = (function (module) {

    /*
     * Private variables
     */
    var settings = {};

    /*
     * Load the settings
     */
    var loadSettings = function () {
        $.ajax({
            cache: false,
            url: 'settings',
            success: setInitialSettings
        });
    };

    /*
     * Set the initial settings
     */
    var setInitialSettings = function (data) {
        // Set to variable
        settings = data;

        // Checkboxes
        if (data.state) {
            $('#state').prop('checked', true);
        }
        if (data.sounds) {
            $('#sounds').prop('checked', true);
        }

        $('#state').bootstrapSwitch();
        $('#sounds').bootstrapSwitch();

        // Double and triple
        $('#double,#triple').slider({
            formatter: function(val) {
                return val + '%';
            },
            value: data.double,
            tooltip: 'always'
        });
        $('#triple').slider({
            formatter: function(val) {
                return val + '%';
            },
            value: data.triple,
            tooltip: 'always'
        });

        // Minmax
        $('#minmax').slider({
            formatter: function(val) {
                if (typeof val == 'object' && typeof val[0] == 'number') {
                    // Convert from seconds to min and seconds
                    val[0] = 'Min: ' + Gaem.utilities.secToPretty(val[0]);
                    val[1] = ' Max: ' + Gaem.utilities.secToPretty(val[1]);
                }
                return val;
            },
            value: [
                data.min,
                data.max
            ],
            tooltip: 'always'
        });

        // Fade out loader
        $('#loading').fadeOut(400, function () {
            $('#settings').delay(400).fadeIn(400);
        });

        // Add listeners
        addListeners();
    };

    /*
     * Update settings
     */
    var setSettings = function (id, value) {
        // Update settings data
        settings[id] = value;

        // Update settings file
        $.ajax({
            cache: false,
            url: 'update',
            type: 'post',
            data: {
                'field': id,
                'value': value
            }
        });
    };

    /*
     * Add various listeners
     */
    var addListeners = function () {
        // Checkboxes
        $('#state,#sounds').on('switchChange.bootstrapSwitch', function (event, state) {
            setSettings(this.id, state);
        });

        // Double and triple
        $('#double').on('slideStop', function (event) {
            setSettings(this.id, event.value);
        });
        $('#triple').on('slideStop', function (event) {
            setSettings(this.id, event.value);
        });

        // Min / max
        $('#minmax').on('slideStop', function (event) {
            // Find out what was changed
            if (event.value[0] == settings.min) {
                // Max was changed
                setSettings('max', event.value[1]);
            }
            else {
                // Min was changed
                setSettings('min', event.value[0]);
            }
        });
    };

    /*
     * Public methods
     */
    module.admin = {
        init: function () {
            // Load current settings
            loadSettings();
        }
    };

    /*
     * Return module with sub module functions
     */
    return module;
})(Gaem || {});