import axios from "axios";
//Used for onine JSON-store database
const artists = axios.create({
    // .. where we make our configurations
    baseURL: "http://localhost:5000/",
});

export default artists;
