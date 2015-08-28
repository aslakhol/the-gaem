var Gaem = (function(module) {

    /*
     * Set the initial settings
     */
    var setInitialSettings = function() {
        settings = Gaem.utilities.getSettings();

        // Checkboxes
        if (settings.state) {
            $('#state').prop('checked', true);
        }
        if (settings.sounds) {
            $('#sounds').prop('checked', true);
        }

        $('#state').bootstrapSwitch();
        $('#sounds').bootstrapSwitch();

        // Double and triple
        $('#double,#triple').slider({
            formatter: function(val) {
                return val + '%';
            },
            value: settings.double,
            tooltip: 'always'
        });
        $('#triple').slider({
            formatter: function(val) {
                return val + '%';
            },
            value: settings.triple,
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
                settings.min,
                settings.max
            ],
            tooltip: 'always'
        });

        // Names
        if (settings.names.length > 0) {
            for (var i = 0; i < settings.names.length; i++) {
                // Get template
                var template = _.template(
                    $( "script.template-name" ).html()
                );

                // Append name data to list
                $('#admin-names-list').append(template({'name': settings.names[i]}));
            }
        }

        // Fade out loader
        $('#loading').fadeOut(400, function() {
            $('#settings').delay(400).fadeIn(400);
        });
    };

    /*
     * Add various listeners
     */
    var addListeners = function() {
        // Checkboxes
        $('#state,#sounds').on('switchChange.bootstrapSwitch', function(event, state) {
            Gaem.utilities.setSettings(this.id, state);
        });

        // Double and triple
        $('#double').on('slideStop', function(event) {
            Gaem.utilities.setSettings(this.id, event.value);
        });
        $('#triple').on('slideStop', function(event) {
            Gaem.utilities.setSettings(this.id, event.value);
        });

        // Min / max
        $('#minmax').on('slideStop', function(event) {
            // Get the current settings
            var settings = Gaem.utilities.getSettings();

            // Find out what was changed
            if (event.value[0] == settings.min) {
                // Max was changed
                Gaem.utilities.setSettings('max', event.value[1]);
            }
            else {
                // Min was changed
                Gaem.utilities.setSettings('min', event.value[0]);
            }
        });

        // Add name
        $('#name').on('keyup', function(e) {
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
        // Get the current settings
        var settings = Gaem.utilities.getSettings();

        console.log(settings);

        // Add the new name
        settings.names.push(name);

        // Store the new settings
        Gaem.utilities.setSettings('names', settings.names);

        // Get template
        var template = _.template(
            $( "script.template-name" ).html()
        );

        // Append name data to list
        $('#admin-names-list').append(template({'name': name}));

        // Reset input field
        $('#name').val('');
    };

    /*
     * Remove name
     */
    var nameRemove = function() {
        // Get the current settings
        var settings = Gaem.utilities.getSettings();

        // Find name
        var name = $(this).parent().text().trim();

        // Remove from settings array, using underscore because hax
        settings.names = _.without(settings.names, name);

        // Store the updated settings
        Gaem.utilities.setSettings('names', settings.names);

        // Remove element
        $(this).parent().slideUp(400, function() {
            $(this).remove();
        });
    };

    /*
     * Public methods
     */
    module.admin = {
        init: function() {
            // Set underscore.js settings
            _.templateSettings.variable = 'rc';

            // Load current settings
            setInitialSettings();

            // Add listeners
            addListeners();
        }
    };

    /*
     * Return module with sub module functions
     */
    return module;
})(Gaem || {});