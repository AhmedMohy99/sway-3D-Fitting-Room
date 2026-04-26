# 🎨 Sway Maverick - 3D Virtual Fitting Room

**Project Type:** Interactive E-Commerce Web Application (Frontend)  
**Brand:** Sway Maverick (Technical Streetwear)  
**Version:** 2.0 (Enhanced & Bug-Fixed)

---

## 📌 Project Overview

The Sway Maverick 3D Virtual Fitting Room is an innovative e-commerce web application designed to reduce sizing-related returns and enhance the customer shopping experience. It allows users to interact with a 3D human model (Male/Female), dynamically scale the body dimensions based on their exact height and weight, and virtually try on streetwear garments (Oversize T-shirts, Regular T-shirts, and Sweatpants) using real-time texture swapping.

---

## ✨ Key Features

### 🆕 **NEW in Version 2.0**
- ✅ **Fixed Race Condition Bug** - Textures now apply correctly after model loading
- ✅ **Smart Size Recommendation System** - AI-based size suggestions using BMI calculations
- ✅ **Loading Progress Indicators** - Visual feedback during 3D model loading
- ✅ **Error Handling & Notifications** - User-friendly error messages and success confirmations
- ✅ **Mobile Responsive Design** - Optimized for phones and tablets
- ✅ **Improved Body Scaling Algorithm** - More realistic proportions using BMI-aware calculations
- ✅ **Add to Cart Functionality** - Basic cart system with counter

### 🎯 **Core Features**
1. **Dynamic Body Scaling** - Users input their Height (cm) and Weight (kg). JavaScript calculates a scale matrix and applies it to the 3D model.
2. **Real-time Texture Swapping** - Single `.glb` model with dynamic texture loading (no need for multiple heavy files).
3. **Gender Toggle** - Switch between Male and Female body models seamlessly.
4. **Smart Size Guide** - Automatic size recommendations based on body measurements and fit type.
5. **Interactive 3D Model** - Rotate, zoom, and auto-rotate features using model-viewer.

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **3D Rendering:** Google's `<model-viewer>` web component
* **3D Modeling:** Blender (for preparing `.glb` models)
* **Deployment:** Vercel / GitHub Pages / Netlify

---

## 📂 File Structure

```
sway-3D-Fitting-Room/
│
├── index.html              # Main HTML file (enhanced with loading states)
├── style.css               # Styling with mobile responsiveness
├── script.js               # JavaScript logic (bug-fixed & enhanced)
│
├── public/
│   ├── model/
│   │   ├── sway_male_model.glb       # Male 3D body model
│   │   └── FemaleBodyWithShirt.glb   # Female 3D body model
│   │
│   └── textures/
│       ├── maverick-phoenix-white.png
│       ├── catalyst-tee.png
│       ├── yellowish-splash.png
│       ├── greenish-splash.png
│       ├── eternity-protocol-navy.png
│       ├── eternity-protocol-white.png
│       ├── powder-blue-venture-tee.png
│       ├── bluish-splash.png
│       ├── cyber-crescent.png
│       ├── black-flux-sweatpants.png
│       └── light-code-sweatpant.png
│
└── README.md               # This file
```

---

## 🚀 Installation & Setup

### **Prerequisites**
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for testing) - use VS Code Live Server, Python HTTP server, or Node.js http-server

### **Quick Start**

1. **Clone or Download the Project**
   ```bash
   git clone https://github.com/yourusername/sway-3D-Fitting-Room.git
   cd sway-3D-Fitting-Room
   ```

2. **Ensure File Structure is Correct**
   - All 3D models must be in `public/model/`
   - All texture images must be in `public/textures/`

3. **Start a Local Server**

   **Option 1: VS Code Live Server**
   - Install "Live Server" extension in VS Code
   - Right-click `index.html` → "Open with Live Server"

   **Option 2: Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then open: http://localhost:8000
   ```

   **Option 3: Node.js**
   ```bash
   npx http-server -p 8000
   ```

4. **Open in Browser**
   ```
   http://localhost:8000
   ```

---

## 🎨 Creating 3D Models & Textures

### **Blender Model Preparation (CRITICAL)**

#### **Step 1: Model Setup**
1. Open your body model in Blender
2. Select the entire model → `Ctrl + A` → **"All Transforms"** (This applies scale permanently)
3. This step is **critical** to prevent the "giant clothes" bug

#### **Step 2: Material Naming**
Your model MUST have exactly two materials named:
- `Tshirt_Mat` (case-sensitive)
- `Pants_Mat` (case-sensitive)

To create/rename materials:
1. Select the mesh part (e.g., shirt)
2. Go to Material Properties panel
3. Click "+" to add material or select existing
4. Rename to exact name: `Tshirt_Mat`
5. Repeat for pants: `Pants_Mat`

#### **Step 3: Export as GLB**
1. File → Export → glTF 2.0 (.glb)
2. Settings:
   - Format: **glTF Binary (.glb)**
   - Include: Selected Objects (or check Mesh, Materials, Textures)
   - Transform: **+Y Up**
3. Export to `public/model/`

---

### **Creating Texture Images**

Textures CANNOT be simple logo PNGs! They must be mapped to the model's UV layout.

#### **Step 1: Export UV Layout from Blender**
1. Select your mesh (e.g., T-shirt mesh)
2. Switch to "UV Editing" workspace
3. UV Menu → Export UV Layout
4. Save as PNG (2048x2048 recommended)

#### **Step 2: Design the Texture**
1. Open the exported UV layout in Photoshop/GIMP/Canva
2. Place your design elements (logos, text, graphics) on the correct UV islands:
   - **Chest area** = Front torso UV island
   - **Back area** = Back torso UV island
   - **Sleeves** = Arm UV islands
3. Use the UV layout as a guide overlay
4. Save as PNG with transparency

#### **Step 3: Add to Project**
1. Save the texture image to `public/textures/`
2. Add it to the `<select>` dropdown in `index.html`

**Example:**
```html
<option value="public/textures/your-new-design.png" data-fit="oversize" data-type="tshirt">
    Your New Design Name
