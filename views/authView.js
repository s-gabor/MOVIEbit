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
	var form = document.createElement("form");
	form.id = "form";
	form.innerHTML = 
	` 
		<p>${formType}</p>
		<label for = "username">Username</label>
		<input type="text" id="username" name="username" required minlength="4" maxlength="12" size="10"></br></br>
		<label for = "pasword">Password</label>
		<input type="password" id="password" name="password" required minlength="4" maxlength="12" size="10">
		</br></br>
		<input type="button" id="hitBtn" value="${formType}">
	`;

	document.body.appendChild(form);
		document.getElementById("hitBtn").addEventListener("click", function(){
			apiMeth()
		});
		function apiMeth(){
			var pa_UserName = document.getElementById("username").value;
			var pa_Password = document.getElementById("password").value;
			var user = new User(pa_UserName,pa_Password);
			if (formType === "Login") {
				const loginApi = `${apiRoot}/auth/login`;	
				user.authent(loginApi).then(
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
							// afterAuthSuccess(response);
							console.log("Success:",response);
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

			}

			
			
			
		}	// end of apiMeth function
}



} // on Html Load