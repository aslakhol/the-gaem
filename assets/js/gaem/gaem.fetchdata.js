var Gaem = (function (module) {
    
    /*
     * Public methods
     */
    module.fetchData = {
        init: function () {
            // Start fetching settings every 15 seconds
            setInterval(function () {
                $.ajax({
                    cache: false,
                    url: 'settings.php',
                    success: function(json) {
                        Gaem.updateSettings(json);
                    }
                });
            }, 15000);
            
            // Fetch sounds
            $.ajax({
                cache: false,
                url: 'sounds.php',
                success: function(json) {
                    Gaem.setSounds(json);
                }
            });
        },
    }
    
    /*
     * Return module with sub module functions
     */
    return module;
})(Gaem || {});