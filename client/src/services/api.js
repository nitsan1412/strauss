import { ListGroupItem } from "react-bootstrap";

const URL = "http://localhost:8000";

export default async function fetchData(url, chosenMethod, token, data) {
  let options = {};
  switch (chosenMethod) {
    case "get":
      options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      break;
    case "post":
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      break;

    case "put":
      options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      break;

    case "patch":
      options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      break;

    case "delete":
      options = {
        method: "DELETE",
      };
    case "login":
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      break;

    default:
      break;
  }
  try {
    const response = await fetch(`${URL}${url}`, options);
    if (response.ok) {
      return await response.json();
    } else {
      const errorText = (await JSON.parse(await response.text())).error;
      throw errorText;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
