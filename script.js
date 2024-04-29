
// Function to parse query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// script.js

document.addEventListener("DOMContentLoaded", function () {
  const productId = getQueryParam("productId");
  if (productId) {
      fetchProductDetails(productId);
  }
});

function fetchProductDetails(productId) {
  // Send a request to your backend to fetch product details based on the productId
  // You can use AJAX, Fetch API, or any other method to make the request
  // Example using Fetch API
  fetch(`/api/products/${productId}`)
      .then(response => response.json())
      .then(product => {
          // Update product details on the page
          const productImageElement = document.getElementById("product-image");
          const productInfoElement = document.getElementById("product-info");

          productImageElement.innerHTML = `<img src="${product.imageUrl}" alt="${product.name}">`;
          productInfoElement.innerHTML = `
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <p>Price: $${product.price}</p>
              <!-- Add more product details as needed -->
          `;
      })
      .catch(error => {
          console.error("Error fetching product details:", error);
          // Handle error (e.g., display error message)
      });
}

// Function to parse query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
      const cartCount = localStorage.getItem('cartCount') || 0;
      cartCountElement.textContent = cartCount;
  }
}

updateCartCount();

