import config from '../config.json';

import httpService from "./httpService";

const genresURl = "/genres";
export const getGenres = () => {
     return httpService.get(genresURl);
}

