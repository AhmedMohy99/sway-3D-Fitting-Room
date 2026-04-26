// ========================================
// SWAY MAVERICK - 3D VIRTUAL FITTING ROOM
// Enhanced Script with Bug Fixes & Improvements
// ========================================

// DOM Elements
const modelViewer = document.getElementById("myModelViewer");
const sizeSelect = document.getElementById("size");
const fitDisplay = document.getElementById("fitDisplay");
const fitValue = document.getElementById("fitValue");
const productName = document.getElementById("productName");

const modal = document.getElementById("sizeGuideModal");
const modalTitle = document.getElementById("modalTitle");
const regularTable = document.getElementById("regularTable");
const oversizeTable = document.getElementById("oversizeTable");

// State Management
let isModelReady = false;
let pendingTextureChange = null;
let currentGender = "male";

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'error' ? '#ff3333' : type === 'success' ? '#00ff88' : '#00e5ff'};
        color: ${type === 'error' ? '#fff' : '#000'};
        padding: 15px 25px;
        border-radius: 6px;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// LOADING STATE MANAGEMENT
// ========================================
function showModelLoader() {
    let loader = document.getElementById('modelLoader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'modelLoader';
        loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #00e5ff;
            font-size: 1.2rem;
            font-weight: bold;
            text-align: center;
            z-index: 10;
        `;
        document.querySelector('.model-section').appendChild(loader);
    }
    loader.style.display = 'block';
    loader.innerHTML = `
        <div style="margin-bottom: 10px;">⏳</div>
        <div>Loading 3D Model...</div>
        <div id="loadProgress" style="font-size: 0.9rem; margin-top: 5px; color: #aaa;">0%</div>
    `;
}

function updateLoadProgress(progress) {
    const progressElement = document.getElementById('loadProgress');
    if (progressElement) {
        progressElement.textContent = `${Math.round(progress * 100)}%`;
    }
}

function hideModelLoader() {
    const loader = document.getElementById('modelLoader');
    if (loader) {
        loader.style.display = 'none';
    }
}

// ========================================
// PRODUCT CHANGE HANDLER (Fixed Race Condition)
// ========================================
function handleItemChange() {
    const selectElement = document.getElementById("itemSelect");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    
    // Update product name
    productName.innerText = selectedOption.text;
    
    // Get product metadata
    const fitType = selectedOption.getAttribute("data-fit");
    const itemType = selectedOption.getAttribute("data-type");
    
    // Update fit display immediately
    if(fitType === "oversize") {
        fitDisplay.value = "Over Size Fit";
        fitValue.value = "oversize";
    } else {
        fitDisplay.value = "Regular Fit";
        fitValue.value = "regular";
    }

    // Update size options and guide
    updateSizeGuideOptions(fitType);
    
    // Recommend size based on body measurements
    recommendSize();
    
    // Queue or apply texture change
    if (!isModelReady) {
        console.log("Model not ready, queuing texture change...");
        pendingTextureChange = { 
            url: selectedOption.value, 
            type: itemType 
        };
    } else {
        changeTexture(selectedOption.value, itemType);
    }
}

// ========================================
// SIZE GUIDE OPTIONS UPDATE
// ========================================
function updateSizeGuideOptions(fitType) {
    sizeSelect.innerHTML = ""; 

    if (fitType === "oversize") {
        modalTitle.innerText = "Size Guide - Over Size Fit";
        regularTable.style.display = "none";
        oversizeTable.style.display = "table";

        const sizes = [
            { value: "S", text: "1 (S)" },
            { value: "M", text: "2 (M)" },
            { value: "L", text: "3 (L)" },
            { value: "XL", text: "4 (XL)" }
        ];
        sizes.forEach(size => sizeSelect.add(new Option(size.text, size.value)));
    } else {
        modalTitle.innerText = "Size Guide - Regular Fit";
        oversizeTable.style.display = "none";
        regularTable.style.display = "table";

        const sizes = [
            { value: "S", text: "1 (S)" },
            { value: "M", text: "2 (M)" },
            { value: "L", text: "3 (L)" },
            { value: "XL", text: "4 (XL)" },
            { value: "XXL", text: "5 (XXL)" }
        ];
        sizes.forEach(size => sizeSelect.add(new Option(size.text, size.value)));
    }
}

// ========================================
// SMART SIZE RECOMMENDATION SYSTEM
// ========================================
function recommendSize() {
    const height = parseFloat(document.getElementById("userHeight").value) || 175;
    const weight = parseFloat(document.getElementById("userWeight").value) || 70;
    const fitType = fitValue.value;
    
    // Calculate BMI for better recommendations
    const bmi = weight / ((height/100) ** 2);
    
    let recommendation;
    
    if (fitType === "oversize") {
        // Oversize recommendations based on height primarily
        if (height < 165) {
            recommendation = "S";
        } else if (height < 175) {
            recommendation = "M";
        } else if (height < 185) {
            recommendation = "L";
        } else {
            recommendation = "XL";
        }
    } else {
        // Regular fit recommendations consider both height and BMI
        if (bmi < 20) {
            if (height < 170) recommendation = "S";
            else if (height < 180) recommendation = "M";
            else recommendation = "L";
        } else if (bmi < 23) {
            if (height < 165) recommendation = "S";
            else if (height < 175) recommendation = "M";
            else if (height < 185) recommendation = "L";
            else recommendation = "XL";
        } else if (bmi < 26) {
            if (height < 170) recommendation = "M";
            else if (height < 180) recommendation = "L";
            else recommendation = "XL";
        } else if (bmi < 29) {
            if (height < 175) recommendation = "L";
            else recommendation = "XL";
        } else {
            recommendation = "XXL";
        }
    }
    
    // Set the recommended size
    if (sizeSelect.querySelector(`option[value="${recommendation}"]`)) {
        sizeSelect.value = recommendation;
        highlightRecommendedSize(recommendation);
    }
}

function highlightRecommendedSize(size) {
    // Add visual indicator for recommended size
    const options = sizeSelect.querySelectorAll('option');
    options.forEach(option => {
        if (option.value === size) {
            option.text = option.text.includes('✓') ? option.text : `${option.text} ✓ Recommended`;
        } else {
            option.text = option.text.replace(' ✓ Recommended', '');
        }
    });
}

// ========================================
// TEXTURE SWAPPING (Enhanced Error Handling)
// ========================================
async function changeTexture(textureUrl, itemType) {
    if (!modelViewer.model) {
        console.warn("Model not loaded yet, cannot apply texture");
        return;
    }

    try {
        console.log(`Applying texture: ${textureUrl} to ${itemType}`);
        
        const texture = await modelViewer.createTexture(textureUrl);
        const materials = modelViewer.model.materials;
        
        // Determine target material name
        let targetMaterialName = (itemType === "tshirt") ? "Tshirt_Mat" : "Pants_Mat";
        
        // Find the target material
        let targetMaterial = null;
        for (let i = 0; i < materials.length; i++) {
            if (materials[i].name === targetMaterialName) {
                targetMaterial = materials[i];
                break;
            }
        }

        if (targetMaterial) {
            targetMaterial.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
            console.log(`✓ Successfully applied texture to ${targetMaterialName}`);
            showNotification(`${itemType === 'tshirt' ? 'T-Shirt' : 'Pants'} updated!`, 'success');
        } else {
            console.error(`❌ Material "${targetMaterialName}" not found in model`);
            console.log('Available materials:', materials.map(m => m.name).join(', '));
            showNotification(`Material not found. Check model setup.`, 'error');
        }
    } catch (error) {
        console.error("❌ Error applying texture:", error);
        showNotification('Failed to load texture. Please try again.', 'error');
    }
}

// ========================================
// GENDER SWAP FUNCTION (Fixed)
// ========================================
function changeGender() {
    const selectedGenderUrl = document.getElementById("genderSelect").value;
    
    // Reset model ready state
    isModelReady = false;
    
    // Show loading indicator
    showModelLoader();
    
    // Update gender tracker
    currentGender = selectedGenderUrl.includes('male_model') ? 'male' : 'female';
    
    // Load new model
    modelViewer.src = selectedGenderUrl;
    
    console.log(`Switching to ${currentGender} model:`, selectedGenderUrl);
}

// ========================================
// BODY SIZE ADJUSTMENT (Improved Algorithm)
// ========================================
function adjustBodySize() {
    const height = parseFloat(document.getElementById("userHeight").value) || 175;
    const weight = parseFloat(document.getElementById("userWeight").value) || 70;

    // Base measurements for scaling (175cm, 70kg = BMI ~22.86)
    const baseHeight = 175;
    const baseWeight = 70;
    
    // Calculate height scale
    const heightScale = height / baseHeight;
    
    // Calculate BMI-aware width scaling for realistic proportions
    const bmi = weight / ((height/100) ** 2);
    const baseBmi = baseWeight / ((baseHeight/100) ** 2);
    
    // Width scaling considers BMI difference
    const widthScale = Math.sqrt(bmi / baseBmi);

    // Apply scale to model
    modelViewer.scale = `${widthScale} ${heightScale} ${widthScale}`;
    
    console.log(`Body adjusted - Height: ${height}cm, Weight: ${weight}kg, Scale: ${widthScale.toFixed(2)}x${heightScale.toFixed(2)}x${widthScale.toFixed(2)}`);
    
    // Update size recommendation when body changes
    recommendSize();
}

// ========================================
// MODEL EVENT LISTENERS
// ========================================

// Loading progress tracker
modelViewer.addEventListener("progress", (event) => {
    const progress = event.detail.totalProgress;
    updateLoadProgress(progress);
});

// Model loaded successfully
modelViewer.addEventListener("load", () => {
    console.log("✓ Model loaded successfully!");
    
    isModelReady = true;
    hideModelLoader();
    
    // Apply any pending texture change
    if (pendingTextureChange) {
        console.log("Applying pending texture change...");
        changeTexture(pendingTextureChange.url, pendingTextureChange.type);
        pendingTextureChange = null;
    } else {
        // Apply default texture on initial load
        handleItemChange();
    }
    
    // Apply body size
    adjustBodySize();
    
    showNotification('3D Model Ready!', 'success');
});

// Model error handling
modelViewer.addEventListener("error", (event) => {
    console.error("❌ Model loading error:", event);
    hideModelLoader();
    showNotification('Failed to load 3D model. Please refresh.', 'error');
});

// ========================================
// MODAL CONTROLS
// ========================================
function openGuideModal() { 
    modal.style.display = "block"; 
}

function closeGuideModal() { 
    modal.style.display = "none"; 
}

// Close modal when clicking outside
window.onclick = function(event) { 
    if (event.target == modal) {
        modal.style.display = "none"; 
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeGuideModal();
    }
});

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Sway Maverick 3D Fitting Room Initialized');
    showModelLoader();
    
    // Initialize size guide
    updateSizeGuideOptions('oversize');
    
    // Set initial recommended size
    recommendSize();
});
