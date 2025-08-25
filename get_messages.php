<?php
// Enable CORS for cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// File to read messages from
$json_filename = 'messages.json';

// Check if messages file exists
if (!file_exists($json_filename)) {
    echo json_encode([]);
    exit();
}

// Read messages from file
$content = file_get_contents($json_filename);
if (!$content) {
    echo json_encode([]);
    exit();
}

// Decode JSON
$messages = json_decode($content, true);
if (!$messages || !is_array($messages)) {
    echo json_encode([]);
    exit();
}

// Return messages as JSON
echo json_encode($messages);
?>
