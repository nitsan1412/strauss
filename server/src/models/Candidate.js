class Candidate {
  constructor(
    first_name,
    last_name,
    email,
    gender,
    job_title,
    job_description,
    avatar
  ) {
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
    this.gender = gender;
    this.jobTitle = job_title;
    this.jobDescription = job_description;
    this.avatar = avatar;
  }

  deleteCandidate(candidateId) {}

  // Example: Method to update user information
  updateCandidateInfo(newUsername, newEmail) {
    this.username = newUsername;
    this.email = newEmail;
    this.updatedAt = new Date();
  }

  // Example: Method to generate a user summary
  getUserData() {
    return {
      username: this.username,
      email: this.email,
      hashedPassword: this.hashedPassword,
    };
  }
}

module.exports = Candidate;
