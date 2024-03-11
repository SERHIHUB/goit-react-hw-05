import axios from "axios";

const access_key = "f3f284be1756fe8f12a14bc875d1ec91";
const access_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2YyODRiZTE3NTZmZThmMTJhMTRiYzg3NWQxZWM5MSIsInN1YiI6IjY1ZTg0M2Y5Y2FhYjZkMDE2Mjk1N2U4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kb8DnIAGx_9MdX-ilgyHghD5dc-28TmWRd4rSL-hSps";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export const getMovies = async (path) => {
  const response = await axios.get(path, {
    params: {
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data.results;
};

export const getMoviesById = async (path) => {
  const response = await axios.get(path, {
    params: {
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data;
};

export const getMoviesByWord = async (path, searchQuery, page) => {
  const response = await axios.get(path, {
    params: {
      language: "en-US",
      include_adult: false,
      query: searchQuery,
      page,
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data;
};

export const getMoviesCast = async (path) => {
  const response = await axios.get(path, {
    params: {
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
};

export const getMoviesReviews = async (path, page) => {
  const response = await axios.get(path, {
    params: {
      language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data.results;
};
