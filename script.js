const modal = document.getElementById("sizeGuideModal");
const modalTitle = document.getElementById("modalTitle");
const regularTable = document.getElementById("regularTable");
const oversizeTable = document.getElementById("oversizeTable");
const sizeSelect = document.getElementById("size");
const modelViewer = document.getElementById("myModelViewer");

window.onload = function() {
    updateSizeGuide();
};

function changeModel() {
    const selectedItem = document.getElementById("itemSelect").value;
    
    if (selectedItem === "tshirt") {
        modelViewer.src = "public/textures/maverick-phoenix-white.glb";
        modelViewer.scale = "1 1 1"; 
        modelViewer.orientation = "0deg 0deg 0deg";
    } else {
        modelViewer.src = "public/model/Model_FovaneEditDecimated.glb";
        modelViewer.orientation = "-90deg 0deg 0deg";
        adjustBodySize(); 
    }
}

function adjustBodySize() {
    if (document.getElementById("itemSelect").value !== "body") return;

    const height = parseFloat(document.getElementById("userHeight").value) || 175;
    const weight = parseFloat(document.getElementById("userWeight").value) || 70;

    const heightScale = height / 175;
    const weightScale = weight / 70;

    modelViewer.scale = `${weightScale} ${heightScale} ${weightScale}`;
}

function updateSizeGuide() {
    const fitType = document.getElementById("fit").value;
    sizeSelect.innerHTML = "";

    if (fitType === "oversize") {
        modalTitle.innerText = "Size Guide - Oversize Fit";
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
