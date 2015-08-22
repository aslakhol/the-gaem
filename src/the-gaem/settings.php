<?php
// Set content type
header('Content-Type: application/json');

// Array for settings
$settings = [];
$settings_file = dirname(dirname(dirname(__FILE__))) . '/storage/settings.json';

// Check if settings file exists

if (file_exists($settings_file)) {
    // Get settings
    $settings = json_decode(file_get_contents($settings_file), true);
}
else {
    // Set default settings
    $settings = [
        'state' => false,
        'sounds' => true,
        'min' => 60,
        'max' => 120,
        'double' => 10,
        'triple' => 10,
        'names' => [],
    ];

    // Save settings
    file_put_contents($settings_file, json_encode($settings));
}


// Return JSON
echo json_encode($settings);