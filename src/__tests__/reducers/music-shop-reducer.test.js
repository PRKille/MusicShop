import musicShopReducer from "../../reducers/music-shop-reducer";

describe("musicShopReducer", () => {
  let action;
  const albumData = {
    title: "Dark Side of the Moon",
    artist: "Pink Floyd",
    image: "img.jpeg",
    description: "An amazing album!",
    inventory: 9,
    id: "42066691"
  };

  const currentState = {
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
    }
  };

  test("should return default state if there is no action passed into reducer", () => {
    expect(musicShopReducer({}, { type: null })).toEqual({});
  });

  test("Should successfully add new album to albumList", () => {
    const { title, artist, image, description, inventory, id } = albumData;
    action = {
      type: "ADD_ALBUM",
      title: title,
      artist: artist,
      image: image,
      description: description,
      inventory: inventory,
      id: id
    };

    expect(musicShopReducer({}, action)).toEqual({
      [id]: {
        title: title,
        artist: artist,
        image: image,
        description: description,
        inventory: inventory,
        id: id
      }
    });
  });

  test("should delete an album", () => {
    action = {
      type: "DELETE_ALBUM",
      id: 42066692
    };
    expect(musicShopReducer(currentState, action)).toEqual({
      42066691: {
        title: "Dark Side of the Moon",
        artist: "Pink Floyd",
        image: "https://miro.medium.com/max/2480/1*8FkvzbSdSJ4HNxtuZo5kLg.jpeg",
        description: "An amazing album!",
        inventory: 9,
        id: "42066691"
      }
    });
  });
});

// {
//   title: "Dark Side of the Moon",
//   artist: "Pink Floyd",
//   image: "https://miro.medium.com/max/2480/1*8FkvzbSdSJ4HNxtuZo5kLg.jpeg",
//   description: "An amazing album!",
//   inventory: 9,
//   id: "42066691"
// },
