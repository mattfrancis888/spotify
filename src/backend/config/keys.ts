import prodKey from "./prod";
import devKey from "./dev";
let key: any;
if (process.env.NODE_ENV === "production") {
    // we are in production - return the prod set of keys
    key = prodKey;
} else {
    // we are in development - return the dev keys!!!
    key = devKey;
}

export default key;
