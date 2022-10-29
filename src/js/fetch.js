const axios = require('axios').default;
export async function fetch(query, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=30926244-0d1827d5be25c89cfafbcf30b&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
