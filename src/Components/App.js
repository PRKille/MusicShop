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
      currentSelectedAlbum: {},
      shoppingCartItems: []
    };
  }

  handleAlbumSelection = (id) => {
    const selectedAlbum = this.props.albumList[id];
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
      inventory: 0
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
    const newInventory = inventory - 1;
    const action = {
      type: "ADD_ALBUM",
      title: title,
      artist: artist,
      image: image,
      description: description,
      inventory: newInventory,
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
  };

  handleAlbumRestock = (albumToEdit) => {
    //update inventory of album
    const { dispatch } = this.props;
    const thisAlbum = this.props.albumList[albumToEdit.id];
    const { title, artist, image, description, inventory, id } = thisAlbum;

    const newInventory = inventory + 1;

    const action = {
      type: "ADD_ALBUM",
      title: title,
      artist: artist,
      image: image,
      description: description,
      inventory: newInventory,
      id: id
    };
    dispatch(action);

    //refreshes current album to reflect inventory change
    const updatedAlbum = this.props.albumList[id];

    this.setState({
      currentSelectedAlbum: updatedAlbum
    });
  };

  handleAlbumDelete = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: "DELETE_ALBUM",
      id: id
    };
    dispatch(action);
  };

  handleShowShoppingCart = () => {
    this.setState({
      showShoppingCart: !this.state.showShoppingCart
    });
  };

  //Rendering
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
            albums={this.props.albumList}
            onAlbumSelection={this.handleAlbumSelection}
            onNewAlbumCreation={this.handleAddingNewAlbum}
            handleAlbumDelete={this.handleAlbumDelete}
          />
        )
      };
    } else {
      return {
        header: (
          <AlbumHeader
            album={this.props.albumList[this.state.currentSelectedAlbum.id]}
            handleBackToAlbums={this.handleBackToAlbums}
          />
        ),
        body: (
          <AlbumDetails
            album={this.props.albumList[this.state.currentSelectedAlbum.id]}
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
