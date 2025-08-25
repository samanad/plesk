# 📝 Simple Message Template

A clean, simple HTML template for entering and submitting messages with a beautiful, modern design.

## 🚀 Quick Start

### **Option 1: Direct HTML (Simplest)**
1. **Open `index.html`** in any web browser
2. **Fill in the form fields:**
   - Message Title
   - Author Name
   - Email Address
   - Category
   - Your Message
3. **Click Submit** to see your message preview

### **Option 2: Local Server (For Development)**
```bash
# Install dependencies (optional)
npm install

# Start local server
npm run serve

# Open http://localhost:8000 in your browser
```

### **Option 3: Plesk Deployment**
1. **Upload to your Plesk domain** (`/var/www/vhosts/yourdomain.com/httpdocs/`)
2. **Access via your domain** - the HTML file will be served automatically
3. **No Node.js required** - pure HTML/CSS/JavaScript

## ✨ Features

- **📝 Text Input Fields** - Easy message entry
- **🎨 Modern Design** - Beautiful gradient background and clean UI
- **📱 Responsive** - Works on all devices
- **👀 Real-time Preview** - See your message as you type
- **✅ Form Validation** - Required fields and email validation
- **🔄 Auto-clear** - Form resets after submission

## 🎯 Use Cases

- **Contact Forms** - Customer inquiries and support
- **Feedback Collection** - User feedback and suggestions
- **Message Boards** - Simple posting system
- **Content Creation** - Draft and preview messages
- **Data Entry** - Structured information collection

## 🔧 Customization

### **Change Colors**
Edit the CSS variables in the `<style>` section:
```css
body {
    background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

### **Add New Fields**
Add new form groups following the existing pattern:
```html
<div class="form-group">
    <label for="newField">New Field:</label>
    <input type="text" id="newField" name="newField" placeholder="Enter new field..." required>
</div>
```

### **Modify Validation**
Update the JavaScript form handling in the `<script>` section.

## 📁 File Structure

```
├── index.html          # Main HTML template
├── package.json        # Project configuration
├── README.md          # This file
└── src/               # Source code (kept for reference)
    ├── index.js       # Node.js server (disabled)
    ├── config.js      # Configuration (kept for reference)
    └── utils.js       # Utilities (kept for reference)
```

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📝 License

MIT License - Feel free to use and modify for your projects!

---

**Ready to use!** Just open `index.html` in your browser and start entering messages. 🎉
