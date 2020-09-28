import { ActionTypes } from "./types";
import onlineAPI from "./axiosConfig";

import axios from "axios";
import { Dispatch } from "redux";

interface Song {
    title: string;
    image: string;
}
export interface ArtistSongs {
    _id: string;
    _artist: string;
    songs: Song[];
}

export interface SongsAction {
    type: ActionTypes.FETCH_SONGS;
    payload: ArtistSongs[];
}

export const fetchSongs = (artistId: string) => async (dispatch: Dispatch) => {
    const response = await onlineAPI.get<ArtistSongs[]>(`/songs/${artistId}`);
    dispatch<SongsAction>({
        type: ActionTypes.FETCH_SONGS,
        payload: response.data,
    });
};
