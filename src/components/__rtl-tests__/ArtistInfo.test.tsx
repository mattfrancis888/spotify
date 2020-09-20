import Root from "Root";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
    render,
    cleanup,
    RenderResult,
    fireEvent,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import nock from "nock";
import waitForExpect from "wait-for-expect";
import { MemoryRouter } from "react-router";
import Routes from "components/Routes";
import { updateHearts } from "actions";
afterEach(cleanup);
let app: RenderResult;
beforeEach(() => {
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

test("Shows <ArtistInfo> at path /artist/:artistId - Using MemoryRouter", () => {
    expect(app.getByTestId("artistContent")).toBeInTheDocument();
});
describe("Load Artist Info page with data from the database", () => {
    let artistData: any;
    let songsData: any;
    let artistScope: nock.Scope;
    let songsScope: nock.Scope;
    beforeEach(() => {
        artistData = [
            {
                _id: "2",
                firstName: "Ed",
                lastName: "Sheeran",
                image: "img.jpg",
                backgroundImage: "background.jpg",
                hearts: 1,
            },
        ];

        //fetch artist's info

        songsData = [
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
        artistScope = nock("http://localhost:5000/")
            .get("/artists/:artistId")
            .reply(200, artistData, { "Access-Control-Allow-Origin": "*" });

        //fetch artist's songs
        songsScope = nock("http://localhost:5000/")
            .get("/songs/:artistId")
            .reply(200, songsData, { "Access-Control-Allow-Origin": "*" });
    });
    test("ComponentDidMount() fetches data and fills up Artist's banner and songs", async () => {
        await waitForExpect(() => {
            //fetch artist's info results:
            if (!artistScope.isDone()) {
                console.error("pending mocks: %j", artistScope.pendingMocks());
            }
            expect(artistScope.isDone()).toBe(true);

            expect(app.getAllByText(/ed sheeran/i)[0]).toBeInTheDocument();
            //fetch artist's songs result:
            if (!songsScope.isDone()) {
                console.error("pending mocks: %j", songsScope.pendingMocks());
            }
            expect(app.getByText(/perfect/i)).toBeInTheDocument();
        });
        // console.log(app.debug());
    }, 30000); //30000 is our custom setTimeOut; not using Jest default timeout

    test("Artist's Hearts is updated - User clicks on heart icon to give a heart, and then clicks it again to take back the heart ", async () => {
        let heartsScope: any;
        const updatedArtistData = {
            _id: "1",
            firstName: "Ed",
            lastName: "Sheeran",
            image: "img.jpg",
            backgroundImage: "background.jpg",
            hearts: 1,
        };

        //Wait for componentDidMount nock calls to be finished
        await waitForExpect(async () => {
            act(() => {
                //User clicks on heart icon (when it shows as an "outline" of a heart)
                fireEvent.click(app.getByTestId("outlineHeartIcon"));
                //You need to add an interceptor for PATCH request
                //https://github.com/nock/nock/issues/1534
            });
        });

        const UPDATE_HEARTS_ROUTE = "/artists/:artistId/hearts";
        heartsScope = nock("http://localhost:5000/")
            .intercept(UPDATE_HEARTS_ROUTE, "OPTIONS")
            .reply(200, updatedArtistData, {
                "Access-Control-Allow-Origin": "*",
            })
            .patch(UPDATE_HEARTS_ROUTE, (body) => body.hearts)
            .reply(200, updatedArtistData, {
                "Access-Control-Allow-Origin": "*",
            });

        await waitForExpect(() => {
            if (!heartsScope.isDone()) {
                console.error("pending mocks: %j", artistScope.pendingMocks());
            }
            expect(heartsScope.isDone()).toBe(true);
            expect(
                app.getByText((updatedArtistData.hearts + 1).toString())
            ).toBeInTheDocument();
            //  console.log(app.debug());
        });

        //User clicks on heart icon when the heart icon is "filled" with the while color
        await waitForExpect(async () => {
            act(() => {
                fireEvent.click(app.getByTestId("filledHeartIcon"));
            });
        });

        heartsScope = nock("http://localhost:5000/")
            .intercept(UPDATE_HEARTS_ROUTE, "OPTIONS")
            .reply(200, updatedArtistData, {
                "Access-Control-Allow-Origin": "*",
            })
            .patch(UPDATE_HEARTS_ROUTE, (body) => body.hearts)
            .reply(200, updatedArtistData, {
                "Access-Control-Allow-Origin": "*",
            });

        await waitForExpect(() => {
            if (!heartsScope.isDone()) {
                console.error("pending mocks: %j", artistScope.pendingMocks());
            }
            expect(heartsScope.isDone()).toBe(true);
            expect(
                app.getByText(updatedArtistData.hearts.toString())
            ).toBeInTheDocument();
            //  console.log(app.debug());
        });
    }, 30000);
});
