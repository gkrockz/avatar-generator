var userInput = document.getElementById("name");
var avatar = document.getElementById("avatar");
var downloadLink = document.getElementById("imgsrc");
var usrname = document.getElementById("usrname");
var gender = document.getElementById("gender");

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
  
async function generateAvatar(userName) {
    
    const response = await fetchGender(userName); 
    avatar.style.display = "initial";
    var apiUrl = `https://avatars.dicebear.com/api/${response.gender}/${userName}.svg?b=%235e728d&r=10?mood[]=happy`;
    avatar.src = apiUrl;
    usrname.textContent = `Name: ${userName}`;
    gender.textContent = `Gender: ${response.gender}`;
    downloadLink.href = apiUrl;
    downloadLink.style.display="inherit";

    avatar.onerror = () => {
      console.clear();
      avatar.style.display = "none";
      downloadLink.style.display = "none";
      gender.textContent = "Sorry, no avatar found 😄";
    }
    userInput.value="";
  }

// invokes driver function  
function invokeFunc() {
    if(userInput.value === "") {
      alert("oops, you forgot to enter your name !");
    }
    else {
      userInput.value.length > 2 ? generateAvatar(userInput.value.toLowerCase()) : alert("please enter a valid name !");
    }
  }

function EventForKeyPress(event) {
  if (event.keyCode === 13) {
    invokeFunc();
  }
}

userInput.addEventListener("keypress", EventForKeyPress);