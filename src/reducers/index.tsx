import { combineReducers } from "redux";
import artistsReducer from "./artistsReducer";
import { Artist, ArtistSongs, Hearts } from "../actions";
import songsReducer from "./songsReducer";
import heartsReducer from "./heartsReducer";
export interface StoreState {
    artists: Artist[];
    artistSongs: ArtistSongs[];
    hearts: Hearts[];
}
export default combineReducers<StoreState>({
    artists: artistsReducer,
    artistSongs: songsReducer,
    hearts: heartsReducer,
});
