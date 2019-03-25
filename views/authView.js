document.addEventListener('DOMContentLoaded', onHtmlLoaded);
const	loginButton = document.getElementById("btnLog");
const	registerButton = document.getElementById("btnReg");
const	userDisplayButton = document.getElementById("userDisplay");
const	logoutButton = document.getElementById("btnLogOut");

function renderNavBar () {
	const loggedStatus = window.localStorage.getItem("authToken");
	if (loggedStatus !== null) {
		loginButton.classList.remove("displayNavButtons"); // buttons to hide
		loginButton.classList.add("hideNavButtons");
		registerButton.classList.remove("displayNavButtons");
		registerButton.classList.add("hideNavButtons");

		logoutButton.classList.remove("hideNavButtons");  // buttons to show
		logoutButton.classList.add("displayNavButtons");

		const loggedUsername = window.localStorage.getItem("username");
		document.getElementById("userDisplayA").innerHTML = loggedUsername;
		userDisplayButton.classList.remove("hideNavButtons");
		userDisplayButton.classList.add("displayNavButtons");
			
	}
	else {
		loginButton.classList.add("displayNavButtons"); // buttons to show
		loginButton.classList.remove("hideNavButtons");
		registerButton.classList.add("displayNavButtons");
		registerButton.classList.remove("hideNavButtons");

		logoutButton.classList.add("hideNavButtons");  // buttons to show
		logoutButton.classList.remove("displayNavButtons");
		userDisplayButton.classList.add("hideNavButtons");
		userDisplayButton.classList.remove("displayNavButtons");
	}
}

function onHtmlLoaded() {

const apiRoot = "https://ancient-caverns-16784.herokuapp.com";

document.getElementById("btnReg").addEventListener("click",function(){
	createLoginForm("Register");
});

document.getElementById("btnLog").addEventListener("click",function(){
	createLoginForm("Login");
});

document.getElementById("btnLogOut").addEventListener("click", function(){
	doLogout();
});


function createLoginForm(formType) {
	const modalContainer = document.createElement("div");
    modalContainer.id = "formOpenModal";
	modalContainer.classList.add("modalDialog");
	modalContainer.innerHTML =
		`
			<div>
				<p id="formClose" title="Close" class="closeBut">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
						<path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
					</svg>
				</p>
				<h3>${formType}</h3>
				<p id="errorMessage"></p>
				<label for = "username">Username</label>
				<input type="text" id="username" name="username" required minlength="4" maxlength="12">
				<label for = "pasword">Password</label>
				<input type="password" id="password" name="password" required minlength="4" maxlength="12">
				<input type="button" id="hitBtn" value="${formType}">
			</div>
		`;

	document.body.appendChild(modalContainer);
	
	document.getElementById("hitBtn").addEventListener("click", function(){
		apiMeth()
	});
	
    document.getElementById("formClose").addEventListener("click", function(){
        const formElement = document.getElementById("formOpenModal");
        formElement.parentNode.removeChild(formElement);
});

	function apiMeth(){
		const paramUsername = document.getElementById("username").value;
		const paramPassword = document.getElementById("password").value;
		const errorMessage = document.getElementById("errorMessage");
		if (formType === "Register") {
			if (paramUsername.length >= 4 && paramUsername.length <= 12 && paramPassword.length >= 4 && paramPassword.length <= 12) {
				afterValidInputs();
			}
			else if (paramUsername.length >= 4 && paramUsername.length <= 12){
				errorMessage.innerHTML = "Password must be between 4 and 12 characters !";
			}
			else if (paramPassword.length >= 4 && paramPassword.length <= 12) {
				errorMessage.innerHTML = "Username must be between 4 and 12 characters !";
			}

			else {
				errorMessage.innerHTML = "Username and password must be between 4 and 12 characters !";
			}
		}
		else {
			if (paramUsername.length !== 0 && paramPassword.length !== 0) {
				afterValidInputs();
			}
			else {
				errorMessage.innerHTML = "Please provide an username and password !";
			}
		}

		function afterValidInputs () {
			const user = new User(paramUsername,paramPassword);
			if (formType === "Login") {
				const loginApi = `${apiRoot}/auth/login`;
				user.authent(loginApi,).then(
					function(response){ 								//SUCCESS callback
							afterAuthSuccess(response,user.username);
				},
					function(error) {										//ERROR callback
							afterAuthFail(error);
					}
				);
			}
			else {
				const registerApi = `${apiRoot}/auth/register`;
				user.authent(registerApi).then(
					function(response){ 								//SUCCESS callback
							afterAuthSuccess(response,user.username);
				},
					function(error) {										//ERROR callback
						afterAuthFail(error);

					}
				);
			}
			function afterAuthSuccess(apiResponse,username) {
				window.localStorage.setItem("authToken", apiResponse.accessToken);
				window.localStorage.setItem("username", username);
				renderNavBar();
				var formElement = document.getElementById("formOpenModal");
				formElement.parentNode.removeChild(formElement);
				}

			function afterAuthFail(apiError,){
				if (formType === "Login") {
					if(apiError.status === 401 && apiError.statusText === 'Unauthorized') {
						errorMessage.innerHTML = apiError.responseJSON.message;
					}
				} 
				else {
					if(apiError.status === 409 && apiError.statusText === 'Conflict') {
						errorMessage.innerHTML = apiError.responseJSON.message;
					}
				}
			}
		} // end of afterValidInputs
	}	// end of apiMeth function
}

	function doLogout() {
		const logoutApi = `${apiRoot}/auth/logout`;
		const token = window.localStorage.getItem("authToken");
		const user = new User();

		user.logout(logoutApi,token)
			.then(function(response){ 								//SUCCESS callback
					afterLogoutSuccess(response);
			},
			function(error) {										//ERROR callback
				afterLogoutFail(error);
			}
		);

		function afterLogoutSuccess(apiResponse){
			promptInfoMessage(apiResponse.message);
			window.localStorage.removeItem("authToken");
			window.localStorage.removeItem("username");
			renderNavBar();
		}

		function afterLogoutFail(apiResponse){
			promptInfoMessage(apiResponse.message);
		}
	} // end of function doLogout

	function promptInfoMessage(messageToDisplay){
		const modalContainer = document.createElement("div");
		modalContainer.id = "formOpenModal";
		modalContainer.classList.add("modalDialog");
		modalContainer.innerHTML = 
			`
				<div>
					<p>${messageToDisplay}<p>
					<input type="button" id="hitBtn" value="GOT THAT">
				</div>
			`
		document.body.appendChild(modalContainer);

		document.getElementById("hitBtn").addEventListener("click", function(){
			const msgElement = document.getElementById("formOpenModal");
			msgElement.parentNode.removeChild(msgElement);
    	});
	}
} // on Html Load
