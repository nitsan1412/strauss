// export const validateLogin = (data) => {
//   return {};
// };

// export const validateSignUp = (data) => {
//   return {};
// };

export default function validateForm(keysArray, data) {
  const errors = {};

  keysArray.forEach((key) => {
    if (!data[key]) {
      errors[key] = `${key} is a required field`;
    } else if (key === "email" && !/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email format";
    } else if (key === "password" && data.password.length < 8) {
      errors.password = "password must be at least 8 characters long";
    } else if (key === "username" && data.username.length < 4) {
      errors.password = "username must be at least 4 characters long";
    }
  });

  return { errors };
}
