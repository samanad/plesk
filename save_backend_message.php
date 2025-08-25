<?php
// Enable CORS for cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method not allowed';
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || empty($data['message'])) {
    http_response_code(400);
    echo 'Message content is required';
    exit();
}

// Save message to file
$filename = 'backend_message.txt';
$message = $data['message'];

$success = file_put_contents($filename, $message, LOCK_EX);

if ($success === false) {
    http_response_code(500);
    echo 'Failed to save backend message';
    exit();
}

// Success response
echo 'Backend message saved successfully';
?>
