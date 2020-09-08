import { combineReducers } from "redux";
import artistsReducer from "./artistsReducer";
import { Artist } from "../actions";
export interface StoreState {
    artists: Artist[];
}
export default combineReducers<StoreState>({
    artists: artistsReducer,
});
