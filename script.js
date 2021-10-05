var userInput = document.getElementById("name");

// returns gender with the help of API Call, based on userName provided 
async function fetchGender(userName) {
    try {
        const response = await fetch(`https://api.genderize.io?name=${userName}`);
        const gender = await response.json();
        return gender;
    } 
    catch (error) {
        console.log(error);
    }
}
  
// Generate avatar  
async function generateAvatar(userName) {
    const response = await fetchGender(userName);
    var avatar = document.getElementById("avatar");
    var downloadLink = document.getElementById("imgsrc");
    var apiUrl = `https://avatars.dicebear.com/api/${response.gender}/${userName}.svg?b=%235e728d&r=10?mood[]=happy`;
    avatar.src = apiUrl;
    document.getElementById("usrname").textContent = `Name: ${userName}`;
    document.getElementById("gender").textContent = `Gender: ${response.gender}`;
    downloadLink.href = apiUrl;
    downloadLink.style.display="inherit";
    avatar.onerror = function () {
      downloadLink.style.display = "none";      
    };
    userInput.value="";
} 

// invokes driver function  
function invokeFunc() {
    generateAvatar(userInput.value.toLowerCase());
  }
    
// Function for key-press event
function EventForKeyPress(event) {
  if (event.keyCode === 13) {
    invokeFunc();
  }
}

userInput.addEventListener("keypress", EventForKeyPress);


