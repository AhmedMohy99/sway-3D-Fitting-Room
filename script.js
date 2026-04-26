const modelViewer = document.getElementById("myModelViewer");
const sizeSelect = document.getElementById("size");
const fitDisplay = document.getElementById("fitDisplay");
const fitValue = document.getElementById("fitValue");
const productName = document.getElementById("productName");

// دوال الـ Modal (جدول المقاسات)
const modal = document.getElementById("sizeGuideModal");
const modalTitle = document.getElementById("modalTitle");
const regularTable = document.getElementById("regularTable");
const oversizeTable = document.getElementById("oversizeTable");

// الدالة الأساسية اللي بتشتغل لما العميل يغير المنتج
function handleItemChange() {
    const selectElement = document.getElementById("itemSelect");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    
    // 1. تحديث اسم المنتج في الشاشة
    productName.innerText = selectedOption.text;

    // 2. قراءة نوع التلبيس (oversize ولا regular) من الـ data-fit
    const fitType = selectedOption.getAttribute("data-fit");
    
    // تحديث الشاشة للمستخدم
    if(fitType === "oversize") {
        fitDisplay.value = "Over Size Fit";
        fitValue.value = "oversize";
    } else {
        fitDisplay.value = "Regular Fit";
        fitValue.value = "regular";
    }

    // 3. تحديث قائمة المقاسات
    updateSizeGuideOptions(fitType);

    // 4. تغيير صورة الـ Texture على المجسم
    changeTexture(selectedOption.value, selectedOption.getAttribute("data-type"));
}

// دالة تحديث قائمة المقاسات بناءً على النوع
function updateSizeGuideOptions(fitType) {
    sizeSelect.innerHTML = ""; // تفريغ القائمة

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

// دالة تغيير الـ Texture (تيشيرت أو بنطلون)
async function changeTexture(textureUrl, itemType) {
    if (!modelViewer.model) return;

    try {
        const texture = await modelViewer.createTexture(textureUrl);
        const materials = modelViewer.model.materials;
        
        // لو المنتج تيشيرت، هيدور على خامة اسمها Tshirt_Mat
        // لو المنتج بنطلون، هيدور على خامة اسمها Pants_Mat
        let targetMaterialName = (itemType === "tshirt") ? "Tshirt_Mat" : "Pants_Mat";
        let targetMaterial = null;

        for (let i = 0; i < materials.length; i++) {
            if (materials[i].name === targetMaterialName) {
                targetMaterial = materials[i];
                break;
            }
        }

        if (targetMaterial) {
            targetMaterial.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
        } else {
            console.log("Material not found: " + targetMaterialName);
        }
    } catch (error) {
        console.error("Error applying texture:", error);
    }
}

// دالة تغيير المجسم (رجل / امرأة)
function changeGender() {
    const selectedGenderUrl = document.getElementById("genderSelect").value;
    modelViewer.src = selectedGenderUrl;
}

// دالة تكبير وتصغير المجسم بناءً على الطول والوزن
function adjustBodySize() {
    const height = parseFloat(document.getElementById("userHeight").value) || 175;
    const weight = parseFloat(document.getElementById("userWeight").value) || 70;

    const heightScale = height / 175;
    const weightScale = weight / 70;

    modelViewer.scale = `${weightScale} ${heightScale} ${weightScale}`;
}

// تشغيل الوظائف التلقائية عند تحميل الصفحة أو تبديل المجسم
modelViewer.addEventListener("load", () => {
    handleItemChange(); // بيحدث الاسم والمقاس والتيشيرت
    adjustBodySize();   // بيطبق الطول والوزن
});

// فتح وقفل دليل المقاسات
function openGuideModal() { modal.style.display = "block"; }
function closeGuideModal() { modal.style.display = "none"; }
window.onclick = function(event) { if (event.target == modal) modal.style.display = "none"; }
