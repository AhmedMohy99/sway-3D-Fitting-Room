// دوال التحكم في نافذة دليل المقاسات
const modal = document.getElementById("sizeGuideModal");
const guideImage = document.getElementById("guideImage");
const modalTitle = document.getElementById("modalTitle");

function openGuideModal() {
    modal.style.display = "block";
}

function closeGuideModal() {
    modal.style.display = "none";
}

// لما اليوزر يضغط برا النافذة تتقفل
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// دالة لتحديث صورة دليل المقاسات بناءً على اختيار نوع التلبيس
function updateSizeGuide() {
    const fitType = document.getElementById("fit").value;
    
    if (fitType === "oversize") {
        modalTitle.innerText = "دليل المقاسات - Oversize Fit";
        // غير المسار لو مسمي الصورة اسم تاني
        guideImage.src = "assets/images/oversize-guide.jpg"; 
    } else {
        modalTitle.innerText = "دليل المقاسات - Regular Fit";
        // غير المسار لو مسمي الصورة اسم تاني
        guideImage.src = "assets/images/regular-guide.jpg";
    }
}
