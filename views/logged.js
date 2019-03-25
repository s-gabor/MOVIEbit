const isLogged = () => {
  const authToken = window.localStorage.getItem("authToken");

  if (authToken !== null) {
    const loggedUsername = window.localStorage.getItem("loggedUsername");
    renderNavBar(loggedUsername);
  }
}
