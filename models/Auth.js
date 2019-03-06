class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    authent(apiUrl,usernameP,passwordP){
        return $.ajax({
            url: apiUrl,
            method: "POST",
            data: {
                username = usernameP,
                password = passwordP    
            }
        })
    }
}