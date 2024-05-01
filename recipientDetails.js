const serverHost = "http://localhost:8080";
window.onload = function() {
    displayFlowerInfo();
    displayDeliveryDetails();
    displayLoginButtons();
};

function displayFlowerInfo() {
    const flowerTitle = localStorage.getItem("flowerTitle");
    const flowerImageUrl = localStorage.getItem("flowerImageUrl");

    if (flowerTitle && flowerImageUrl) {
        const flowerDetailsContainer = document.getElementById('flowerDetails');
        flowerDetailsContainer.innerHTML = `
            <h2>${flowerTitle}</h2>
            <img src="${flowerImageUrl}" alt="${flowerTitle}" style="max-width: 25%; height: 5;">
        `;
    } else {
        console.error("Flower title or image URL not found in local storage.");
    }
}

function displayDeliveryDetails() {
    const totalPrice = localStorage.getItem("totalPrice");
    const deliveryTime = localStorage.getItem("deliveryTime");

    if (totalPrice && deliveryTime) {
        document.getElementById("totalPrice").textContent = totalPrice;
        document.getElementById("deliveryTime").textContent = deliveryTime;
    } else {
        console.error("Total price or delivery time not found in local storage.");
    }
}

function continueButton() {
    let recipientFirstName = document.getElementById("recipientFirstName").value;
    let recipientLastName = document.getElementById("recipientLastName").value;
    let relationship = document.getElementById("relationship").value;
    let recipientAddress = document.getElementById("recipientAddress").value;
    let recipientApt = document.getElementById("recipientApt").value;
    let recipientCity = document.getElementById("recipientCity").value;
    let recipientState = document.getElementById("recipientState").value;
    let recipientZip = document.getElementById("recipientZip").value;

    if (!recipientFirstName || !recipientLastName || !relationship || !recipientAddress || !recipientCity || !recipientState || !recipientZip) {
        alert("Please fill in all required fields.");
        return;
    }

    let recipientInfo = {
        firstName: recipientFirstName,
        lastName: recipientLastName,
        relationship: relationship,
        address: recipientAddress,
        apt: recipientApt,
        city: recipientCity,
        state: recipientState,
        zip: recipientZip
    };

    localStorage.setItem("recipientInfo", JSON.stringify(recipientInfo));
    window.location.href = "PlaceOrder.html";
}

function displayLoginButtons() {
    const loginButtonContainer = document.getElementById('loginButtons');
    if (!isLoggedIn()) {
        loginButtonContainer.style.display = 'block';
    }
}