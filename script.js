const modelViewer = document.getElementById("myModelViewer");
const sizeSelect = document.getElementById("size");
const fitDisplay = document.getElementById("fitDisplay");
const fitValue = document.getElementById("fitValue");
const productName = document.getElementById("productName");

const modal = document.getElementById("sizeGuideModal");
const modalTitle = document.getElementById("modalTitle");
const regularTable = document.getElementById("regularTable");
const oversizeTable = document.getElementById("oversizeTable");

function handleItemChange() {
    const selectElement = document.getElementById("itemSelect");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    
    productName.innerText = selectedOption.text;
    const fitType = selectedOption.getAttribute("data-fit");
    const itemType = selectedOption.getAttribute("data-type"); 
    
    if(fitType === "oversize") {
        fitDisplay.value = "Over Size Fit";
        fitValue.value = "oversize";
    } else {
        fitDisplay.value = "Regular Fit";
        fitValue.value = "regular";
    }

    updateSizeGuideOptions(fitType);
    changeTexture(selectedOption.value, itemType);
}

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

async function changeTexture(textureUrl, itemType) {
    if (!modelViewer.model) return;

    try {
        const texture = await modelViewer.createTexture(textureUrl);
        const materials = modelViewer.model.materials;
        
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
            console.error("Could not find material: " + targetMaterialName);
        }
    } catch (error) {
        console.error("Error applying texture:", error);
    }
}

function changeGender() {
    const selectedGenderUrl = document.getElementById("genderSelect").value;
    modelViewer.src = selectedGenderUrl;
}

function adjustBodySize() {
    const height = parseFloat(document.getElementById("userHeight").value) || 175;
    const weight = parseFloat(document.getElementById("userWeight").value) || 70;

    const heightScale = height / 175;
    const weightScale = weight / 70;

    modelViewer.scale = `${weightScale} ${heightScale} ${weightScale}`;
}

modelViewer.addEventListener("load", () => {
    handleItemChange(); 
    adjustBodySize();   
});

function openGuideModal() { modal.style.display = "block"; }
function closeGuideModal() { modal.style.display = "none"; }
window.onclick = function(event) { if (event.target == modal) modal.style.display = "none"; }
