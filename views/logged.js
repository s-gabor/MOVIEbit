const isLogged = () => {
  const authToken = window.localStorage.getItem("authToken");
  // console.log(authToken);
  if (authToken !== null) {
    const loggedUsername = window.localStorage.getItem("loggedUsername");
    renderNavBar(loggedUsername);
    }
}
