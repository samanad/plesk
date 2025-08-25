<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Edit Backend Message</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            color: #333;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            color: #667eea;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #555;
        }
        
        textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            min-height: 200px;
            resize: vertical;
        }
        
        .submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            cursor: pointer;
            transition: transform 0.2s;
            width: 100%;
        }
        
        .submit-btn:hover {
            transform: translateY(-2px);
        }
        
        .success-message {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
        }
        
        .error-message {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
        }
        
        .back-link {
            text-align: center;
            margin-top: 20px;
        }
        
        .back-link a {
            color: #667eea;
            text-decoration: none;
            font-weight: bold;
        }
        
        .back-link a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔧 Admin Panel</h1>
            <p>Edit the backend message that appears below the form</p>
        </div>
        
        <div class="success-message" id="successMessage">
            ✅ Message updated successfully!
        </div>
        
        <div class="error-message" id="errorMessage">
            ❌ Error updating message. Please try again.
        </div>
        
        <form id="adminForm">
            <div class="form-group">
                <label for="backendMessage">Backend Message (HTML allowed):</label>
                <textarea id="backendMessage" name="backendMessage" placeholder="Enter your message here... You can use HTML tags like <strong>, <em>, <br>, etc."></textarea>
            </div>
            
            <button type="submit" class="submit-btn">💾 Save Message</button>
        </form>
        
        <div class="back-link">
            <a href="index.html">← Back to Main Page</a>
        </div>
    </div>

    <script>
        const form = document.getElementById('adminForm');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        
        // Load current message when page loads
        document.addEventListener('DOMContentLoaded', function() {
            loadCurrentMessage();
        });
        
        // Load current backend message
        function loadCurrentMessage() {
            fetch('get_backend_message.php')
            .then(response => response.text())
            .then(data => {
                document.getElementById('backendMessage').value = data;
            })
            .catch(error => {
                console.error('Error loading message:', error);
                // Set default message
                document.getElementById('backendMessage').value = 'Welcome to our message board! This is a sample message that you can edit in the backend. Feel free to update this text with your own announcements, updates, or important information.';
            });
        }
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const message = document.getElementById('backendMessage').value;
            
            // Save message
            fetch('save_backend_message.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            })
            .then(response => response.text())
            .then(data => {
                if (data.includes('success')) {
                    showMessage(successMessage, true);
                    hideMessage(errorMessage);
                } else {
                    showMessage(errorMessage, false);
                    hideMessage(successMessage);
                }
            })
            .catch(error => {
                console.error('Error saving message:', error);
                showMessage(errorMessage, false);
                hideMessage(successMessage);
            });
        });
        
        // Show message
        function showMessage(element, isSuccess) {
            element.style.display = 'block';
            if (isSuccess) {
                element.style.background = '#d4edda';
                element.style.borderColor = '#c3e6cb';
                element.style.color = '#155724';
            } else {
                element.style.background = '#f8d7da';
                element.style.borderColor = '#f5c6cb';
                element.style.color = '#721c24';
            }
        }
        
        // Hide message
        function hideMessage(element) {
            element.style.display = 'none';
        }
    </script>
</body>
</html>
