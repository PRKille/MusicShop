import React from "react";
import PropTypes from "prop-types";

const AlbumDetails = (props) => {
  function hasInventory(count) {
    return count > 0 ? <button onClick={() => props.onAlbumPurchase(props.album)}>Buy</button> : <p>Out Of Stock!</p>;
  }

  return (
    <div className="description">
      <p>Description: {props.album.description}</p>
      <br />
      <div className="buttons">
        {hasInventory(props.album.inventory)}
        <p>Quantity: {props.album.inventory}</p>
        <button onClick={() => props.onAlbumRestock(props.album)}>Restock</button>
      </div>
    </div>
  );
};

AlbumDetails.propTypes = {
  album: PropTypes.object,
  onAlbumPurchase: PropTypes.func,
  onAlbumRestock: PropTypes.func
};

export default AlbumDetails;
