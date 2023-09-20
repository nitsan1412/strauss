const baseUrl = "http://localhost:8000";

export default async function fetchData(url, chosenMethod, token, data) {
  let options = {
    method: chosenMethod.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${baseUrl}${url}`, options);
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
