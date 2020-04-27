import React from "react";
import AlbumHeader from "./AlbumHeader/AlbumHeader";
import AlbumDetails from "./AlbumDetails/AlbumDetails";
import MainHeader from "./MainHeader/MainHeader";
import MainAlbum from "./MainAlbums/MainAlbum";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import "../App.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHomePage: true,
      showShoppingCart: false,
      // albumList: [
      //   {
      //     title: "Dark Side of the Moon",
      //     artist: "Pink Floyd",
      //     image: "https://miro.medium.com/max/2480/1*8FkvzbSdSJ4HNxtuZo5kLg.jpeg",
      //     description: "An amazing album!",
      //     inventory: 9,
      //     id: "42066691"
      //   },
      //   {
      //     title: "City To City",
      //     artist: "Gerry Rafferty",
      //     image: "https://upload.wikimedia.org/wikipedia/en/9/9a/Citytocity.jpg",
      //     description: "An amazing album!",
      //     inventory: 9,
      //     id: "42066692"
      //   },
      //   {
      //     title: "Blondes Have More Fun",
      //     artist: "Rod Stewart",
      //     image:
      //       "https://upload.wikimedia.org/wikipedia/en/3/35/Rod_Stewart_-_Blondes_Have_More_Fun_%28album_cover%29.jpg",
      //     description: "An amazing album!",
      //     inventory: 9,
      //     id: "42066693"
      //   },
      //   {
      //     title: "Africa",
      //     artist: "TOTO",
      //     image: "https://cdn-s3.allmusic.com/release-covers/500/0000/866/0000866482.jpg",
      //     description: "An amazing album!",
      //     inventory: 9,
      //     id: "42066694"
      //   },
      //   {
      //     title: "Can't Buy A Thrill",
      //     artist: "Steely Dan",
      //     image: "https://upload.wikimedia.org/wikipedia/en/b/b2/Cant_buy_a_tcant_buy_a_thrill.jpg",
      //     description: "An amazing album!",
      //     inventory: 9,
      //     id: "42066695"
      //   },
      //   {
      //     title: "Careless Whisper",
      //     artist: "George Michael",
      //     image:
      //       "https://img.discogs.com/j_OGjQLde9lJ7Om9Pd6gVHtuIpM=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1296467-1354892016-3591.jpeg.jpg",
      //     description: "An amazing album!",
      //     inventory: 9,
      //     id: "42066696"
      //   }
      // ],
      currentSelectedAlbum: {},
      shoppingCartItems: []
    };
  }

  handleAlbumSelection = (id) => {
    const selectedAlbum = this.state.albumList.filter((album) => album.id === id)[0];
    this.setState({
      currentSelectedAlbum: selectedAlbum,
      showHomePage: false
    });
  };

  handleAddingNewAlbum = (newAlbum) => {
    const { dispatch } = this.props;
    const { title, artist, image, description, inventory, id } = newAlbum;
    const action = {
      type: "ADD_ALBUM",
      id: id,
      title: title,
      artist: artist,
      image: image,
      description: description,
      inventory: inventory
    };
    dispatch(action);
  };

  handleBackToAlbums = () => {
    this.setState({
      showHomePage: true
    });
  };

  handleAlbumPurchase = (albumToEdit) => {
    //update inventory of album
    const { dispatch } = this.props;
    const { title, artist, image, description, inventory, id } = albumToEdit;
    const action = {
      type: "ADD_ALBUM",
      title: title,
      artist: artist,
      image: image,
      description: description,
      inventory: inventory - 1,
      id: id
    };
    dispatch(action);

    //add album to cart and refreshes current album to reflect inv change
    const newShoppingCartItems = this.state.shoppingCartItems.concat(albumToEdit);
    const updatedAlbum = this.props.albumList[id];

    this.setState({
      shoppingCartItems: newShoppingCartItems,
      currentSelectedAlbum: updatedAlbum
    });

    // const selectedAlbum = this.state.albumList.filter((album) => album.id === id)[0];
    // const newShoppingCartItems = this.state.shoppingCartItems.concat(selectedAlbum);
    // const newInventory = selectedAlbum.inventory - 1;
    // const updatedAlbum = { ...selectedAlbum, inventory: newInventory };
    // const oldAlbums = this.state.albumList.filter((album) => album.id !== id);
    // this.setState({
    //   shoppingCartItems: newShoppingCartItems,
    //   albumList: [ ...oldAlbums, updatedAlbum ],
    //   currentSelectedAlbum: updatedAlbum
    // });
  };

  handleAlbumRestock = (id) => {
    const selectedAlbum = this.state.albumList.filter((album) => album.id === id)[0];
    const newInventory = selectedAlbum.inventory + 1;
    const updatedAlbum = { ...selectedAlbum, inventory: newInventory };
    const oldAlbums = this.state.albumList.filter((album) => album.id !== id);
    this.setState({
      albumList: [ ...oldAlbums, updatedAlbum ],
      currentSelectedAlbum: updatedAlbum
    });
  };

  handleAlbumDelete = (id) => {
    const updateAlbumsList = this.state.albumList.filter((album) => album.id !== id);
    this.setState({
      albumList: [ ...updateAlbumsList ]
    });
  };

  handleShowShoppingCart = () => {
    this.setState({
      showShoppingCart: !this.state.showShoppingCart
    });
  };

  currentPage = () => {
    if (this.state.showShoppingCart) {
      return {
        header: (
          <MainHeader
            onShowShoppingCart={this.handleShowShoppingCart}
            cartItemNumber={this.state.shoppingCartItems.length}
          />
        ),
        body: <ShoppingCart albums={this.state.shoppingCartItems} />
      };
    } else if (this.state.showHomePage) {
      return {
        header: (
          <MainHeader
            onShowShoppingCart={this.handleShowShoppingCart}
            cartItemNumber={this.state.shoppingCartItems.length}
          />
        ),
        body: (
          <MainAlbum
            albums={this.state.albumList}
            onAlbumSelection={this.handleAlbumSelection}
            onNewAlbumCreation={this.handleAddingNewAlbum}
            handleAlbumDelete={this.handleAlbumDelete}
          />
        )
      };
    } else {
      return {
        header: <AlbumHeader album={this.state.currentSelectedAlbum} handleBackToAlbums={this.handleBackToAlbums} />,
        body: (
          <AlbumDetails
            album={this.state.currentSelectedAlbum}
            onAlbumPurchase={this.handleAlbumPurchase}
            onAlbumRestock={this.handleAlbumRestock}
          />
        )
      };
    }
  };

  render() {
    let currentPage = this.currentPage();
    return (
      <React.Fragment>
        {currentPage.header}
        {currentPage.body}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  albumList: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    albumList: state
  };
};

App = connect(mapStateToProps)(App);

export default App;
