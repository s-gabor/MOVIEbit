document.addEventListener('DOMContentLoaded', onHtmlLoaded);

function onHtmlLoaded() {

const apiRoot = "https://ancient-caverns-16784.herokuapp.com";	

document.getElementById("btnReg").addEventListener("click",function(){
	createLoginForm("Register");
});

document.getElementById("btnLog").addEventListener("click",function(){
	createLoginForm("Login");
});

function createLoginForm(formType) {
	var modalContainer = document.createElement("div");
    modalContainer.id = "formOpenModal";
    modalContainer.classList.add("modalDialog");
	modalContainer.innerHTML = 
    ` 
        <div>
            <p id="formClose" title="Close" class="close">X</p>
            <h3>${formType}</h3>
            <label for = "username">Username</label>
            <input type="text" id="username" name="username" required minlength="4" maxlength="12" size="10">
            <label for = "pasword">Password</label>
            <input type="password" id="password" name="password" required minlength="4" maxlength="12" size="10">
            
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
			var user = new User(pa_UserName,pa_Password);
			if (formType === "Login") {
				const loginApi = `${apiRoot}/auth/login`;	
				user.authent(loginApi,).then(
					function(response){ 								//SUCCESS callback
							console.log("Success:",response);
							afterAuthSuccess(response,user.username);

				},
					function(error) {										//ERROR callback
						// afterAuthFail(error);
						console.log("Error:",error);


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
							// afterAuthFail(error);
							console.log("Error:",error);
					}
				);
			}

			function afterAuthSuccess(apiResponse,username) {
				document.getElementById("btnLog").classList.add("inact_butt"); // toggle buttons
				document.getElementById("btnReg").classList.add("inact_butt");
				document.getElementById("btnLogOut").classList.remove("inact_butt");
				document.getElementById("userDisplay").innerHTML = username;
				document.getElementById("userDisplay").classList.remove("inact_butt");
				window.localStorage.setItem("authToken", JSON.stringify(apiResponse.accessToken));
                var formElement = document.getElementById("formOpenModal");
                formElement.parentNode.removeChild(formElement);
			}

			
			
			
		}	// end of apiMeth function
}



} // on Html Load