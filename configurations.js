const mode = 1;

const host_local = "http://localhost:8080";
const host_remote = "https://database-demo-latest-a5y8.onrender.com";

function getHost() {
  return (mode == 0) ? host_local : host_remote;
}

function isLoggedIn() {
  if(localStorage.getItem("token")) {
    return true;} 
  else {
    return false;}
}

function saveTheToken(token) {
  localStorage.setItem("token", token);
  updateItemCart();
} 

function removeTheToken() {
 localStorage.removeItem("token");
 updateItemCart();
} 

function getTheToken() {
  return localStorage.getItem("token");
} 




let configuration = {
  isLoggedIn: () => isLoggedIn(), 
  host: () => getHost(), 
  token: () => getTheToken()    
};




async function updateItemCart() {
      let itemCount = 1; 
      document.getElementById("itemCount").textContent = itemCount;
}

function emptyBasket() {
  localStorage.removeItem("itemCount");
}




async function login() {    
    let username = document.getElementById("username-login").value;
    let password = document.getElementById("password-login").value;
    let customer = {username: username, password: password}
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(customer)
      };
      try {
        let response = await fetch(getHost() + "/login", request);
        console.log(response);
        if(response.status == 200) {  
          alert("The login was successful!");
          const token = await response.text();
          saveTheToken(token);       
          location.href = "placeorder.html";
        } else {
            console.log(`response status:${response.status}`);
            removeTheToken();            
            alert("Something went wrong!");
        }
      }
      catch(error) {
        console.log(error);        
        alert("Something went wrong!");
      }    
}

async function signup() {
    let email = document.getElementById("email-signup").value;
    let password = document.getElementById("password-signup").value;
    let username = document.getElementById("username-signup").value;
    let customer = {username: username, email:email, password: password}
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
      };
      try {
        let response = await fetch(getHost() + "/signup", request);
        if(response.status == 200) {  
            alert("The registration was successful!")
            const token = await response.text();
            localStorage.setItem("token", token);
            location.href = "login.html";

        } else {
            console.log(`response status:${response.status}`);            
            alert("Something went wrong!");
        }
      }
      catch(error) {
        console.log(error);        
        alert("Something went wrong!");
      }    
}

async function logout() {   
  removeTheToken();  
}

async function getLoggedInUsername() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null; 
    }
    const tokenPayload = token.split('.')[1];
    const decodedToken = JSON.parse(atob(tokenPayload));
    return decodedToken.username;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; 
  }
}

async function getAll() {
  let response = await fetch(getHost() + "/flowers", {
});
  let result = await response.json();
  return result;
}



