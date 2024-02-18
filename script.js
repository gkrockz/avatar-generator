var userInput = document.getElementById("name");
var avatar = document.getElementById("avatar");
var downloadLink = document.getElementById("imgsrc");
var usrname = document.getElementById("usrname");
  
async function generateAvatar(userName) {
    avatar.style.display = "initial";
    var apiUrl = `https://api.dicebear.com/7.x/micah/jpg?seed=${userName}`;
    avatar.src = apiUrl;
    usrname.textContent = `Name: ${userName}`;
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
  (regex.test(userInput.value) === false) ? alert("please enter a valid name!") : generateAvatar(userInput.value.toLowerCase());
}

function EventForKeyPress(event) {
  if (event.keyCode === 13) {
    invokeFunc();
  }
}

userInput.addEventListener("keypress", EventForKeyPress);