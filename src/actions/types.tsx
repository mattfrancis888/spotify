import { FetchArtistsAction, FetchArtistAction } from "../actions";
export enum ActionTypes {
    FETCH_ARTISTS,
    FETCH_ARTIST,
    FETCH_SONGS,
    UPDATE_HEARTS,
}

export type Actions = FetchArtistsAction | FetchArtistAction;
