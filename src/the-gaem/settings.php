<?php
header('Content-Type: application/json');

$settings = [
    'state' => true,
    'min' => 60,
    'max' => 120,
    'double' => 10,
    'tripple' => 10,
    'names' => [
        'Terri Ortega',
        'Genevieve Gordon',
        'Janet Figueroa',
        'Tim White',
        'Michele Murray',
        'Adrienne Caldwell',
        'Lyle Ward',
        'Velma Berry',
        'Sergio Curry',
        'Antonia Lane',
        'Ted Stewart',
        'Joey Williamson',
        'Harry Bridges',
        'Geoffrey Douglas',
        'Max Morrison',
        'Joshua Mullins',
        'Thelma Kennedy'
    ], 
];

// Echo
echo json_encode($settings);
?>