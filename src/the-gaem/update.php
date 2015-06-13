<?php
// Set content type
header('Content-Type: application/json');

// Store status
$response = [
    'code' => 500
];

// Location of settings file
$settings_file = dirname(dirname(dirname(__FILE__))) . '/settings/settings.json';

// Check if we have everything we need
if (isset($_POST['field']) and isset($_POST['value'])) {
    // Set response to 200
    $response['code'] = 200;

    // Load current settings
    $settings = json_decode(file_get_contents($settings_file), true);

    // State and sounds
    if (($_POST['field'] == 'state' or $_POST['field'] == 'sounds') and ($_POST['value'] == 'true' or $_POST['value'] == 'false')) {
        if ($_POST['value'] == 'true') {
            $settings[$_POST['field']] = true;
        }
        else {
            $settings[$_POST['field']] = false;
        }
    }

    // Double and triple
    if (($_POST['field'] == 'double' or $_POST['field'] == 'triple') and $_POST['value'] >= 0 and $_POST['value'] <= 100) {
        $settings[$_POST['field']] = (int) $_POST['value'];
    }

    // Min and max
    if (($_POST['field'] == 'min' or $_POST['field'] == 'max') and $_POST['value'] >= 30 and $_POST['value'] <= 600) {
        $settings[$_POST['field']] = (int) $_POST['value'];
    }

    // Save settings
    file_put_contents($settings_file, json_encode($settings));
}

// Return JSON
echo json_encode($response);