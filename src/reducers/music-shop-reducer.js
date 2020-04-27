export default (state = {}, action) => {
  const { title, artist, image, description, inventory, id } = action;

  switch (action.type) {
    case "ADD_ALBUM":
      return Object.assign({}, state, {
        [id]: {
          title: title,
          artist: artist,
          image: image,
          description: description,
          inventory: inventory,
          id: id
        }
      });
    case "DELETE_ALBUM":
      const newState = { ...state };
      delete newState[id];
      return newState;
    default:
      return state;
  }
};

// {
//   title: "Dark Side of the Moon",
//   artist: "Pink Floyd",
//   image: "https://miro.medium.com/max/2480/1*8FkvzbSdSJ4HNxtuZo5kLg.jpeg",
//   description: "An amazing album!",
//   inventory: 9,
//   id: "42066691"
// },
