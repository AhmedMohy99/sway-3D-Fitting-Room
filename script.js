// تعريف المتغيرات الأساسية
const modal = document.getElementById("sizeGuideModal");
const modalTitle = document.getElementById("modalTitle");
const regularTable = document.getElementById("regularTable");
const oversizeTable = document.getElementById("oversizeTable");
const sizeSelect = document.getElementById("size");
const modelViewer = document.getElementById("myModelViewer");

// 1. تحديث خيارات المقاسات عند تحميل الصفحة
window.onload = function() {
    updateSizeGuide();
};

// 2. دالة تبديل المجسم (بين الجسم والتيشيرت)
function changeModel() {
    const selectedItem = document.getElementById("itemSelect").value;
    
    if (selectedItem === "tshirt") {
        // مسار التيشيرت
        modelViewer.src = "public/textures/maverick-phoenix-white.glb";
        // تصفير التكبير والتصغير لأن التيشيرت مش هيتأثر بالطول والوزن
        modelViewer.scale = "1 1 1"; 
        // تعديل الوقفة للصفر (لأن التيشيرت غالباً متصمم واقف)
        modelViewer.orientation = "0deg 0deg 0deg";
    } else {
        // مسار الجسم البشري
        modelViewer.src = "public/model/Model_FovaneEditDecimated.glb";
        // إعادة ضبط الوقفة (لو لسه نايم، غير الـ -90 دي لـ 90 أو 0 لحد ما يظبط)
        modelViewer.orientation = "-90deg 0deg 0deg";
        // تطبيق أبعاد الطول والوزن الحالية
        adjustBodySize(); 
    }
}

// 3. دالة محاكاة الطول والوزن (Virtual Fitting Matrix)
function adjustBodySize() {
    // التأكد إننا بنعدل على الجسم بس مش التيشيرت
    if (document.getElementById("itemSelect").value !== "body") return;

    const height = parseFloat(document.getElementById("userHeight").value) || 175;
    const weight = parseFloat(document.getElementById("userWeight").value) || 70;

    // دي معادلة بسيطة: بنفترض إن الطول الطبيعي 175 والوزن الطبيعي 70
    // المحور Y للطول، والمحورين X و Z للوزن (العرض)
    const heightScale = height / 175;
    const weightScale = weight / 70;

    // تطبيق التكبير والتصغير على المجسم (x y z)
    modelViewer.scale = `${weightScale} ${heightScale} ${weightScale}`;
}

// 4. دالة تحديث دليل المقاسات والقائمة المنسدلة
function updateSizeGuide() {
    const fitType = document.getElementById("fit").value;
    
    // تفريغ قائمة المقاسات الحالية
    sizeSelect.innerHTML = "";

    if (fitType === "oversize") {
        modalTitle.innerText = "Size Guide - Oversize Fit";
        regularTable.style.display = "none";
        oversizeTable.style.display = "table";

        // إضافة مقاسات الـ Oversize (من S لـ XL)
        const sizes = [
            { value: "S", text: "1 (S)" },
            { value: "M", text: "2 (M)" },
            { value: "L", text: "3 (L)" },
            { value: "XL", text: "4 (XL)" }
        ];
        sizes.forEach(size => {
            sizeSelect.add(new Option(size.text, size.value));
        });

    } else {
        modalTitle.innerText = "Size Guide - Regular Fit";
        oversizeTable.style.display = "none";
        regularTable.style.display = "table";

        // إضافة مقاسات الـ Regular (من S لـ XXL)
        const sizes = [
            { value: "S", text: "1 (S)" },
            { value: "M", text: "2 (M)" },
            { value: "L", text: "3 (L)" },
            { value: "XL", text: "4 (XL)" },
            { value: "XXL", text: "5 (XXL)" }
        ];
        sizes.forEach(size => {
            sizeSelect.add(new Option(size.text, size.value));
        });
    }
}

// 5. دوال فتح وقفل نافذة الجداول
function openGuideModal() {
    modal.style.display = "block";
}

function closeGuideModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
