import decoded from "jwt-decode";

class AuthService {
  getToken() {
    return localStorage.getItem("token");
  }
  isTokenExpired(token) {
    try {
      const decoded = decoded(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getProfile() {
    return decoded(this.getToken());
  }
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
