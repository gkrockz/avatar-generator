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
    var apiUrl = `https://avatars.dicebear.com/api/personas/${userName}.svg?mood[]=happy`;
    avatar.src = apiUrl;
    usrname.textContent = `Name: ${userName}`;
    gender.textContent = response.gender?`Gender: ${response.gender}`:"Gender: Unknown";
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

function invokeFunc() {
  var regex = /^([a-zA-Z]+){3,10}$/;
  (regex.test(userInput.value) === false) ? alert("please enter a valid name !") : generateAvatar(userInput.value.toLowerCase());
}

function EventForKeyPress(event) {
  if (event.keyCode === 13) {
    invokeFunc();
  }
}

userInput.addEventListener("keypress", EventForKeyPress);