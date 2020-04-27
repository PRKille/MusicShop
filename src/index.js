import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import reducer from "./reducers/music-shop-reducer";
import { Provider } from "react-redux";

const startingAlbumList = {
  42066691: {
    title: "Dark Side of the Moon",
    artist: "Pink Floyd",
    image: "https://miro.medium.com/max/2480/1*8FkvzbSdSJ4HNxtuZo5kLg.jpeg",
    description: "An amazing album!",
    inventory: 9,
    id: "42066691"
  },
  42066692: {
    title: "City To City",
    artist: "Gerry Rafferty",
    image: "https://upload.wikimedia.org/wikipedia/en/9/9a/Citytocity.jpg",
    description: "An amazing album!",
    inventory: 9,
    id: "42066692"
  },
  42066693: {
    title: "Blondes Have More Fun",
    artist: "Rod Stewart",
    image: "https://upload.wikimedia.org/wikipedia/en/3/35/Rod_Stewart_-_Blondes_Have_More_Fun_%28album_cover%29.jpg",
    description: "An amazing album!",
    inventory: 9,
    id: "42066693"
  },
  42066694: {
    title: "Africa",
    artist: "TOTO",
    image: "https://cdn-s3.allmusic.com/release-covers/500/0000/866/0000866482.jpg",
    description: "An amazing album!",
    inventory: 9,
    id: "42066694"
  },
  42066695: {
    title: "Can't Buy A Thrill",
    artist: "Steely Dan",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b2/Cant_buy_a_tcant_buy_a_thrill.jpg",
    description: "An amazing album!",
    inventory: 9,
    id: "42066695"
  },
  42066696: {
    title: "Careless Whisper",
    artist: "George Michael",
    image:
      "https://img.discogs.com/j_OGjQLde9lJ7Om9Pd6gVHtuIpM=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1296467-1354892016-3591.jpeg.jpg",
    description: "An amazing album!",
    inventory: 9,
    id: "42066696"
  }
};

const store = createStore(
  reducer,
  startingAlbumList,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
