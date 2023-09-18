class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // Example: Method to update user information
  updateUserInfo(newUsername, newEmail) {
    this.username = newUsername;
    this.email = newEmail;
    this.updatedAt = new Date();
  }

  // Example: Method to generate a user summary
  getUserData() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
    };
  }
  static table = "user"
}

module.exports = User;
