<?php
// Enable CORS for cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo 'Method not allowed';
    exit();
}

// File to read backend message from
$filename = 'backend_message.txt';

// Check if backend message file exists
if (!file_exists($filename)) {
    // Return default message if file doesn't exist
    echo 'Welcome to our message board! This is a sample message that you can edit in the backend. Feel free to update this text with your own announcements, updates, or important information.';
    exit();
}

// Read and return the backend message
$message = file_get_contents($filename);
if ($message === false) {
    // Return default message if file can't be read
    echo 'Welcome to our message board! This is a sample message that you can edit in the backend. Feel free to update this text with your own announcements, updates, or important information.';
    exit();
}

// Return the backend message
echo $message;
?>
