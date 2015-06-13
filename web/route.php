<?php
// Check what kind of request is made
if (preg_match('/\.(?:png|jpg|jpeg|gif|txt|css|js|eot|svg|ttf|woff|woff2|mp3)$/', $_SERVER['REQUEST_URI'])) {
    // Static request, return as is
    return false;
}
else {
    // Dynamic request
    include dirname(dirname(__FILE__)) . '/src/index.php';
}