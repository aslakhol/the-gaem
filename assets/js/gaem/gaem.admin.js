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
        if (settings.names == undefined) {
            settings.names = [];
        }

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

        // Names
        if (data.names.length > 0) {
            for (var i = 0; i < data.names.length; i++) {
                // Get template
                var template = _.template(
                    $( "script.template-name" ).html()
                );

                // Append name data to list
                $('#admin-names-list').append(template({'name': data.names[i]}));
            }
        }

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

        // Add name
        $('#name').on('keyup', function (e) {
            if ($(this).val().length > 0 && e.keyCode == 13) {
                nameAdd($(this).val());
            }
        });

        // Rename name
        $('#admin-names-list').on('click', '.admin-names-remove', nameRemove);
    };

    /*
     * Add new name
     */
    var nameAdd = function(name) {
        // Add name to settings
        settings.names.push(name);

        // Get template
        var template = _.template(
            $( "script.template-name" ).html()
        );

        // Append name data to list
        $('#admin-names-list').append(template({'name': name}));

        // Reset input field
        $('#name').val('');

        // Update settings file
        $.ajax({
            cache: false,
            url: 'name',
            type: 'post',
            data: {
                'method': 'add',
                'name': name
            }
        });
    };

    /*
     * Remove name
     */
    var nameRemove = function() {
        // Find name
        var name = $(this).parent().text().trim();

        // Remove from settings array, using underscore because hax
        settings.names = _.without(settings.names, name);

        // Remove element
        $(this).parent().slideUp(400, function () {
            $(this).remove();
        });

        // Update settings file
        $.ajax({
            cache: false,
            url: 'name',
            type: 'post',
            data: {
                'method': 'remove',
                'name': name
            }
        });
    };

    /*
     * Public methods
     */
    module.admin = {
        init: function () {
            // Set underscore.js settings
            _.templateSettings.variable = 'rc';

            // Load current settings
            loadSettings();
        }
    };

    /*
     * Return module with sub module functions
     */
    return module;
})(Gaem || {});