const API_URL = 'https://swapi.dev/api/people';

export const fetchPeople = async () => {
  const response = await fetch(API_URL);
  if (response.status >= 200) {
    const jsonResponse = await response.json();
    return jsonResponse;
  } else {
    // Handle errors
    console.log(response.status, response.statusText);
    return [];
  }
};

export const searchPeople = async (query: string) => {
  return fetch(`${API_URL}/?search=${query}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => res.results)
    .catch((error) => {
      console.error(error);
      return [];
    });
};
