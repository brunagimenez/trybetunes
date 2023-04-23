import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { infoMusic, handleChange, check } = this.props;
    return (
      <section>
        <div>{infoMusic.trackName}</div>
        <audio data-testid="audio-component" src={ infoMusic.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label
          htmlFor="favorites"
        >
          Favorita
          <input
            data-testid={ `checkbox-music-${infoMusic.trackId}` }
            type="checkbox"
            id="favorites"
            onChange={ handleChange }
            checked={ check }
          />
        </label>
        {/* checkboxes foi desenvolvida com ajuda da colega Carol */}
      </section>
    );
  }
}

MusicCard.propTypes = {
  infoMusic: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.element.isRequired,
    trackId: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.shape.isRequired,
  check: PropTypes.shape.isRequired,
};
export default MusicCard;
