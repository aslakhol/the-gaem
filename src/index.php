<?php
// Get the correct request
if (isset($_GET['q']) and strlen($_GET['q']) > 0) {
    // Apache / nginx
    $request = $_GET['q'];
}
else {
    // PHP server
    $request = $_SERVER['REQUEST_URI'];

    // Remove get params from the request
    if (strpos($request, '?') !== false) {
        // Remove get
        $request_split = explode('?', $request);
        $request = $request_split[0];
    }
}

// Check if first char is a slash and if it is, remove it
if (substr($request, 0, 1) == '/') {
    $request = substr($request, 1);
}

// Check for frontpage
if (strlen($request) == 0 or $request == '/') {
    $request = 'index';
}

// Check for php files
$php_file = dirname(__FILE__) . '/the-gaem/' . $request . '.php';
if (file_exists($php_file)) {
    // PHP file, include
    include_once $php_file;
}
else {
    // Oh well, serve HTML then
    $html_file = dirname(dirname(__FILE__)) . '/web/html/' . $request . '.html';

    // Set headers
    header("Content-type: text/html");

     // Clean ob and flush
    ob_clean();
    flush();

    // Read content of file
    readfile($html_file);
}

// Kill 'em all
exit;