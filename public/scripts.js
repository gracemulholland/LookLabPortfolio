function showCategory(category) {
    const categoryContent = document.getElementById('category-content');
    categoryContent.innerHTML = ''; // Clear previous content

    // Fetch items from local storage
    const items = JSON.parse(localStorage.getItem(category)) || [];

    if (items.length === 0) {
        categoryContent.innerHTML = `<div class="empty-message-container"><p class="empty-message">No items stored yet.</p></div>`;
    } else {
        items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="Uploaded Item">
                <button class="delete-btn" onclick="deleteItem('${category}', ${index}')">×</button>
            `;
            categoryContent.appendChild(itemElement);
        });
    }
}

function addItem() {
    const category = document.getElementById('category').value;
    const itemImage = document.getElementById('itemImage').files[0];

    if (!itemImage) {
        alert('Please upload an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const items = JSON.parse(localStorage.getItem(category)) || [];
        items.push({ category, image: e.target.result });
        localStorage.setItem(category, JSON.stringify(items));
        closeForm();
        showCategory(category);
    };
    reader.readAsDataURL(itemImage);
}

// Delete function
function deleteItem(category, index) {
    let items = JSON.parse(localStorage.getItem(category)) || [];
    items.splice(index, 1); // Remove the selected item
    localStorage.setItem(category, JSON.stringify(items));
    showCategory(category); // Refresh category view
}

function openForm() {
    document.getElementById('uploadForm').style.display = 'block';
}

function closeForm() {
    document.getElementById('uploadForm').style.display = 'none';
}
