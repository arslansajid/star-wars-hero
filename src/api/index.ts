const API_URL = "https://swapi.dev/api/people";

export const fetchPeople = async () => {
  return fetch(API_URL, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => res.results)
    .catch((error) => {
      console.error(error);
      return [];
    });
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
