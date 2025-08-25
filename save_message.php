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

if (!$data) {
    http_response_code(400);
    echo 'Invalid JSON data';
    exit();
}

// Validate required fields
$required_fields = ['title', 'author', 'email', 'category', 'message'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo "Missing required field: $field";
        exit();
    }
}

// Add timestamp if not provided
if (empty($data['timestamp'])) {
    $data['timestamp'] = date('Y-m-d H:i:s');
}

// Create message text
$message_text = "=== NEW MESSAGE ===\n";
$message_text .= "Date: " . date('Y-m-d H:i:s') . "\n";
$message_text .= "Title: " . htmlspecialchars($data['title']) . "\n";
$message_text .= "Author: " . htmlspecialchars($data['author']) . "\n";
$message_text .= "Email: " . htmlspecialchars($data['email']) . "\n";
$message_text .= "Category: " . htmlspecialchars($data['category']) . "\n";
$message_text .= "Message: " . htmlspecialchars($data['message']) . "\n";
$message_text .= "==================\n\n";

// Save to messages.txt file
$filename = 'messages.txt';
$success = file_put_contents($filename, $message_text, FILE_APPEND | LOCK_EX);

if ($success === false) {
    http_response_code(500);
    echo 'Failed to save message';
    exit();
}

// Also save to JSON file for easier retrieval
$json_filename = 'messages.json';
$messages = [];

// Load existing messages if file exists
if (file_exists($json_filename)) {
    $existing_content = file_get_contents($json_filename);
    if ($existing_content) {
        $messages = json_decode($existing_content, true) ?: [];
    }
}

// Add new message to beginning
array_unshift($messages, $data);

// Keep only last 50 messages
$messages = array_slice($messages, 0, 50);

// Save updated JSON file
$json_success = file_put_contents($json_filename, json_encode($messages, JSON_PRETTY_PRINT), LOCK_EX);

if ($json_success === false) {
    // JSON save failed, but text file was saved
    echo 'Message saved to text file, but JSON update failed';
    exit();
}

// Success response
echo 'Message saved successfully';
?>
