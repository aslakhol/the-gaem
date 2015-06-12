<?php
// Set content type
header('Content-Type: application/json');

// Array for sounds
$sounds = [];

// Read sounds directory
if ($handle = opendir(dirname(dirname(dirname(__FILE__))) . '/web/sounds/')) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != '.' && $entry != '..') {
            $sounds[] = 'sounds/' . $entry;
        }
    }
    
    // Close handler
    closedir($handle);
}

echo json_encode($sounds);
?>