<?php
// Set content type
header('Content-Type: application/json');

// Array for sounds
$sounds = [];

// Sounds directory
$sounds_dir = dirname(dirname(dirname(__FILE__))) . '/web/sounds/';

// Read sounds directory
if ($handle = opendir($sounds_dir)) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != '.' and $entry != '..' and !is_dir($sounds_dir . $entry)) {
            $sounds[] = 'sounds/' . $entry;
        }
    }
    
    // Close handler
    closedir($handle);
}

// Return JSON
echo json_encode($sounds);