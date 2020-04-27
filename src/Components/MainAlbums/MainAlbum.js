import React from "react";
import Album from "./Album";
import PropTypes from "prop-types";
import { v4 } from "uuid";

function MainAlbum(props) {
  function handleNewAlbumFormSubmit(event) {
    event.preventDefault();
    props.onNewAlbumCreation({
      image: event.target.albumImg.value,
      title: event.target.albumName.value,
      artist: event.target.artistName.value,
      description: event.target.description.value,
      id: v4()
    });
  }

  return (
    <React.Fragment>
      <div className="albums">
        {Object.values(props.albums).map((album, index) => (
          <Album
            key={album.id}
            title={album.title}
            artist={album.artist}
            image={album.image}
            description={album.description}
            id={album.id}
            onAlbumClick={props.onAlbumSelection}
            handleAlbumDelete={props.handleAlbumDelete}
          />
        ))}
      </div>

      <form className="createForm" onSubmit={handleNewAlbumFormSubmit}>
        <h3>Add New Album</h3>
        <input type="text" name="albumName" placeholder="Album Name" />
        <input type="text" name="artistName" placeholder="Artist Name" />
        <input type="text" name="albumImg" placeholder="Link to Album Cover" />
        <textarea name="description" placeholder="Description of album" />
        <button type="submit">Add Album</button>
      </form>
    </React.Fragment>
  );
}

MainAlbum.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
  onNewAlbumCreation: PropTypes.func,
  onAlbumSelection: PropTypes.func
};

export default MainAlbum;
