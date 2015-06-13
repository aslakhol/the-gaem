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
                    url: 'settings',
                    success: Gaem.updateSettings
                });
            }, 15000);
            
            // Fetch sounds
            $.ajax({
                cache: false,
                url: 'sounds',
                success: Gaem.setSounds
            });
        }
    };
    
    /*
     * Return module with sub module functions
     */
    return module;
})(Gaem || {});