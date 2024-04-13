import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_X_RAPIDAPI_NEWS_HOST,
};

const baseUrl = "https://news-api14.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/search?q=${newsCategory}&country=us&language=en&publisher=cnn.com,bbc.com&pageSize=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
