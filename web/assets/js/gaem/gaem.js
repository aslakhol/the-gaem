var Gaem = (function (module) {
    
    /*
     * Private variables
     */
    var settings_old = {}; // The old settings
    var settings = {}; // The current settings
    var sounds = []; // List of sounds
    
    var state = false; // False = game is not running, true = fame is running
    var blocked = false; // False = don't start a new game if state changes, true = start a new game right away
    var counter = 0; // The current counter
    var spin = 0; // The value we are waiting for the counter to reach
    var gaemInterval = null; // Holds the interval that updates the counter
    
    /*
     * Analyze settings
     */
    var analyzeSettings = function () {
        // Check if we should start or stop
        if (blocked == false && settings.state == true && state == false) {
            // Start
            start();
        }
        else if (blocked == false && settings.state == false && state == true) {
            // Stop
            stop();
        }
        
        // Check if the new min/max is different than the old ones
        if (typeof settings_old.min !== 'undefined' && (settings_old.min != settings.min || settings_old.max != settings.max)) {
            generateSpinValue();
        }
    };
    
    /*
     * Generate spin value (time for spin)
     */
    var generateSpinValue = function () {
        spin = Gaem.utilities.randomInt((settings.min * 1000), (settings.max * 1000));
        
        console.log('Next spin @ ' + spin);
    }
    
    /*
     * Stop the gaem
     */
    var stop = function () {
        console.log('Stopping...');
        
        // Reset state
        state = false;
        
        // Clear interval
        clearInterval(gaemInterval);
        
        // Reset counter and spin
        counter = 0;
        spin = 0;
    };
    
    /*
     * Start the gaem
     */
    var start = function () {
        console.log('Starting...');
        
        // Set state to true
        state = true;
        
        // Generate next spin
        generateSpinValue();
        
        // Start the counter
        gaemInterval = setInterval(function (scope) {
            // Increase counter
            counter += 20;
            
            // Check if we should spin
            if (counter >= spin) {
                // Gogo spin, furst stop interval
                clearInterval(gaemInterval);
                
                // Call spin
                scope.spin();
            }
        }, 20, module);
    };
    
    /*
     * Generate template
     */
    var generateTemplate = function (id, num, index) {
        var names = [];
        
        // Create array of objects with random names
        for (var i = 0; i <= (num + 10); i++) {
            names.push({name: settings.names[Math.floor(Math.random() * settings.names.length)]});
        }
        
        // Get template
        var template = _.template(
            $( "script.template-spinner" ).html()
        );
        
        // Append template to container
        $('#container').append(template({'names': names, 'id': id}));
        
        // Calculate movement
        var movement = (num * 140) - 70;
        
        // Calculate random movement
        var dir = Gaem.utilities.randomInt(0, 1);
        var rand = Gaem.utilities.randomInt(0, 30);
        
        if (dir == 0) {
            movement -= rand;
        }
        else {
            movement += rand;
        }
        
        // Fade the spinner in
        $('#spinner_' + id).fadeIn(400);
        
        // Apply the effect
        setTimeout(function (scope, index) {
            var $spinner_container = $('#spinner_' + id + ' ul');
            $spinner_container.css({left: ($spinner_container.position().left - movement)});

            // Click sounds
            var clicks_played = 0;
            var click_interval = setInterval(function () {
                // Get current posision
                var current_pos = Math.floor($spinner_container.position().left) * -1;

                if (current_pos > 0) {
                    // Calculate how many blocks we have moved
                    var blocks_moved = Math.floor(current_pos / 130);

                    // Check if we should play sound
                    if (blocks_moved > clicks_played) {
                        // Increase clicks played
                        clicks_played++;

                        // Play click sound
                        var audio = new Audio('sounds/other/click.mp3');
                        audio.play();
                    }
                }
            }, 10);

            // Only do this once
            if (index == 0) {
                // Play sound
                setTimeout(function (scope, click_interval) {
                    // Check if we should play sounds
                    if (scope.playSounds()) {
                        // Play random sound
                        var audio = new Audio(scope.getSounds());
                        audio.play();
                    }

                    // Unset interval for clicking sounds
                    clearInterval(click_interval);

                    // Set timeout to start again (15 secs)
                    setTimeout(scope.restart, 15000);
                }, 8000, scope, click_interval);
           }
        }, (1500 + 400), module, index);
    };
    
    /*
     * Init function
     */
    module.init = function () {
        // Debug
        console.log('Init...');
        
        // Set underscore.js settings
        _.templateSettings.variable = 'rc';
        
        // Start fetching
        Gaem.fetchData.init();
    };
    
    /*
     * Spinner
     */
    module.spin = function () {
        console.log('Spinning...');
        
        // Set blocked to true
        blocked = true;
        
        var spins = 1;
        
        // Check for triple
        if (Gaem.utilities.randomInt(0, 100) <= settings.triple) {
            console.log('Triple spin!');
            spins = 3;
        }
        
        // Check for double
        if (spins == 1 && Gaem.utilities.randomInt(0, 100) <= settings.double) {
            console.log('Double spin!');
            spins = 2;
        }
        
        // Loop and create spins
        for (var i = 0; i < spins; i++) {
            // Generate number of blocks to spin
            var blocks = Gaem.utilities.randomInt(40, 70);
            // Generate random id
            var id = Gaem.utilities.randomString();
            
            // Generate template
            generateTemplate(id, blocks, i);
        }
    };
    
    /*
     * Restart
     */
    module.restart = function () {
        console.log('Restarting...');
        
        // Remove old spins
        $('#container > div').fadeOut(400, function () {
            $(this).remove();
        });
        
        // Unset blocked
        blocked = false;
        
        // Check what settings are saying
        if (settings.state == true) {
            // Start the gaem again
            setTimeout(start, 400);
        }
    };
    
    /*
     * Update settings
     */
    module.updateSettings = function (data) {
        // Store old settings
        settings_old = settings;
        
        // Store settings
        settings = data;
        
        // Analyze settings
        analyzeSettings();
    };
    
    /*
     * Set sounds
     */
    module.setSounds = function(data) {
        sounds = data;
    };
    
    /*
     * Get auto
     */
    module.getSounds = function () {
        return sounds[Math.floor(Math.random() * sounds.length)]
    };

    /*
     * Check if we should play sounds
     */
    module.playSounds = function () {
        return settings.sounds;
    }
    
    /*
     * Return the module
     */
    return module;
})(Gaem || {});