class User {
  constructor(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }

  login(password) {
    if (password !== this.password) throw new Error("incorrect password");
    this.loggedIn = true;
    return true;
  }
  // User code here
  logout() {
    this.loggedIn = false;
  }
}

module.exports = User;
