import { Button } from "@material-ui/core";
import React from "react";
import "./Playlist.css";

const Playlist = (props) => {
  return (
    <div>
      {/* {
        props.playlists.map(item => console.log(item))
      } */}
      <form className="form-inline ">
        <div className="form-group mx-auto">
          <input type="text" className="form-control" />
          <i className="fa fa-search form-control-feedback position-relative"></i>
        </div>
      </form>
      <br />
      <div className="container p-0 cont-playlist">
        <div className="d-flex flex-column">
          <div className="d-flex mt-2 mb-2">
            <div className="main-play mr-auto">
              <h2>Playlist</h2>
            </div>
            <div className="main-play mr-auto">
              <Button variant="outlined" color="secondary" size="small">
                New Playlist
              </Button>
            </div>
          </div>
          <div className="d-flex">
            <div className="col-md-7 text-right">
              <div className="d-flex p-3 playlist-list">
                <div className="play-image mr-3">
                  <img
                    src="https://www.teahub.io/photos/full/3-34370_avengers-endgame-portals-poster.png"
                    height="60"
                    width="100"
                  />
                </div>
                <div className="d-flex flex-column text-left">
                  <h5>The Bruno Playlist</h5>
                  <h6 className="playlist-h5">114 videos</h6>
                </div>
              </div>
              <div className="d-flex p-3 playlist-list">
                <div className="play-image mr-3">
                  <img
                    src="https://www.teahub.io/photos/full/3-34370_avengers-endgame-portals-poster.png"
                    height="60"
                    width="100"
                  />
                </div>
                <div className="d-flex flex-column text-left">
                  <h5>The Bruno Playlist</h5>
                  <h6 className="playlist-h5">114 videos</h6>
                </div>
              </div>
              <div className="d-flex p-3 playlist-list">
                <div className="play-image mr-3">
                  <img
                    src="https://www.teahub.io/photos/full/3-34370_avengers-endgame-portals-poster.png"
                    height="60"
                    width="100"
                  />
                </div>
                <div className="d-flex flex-column text-left">
                  <h5>The Bruno Playlist</h5>
                  <h6 className="playlist-h5">114 videos</h6>
                </div>
              </div>
            </div>
            <div
              className="col-md-4 style-playlist p-0"
              style={{ overflow: "hidden" }}
            >
              <div className="d-flex flex-column">
                <div className="style-image d-flex flex-column">
                  <img
                    src="https://www.teahub.io/photos/full/3-34370_avengers-endgame-portals-poster.png"
                    height="100%"
                    width="100%"
                    className="img-fluid"
                  />
                  <h6 className="mt-2 ml-2">Bruno Mars - Finese(Remix)</h6>
                </div>
                <div className="d-flex ml-2 songs-name">
                  <i class="fa fa-play mr-3" aria-hidden="true"></i>
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </div>
                <div className="list-view">
                  <h6 className="mt-2 ml-2">Related songs</h6>
                </div>
                <div style={{ overflowX: "scroll !important" }}>
                  <div className="d-flex pt-3 pb-3">
                    <div className="play-image mr-3 ml-3">
                      <img
                        src="https://www.teahub.io/photos/full/3-34370_avengers-endgame-portals-poster.png"
                        height="60"
                        width="100"
                      />
                    </div>
                    <div className="d-flex flex-column text-left">
                      <h5>The Bruno Playlist</h5>
                      <h6 className="playlist-h5">114 videos</h6>
                    </div>
                  </div>
                  <div className="d-flex pt-3 pb-3">
                    <div className="play-image mr-3 ml-3">
                      <img
                        src="https://www.teahub.io/photos/full/3-34370_avengers-endgame-portals-poster.png"
                        height="60"
                        width="100"
                      />
                    </div>
                    <div className="d-flex flex-column text-left">
                      <h5>The Bruno Playlist</h5>
                      <h6 className="playlist-h5">114 videos</h6>
                    </div>
                  </div>
                  <div className="d-flex pt-3 pb-3">
                    <div className="play-image mr-3 ml-3">
                      <img
                        src="https://www.teahub.io/photos/full/3-34370_avengers-endgame-portals-poster.png"
                        height="60"
                        width="100"
                      />
                    </div>
                    <div className="d-flex flex-column text-left">
                      <h5>The Bruno Playlist</h5>
                      <h6 className="playlist-h5">114 videos</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
