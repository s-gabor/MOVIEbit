class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    authent(apiUrl){
        return $.ajax({
            url: apiUrl,
            method: "POST",
            data: {
                username : this.username,
                password : this.password    
            }
        })
    }
}