let unloginUl = document.querySelector("#unlogin-ul");
let loginUl = document.querySelector("#login-ul");
let usernameSpan = document.querySelector("#username-span");

let username = tools.cookie("username");
if(username) {
  unloginUl.classList.add("hidden");
  usernameSpan.innerHTML = username;
  loginUl.classList.remove("hidden");
}

let logout = document.querySelector("#logout");
if(logout){
	logout.onclick = () => {
		loginUl.classList.add("hidden");
	  unloginUl.classList.remove("hidden");
	  tools.cookie("username", username, {expires: -1, path: "/"});
	}
}
