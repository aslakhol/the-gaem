<?php
// Set content type
header('Content-Type: application/json');

// Settings file location
$settings_file = dirname(dirname(dirname(__FILE__))) . '/settings/settings.json';

// Initial response code
$response['code'] = 500;

// Check if we have everything we need
if (isset($_POST['method']) and isset($_POST['name']) and ($_POST['method'] == 'add' or $_POST['method'] == 'remove')) {
    // Set response to 200
    $response['code'] = 200;

    // Load current settings
    $settings = json_decode(file_get_contents($settings_file), true);

    // Check what method to run
    if ($_POST['method'] == 'add') {
        // Add new name
        $settings['names'][] = $_POST['name'];
    }
    else {
        // Remove name
        $new_names = [];
        for ($i = 0; $i < count($settings['names']); $i++) {
            // Check for name that matches name we want to remove
            if ($settings['names'][$i] != $_POST['name']) {
                $new_names[] = $settings['names'][$i];
            }
        }
        
        // Overwrite the previous name list
        $settings['names'] = $new_names;
    }

    // Save settings
    file_put_contents($settings_file, json_encode($settings));
}

// Return JSON
echo json_encode($response);