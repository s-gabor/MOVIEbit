document.addEventListener('DOMContentLoaded', onHtmlLoaded);

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
	var modalContainer = document.createElement("div");
    modalContainer.id = "formOpenModal";
	modalContainer.classList.add("modalDialog");
	modalContainer.innerHTML =
    `
        <div>
            <p id="formClose" title="Close" class="closeBut">X</p>
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
        var formElement = document.getElementById("formOpenModal");
        formElement.parentNode.removeChild(formElement);
});

		function apiMeth(){
			var pa_UserName = document.getElementById("username").value;
			var pa_Password = document.getElementById("password").value;
			var errorMessage = document.getElementById("errorMessage");
			if (formType === "Register") {
				if (pa_UserName.length >= 4 && pa_UserName.length <= 12 && pa_Password.length >= 4 && pa_Password.length <= 12) {
					afterValidInputs();
				}
				else if (pa_UserName.length >= 4 && pa_UserName.length <= 12){
					errorMessage.innerHTML = "Password must be between 4 and 12 characters !";
				}
				else if (pa_Password.length >= 4 && pa_Password.length <= 12) {
					errorMessage.innerHTML = "Username must be between 4 and 12 characters !";
				}

				else {
					errorMessage.innerHTML = "Username and password must be between 4 and 12 characters !";
				}
			}
			else {
				if (pa_UserName.length !== 0 && pa_Password.length !== 0) {
					afterValidInputs();
				}
				else {
					errorMessage.innerHTML = "Please provide an username and password !";
				}
			}

			function afterValidInputs () {
				var user = new User(pa_UserName,pa_Password);
				if (formType === "Login") {
					const loginApi = `${apiRoot}/auth/login`;
					user.authent(loginApi,).then(
						function(response){ 								//SUCCESS callback
								console.log("Success:",response);
								afterAuthSuccess(response,user.username);
					},
						function(error) {										//ERROR callback
								console.log("Error:",error);	
								afterAuthFail(error);
						}
					);
				}
				else {
					const registerApi = `${apiRoot}/auth/register`;
					user.authent(registerApi).then(
						function(response){ 								//SUCCESS callback
								console.log("Success:",response);
								afterAuthSuccess(response,user.username);
					},
						function(error) {										//ERROR callback
							console.log("Error:",error);
							afterAuthFail(error);
	
						}
					);
				}
				function afterAuthSuccess(apiResponse,username) {
					document.getElementById("btnLog").classList.remove("displayNavButtons");
					document.getElementById("btnLog").classList.add("hideNavButtons");
	
					document.getElementById("btnReg").classList.remove("displayNavButtons");
					document.getElementById("btnReg").classList.add("hideNavButtons");
	
					document.getElementById("btnLogOut").classList.remove("hideNavButtons");
					document.getElementById("btnLogOut").classList.add("displayNavButtons");
	
					document.getElementById("userDisplayA").innerHTML = username;
					document.getElementById("userDisplay").classList.remove("hideNavButtons");
					document.getElementById("userDisplay").classList.add("displayNavButtons");
	
					window.localStorage.setItem("authToken", apiResponse.accessToken);
					var formElement = document.getElementById("formOpenModal");
					formElement.parentNode.removeChild(formElement);
				}
	
				function afterAuthFail(apiError,){
					if (formType === "Login") {
						if(apiError.status === 401 && apiError.statusText === 'Unauthorized') {
							errorMessage.innerHTML = apiError.responseJSON.message;
						}
					} else {
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
		var user = new User();
		user.logout(logoutApi,token).then(
			function(response){ 								//SUCCESS callback
				console.log("Success logout:",response);
				afterLogoutSuccess(response);
			},
			function(error) {										//ERROR callback
				console.log("Error logout:",error);
				afterLogoutFail(error);
			}
		);
	
		function afterLogoutSuccess(apiResponse){
			promptInfoMessage(apiResponse.message);

			document.getElementById("btnLog").classList.add("displayNavButtons");
			document.getElementById("btnLog").classList.remove("hideNavButtons");

			document.getElementById("btnReg").classList.add("displayNavButtons");
			document.getElementById("btnReg").classList.remove("hideNavButtons");

			document.getElementById("btnLogOut").classList.add("hideNavButtons");
			document.getElementById("btnLogOut").classList.remove("displayNavButtons");

			document.getElementById("userDisplay").classList.add("hideNavButtons");
			document.getElementById("userDisplay").classList.remove("displayNavButtons");

			window.localStorage.removeItem("authToken");
		}

		function afterLogoutFail(apiResponse){	
			promptInfoMessage(apiResponse.message);
		}

	} // end of function doLogout

	function promptInfoMessage(messageToDisplay){
		var modalContainer = document.createElement("div");
		modalContainer.id = "formOpenModal";
		modalContainer.classList.add("modalDialog");
		modalContainer.innerHTML = `
			<div>
				<p>${messageToDisplay}<p>
				<input type="button" id="hitBtn" value="GOT THAT">
			</div>
		`
		document.body.appendChild(modalContainer);
		document.getElementById("hitBtn").addEventListener("click", function(){
			var msgElement = document.getElementById("formOpenModal");
			msgElement.parentNode.removeChild(msgElement);	
    });

	}
} // on Html Load