</option>
```

---

## 🧪 Testing Checklist

Before deploying, test these scenarios:

- [ ] Page loads with 3D model visible
- [ ] Loading indicator shows and disappears
- [ ] Gender switch works correctly
- [ ] Height/Weight inputs update model size
- [ ] Product selection changes texture
- [ ] Size recommendation updates when body changes
- [ ] Size guide modal opens/closes
- [ ] Add to Cart increases counter
- [ ] Mobile responsive (test on phone)
- [ ] All textures load without errors (check browser console)

---

## 🐛 Troubleshooting

### **Problem: Model doesn't load**
**Solution:**
- Check browser console for errors (F12 → Console)
- Verify file path: `public/model/sway_male_model.glb` exists
- Ensure you're running a local server (not opening file:// directly)
- Check model file isn't corrupted (try opening in Blender)

### **Problem: Texture doesn't apply**
**Solution:**
- Check console for error: "Material not found"
- Verify material names in Blender are exactly `Tshirt_Mat` or `Pants_Mat`
- Re-export model from Blender after renaming materials
- Check texture file path in `index.html` matches actual file location

### **Problem: Model appears giant or tiny**
**Solution:**
- In Blender: Select model → `Ctrl + A` → "All Transforms"
- Re-export the GLB file
- This applies the scale permanently

### **Problem: Texture looks stretched or wrong**
**Solution:**
- Your texture doesn't match the UV layout
- Export UV layout from Blender and redesign texture to match
- Check that UV unwrapping is done correctly in Blender

### **Problem: Page loads but model is black**
**Solution:**
- Check model's materials have proper PBR setup in Blender
- Ensure textures are assigned in Blender before export
- Try adding `exposure="1.5"` to model-viewer tag

### **Problem: Mobile performance is slow**
**Solution:**
- Reduce model polygon count in Blender
- Compress texture images (use TinyPNG or similar)
- Reduce texture resolution to 1024x1024
- Disable auto-rotate on mobile

---

## 🎯 Customization Guide

### **Adding New Products**

1. **Create the texture** (following UV mapping steps above)
2. **Add to dropdown** in `index.html`:
   ```html
   <option value="public/textures/new-product.png" 
           data-fit="oversize" 
           data-type="tshirt">
       New Product Name
   </option>
   ```
3. **Update price** (optional) - modify the price display logic in `script.js`

### **Changing Colors**

Edit `style.css`:
```css
/* Primary brand color (cyan) */
.logo h1, nav a, .price {
    color: #00e5ff; /* Change this hex code */
}

/* Background */
body {
    background-color: #050505; /* Change this */
}
```

### **Adjusting Size Guide Tables**

Edit the tables in `index.html`:
```html
<table id="oversizeTable" class="size-table">
    <tr><th>SIZE</th><th>WIDTH</th><th>LENGTH</th></tr>
    <tr><td>1 (S)</td><td>54</td><td>72.5</td></tr>
    <!-- Add/modify rows here -->
</table>
```

---

## 🚀 Deployment

### **Deploy to Vercel**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy (automatic)

### **Deploy to Netlify**
1. Drag and drop your project folder to [app.netlify.com](https://app.netlify.com)
2. Or connect GitHub repo for auto-deployment

### **Deploy to GitHub Pages**
1. Push to GitHub
2. Go to repository Settings → Pages
3. Source: Deploy from branch `main`
4. Folder: `/ (root)`

---

## 📈 Future Roadmap

- [ ] Backend integration (Node.js/Express)
- [ ] Database for products (MongoDB/PostgreSQL)
- [ ] Shopping cart with checkout
- [ ] User authentication & saved measurements
- [ ] AR try-on using WebXR
- [ ] Social sharing (try-on screenshots)
- [ ] Admin panel for managing products
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Payment gateway integration

---

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

---

## 🙏 Credits

- **3D Models:** Sway Maverick Design Team
- **model-viewer:** Google ([modelviewer.dev](https://modelviewer.dev))
- **Design:** Sway Maverick Brand Guidelines

---

**Built with ❤️ for the Maverick Community**

