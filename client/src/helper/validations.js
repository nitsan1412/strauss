export default function validateForm(fieldsArray, data) {
  const FIELDS = {
    email: {
      validate: !/\S+@\S+\.\S+/.test(data.email),
      error: "Invalid email format",
    },
    password: {
      validate: data.password.length < 8,
      error: "password must be at least 8 characters long",
    },
    username: {
      validate: data.username.length < 4,
      error: "username must be at least 4 characters long",
    },
  };

  const errors = {};

  fieldsArray.forEach((field) => {
    if (!data[field]) {
      errors[field] = `${field} is a required field`;
    } else if (FIELDS[field].validate) errors[field] = FIELDS[field].error;
  });

  return { errors };
}
