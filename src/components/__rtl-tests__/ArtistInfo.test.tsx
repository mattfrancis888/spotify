import Root from "Root";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import nock from "nock";
import waitForExpect from "wait-for-expect";
import { MemoryRouter } from "react-router";
import Routes from "components/Routes";
afterEach(cleanup);
let app: RenderResult;
beforeEach(async () => {
    await act(async () => {
        //If we straight up import <ArtistInfo/>, test would not be able to read props.match.params; which menas
        //that we can't use the URL parameter in our tests
        //Will throw an error.
        app = render(
            <Root>
                <MemoryRouter
                    initialEntries={["/artist/:artistId"]}
                    initialIndex={0}
                >
                    <Routes />
                </MemoryRouter>
            </Root>
        );
    });
});

test("Shows <ArtistInfo> at path /artist/:artistId - Using MemoryRouter", () => {
    expect(app.getByTestId("artistContent")).toBeInTheDocument();
});

test("ComponentDidMount() fetches data and fills up Artist's banner and songs", async () => {
    const artistData = [
        {
            _id: "2",
            firstName: "Ed",
            lastName: "Sheeran",
            image: "img.jpg",
            backgroundImage: "background.jpg",
            hearts: 1,
        },
    ];

    const songsData = [
        {
            _id: "1",
            _artist: "1",
            songs: [
                {
                    title: "Perfect",
                    image: "img.jpg",
                },
                {
                    title: "Shape of You",
                    image: "background.jpg",
                },
            ],
        },
    ];

    //fetch artist's info
    const artistScope = nock("http://localhost:5000/")
        .get("/artists/:artistId")
        .reply(200, artistData, { "Access-Control-Allow-Origin": "*" });

    //fetch artist's songs
    const songsScope = nock("http://localhost:5000/")
        .get("/songs/:artistId")
        .reply(200, songsData, { "Access-Control-Allow-Origin": "*" });

    await waitForExpect(() => {
        //fetch artist's info results:
        if (!artistScope.isDone()) {
            console.error("pending mocks: %j", artistScope.pendingMocks());
        }
        expect(artistScope.isDone()).toBe(true);
        //console.log(app.debug());
        expect(app.getAllByText(/ed sheeran/i)[0]).toBeInTheDocument();
        //fetch artist's songs result:
        if (!songsScope.isDone()) {
            console.error("pending mocks: %j", songsScope.pendingMocks());
        }
        expect(app.getByText(/perfect/i)).toBeInTheDocument();
    });
}, 30000); //30000 is our custom setTimeOut; not using Jest default timeout
