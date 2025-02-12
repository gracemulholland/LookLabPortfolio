// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the plus button
    const addButton = document.getElementById('addItemButton');
    if (addButton) {
        addButton.addEventListener('click', openForm);
    }
});

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
            itemElement.className = 'category-item'; // Ensure this class is used for grid layout
            itemElement.innerHTML = `
                <img src="${item.image}" alt="Uploaded Item">
                <button class="delete-btn" onclick="deleteItem('${category}', ${index})">×</button>
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
    console.log('Delete button clicked'); // Debugging
    let items = JSON.parse(localStorage.getItem(category)) || [];
    
    // Remove item at index
    items.splice(index, 1);

    // Save updated array back to local storage
    localStorage.setItem(category, JSON.stringify(items));

    // Refresh the display
    showCategory(category);
}

// Function to open the upload form
function openForm() {
    console.log('Button clicked!');  // Debugging
    document.getElementById("uploadForm").style.display = "block";
}

// Function to close the upload form
function closeForm() {
    document.getElementById("uploadForm").style.display = "none";
}
