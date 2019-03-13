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
    logout(apiUrl, lsToken) {
        return $.ajax({
            url: apiUrl,
            method: "GET",
            headers: { "x-auth-token" : lsToken }
        })
    }
}