import axios from "axios";
//Used for onine JSON-store database
const artists = axios.create({
    // .. where we make our configurations
    baseURL: "https://spotify-backend.mattfrancis888.vercel.app/",
});

export default artists;
