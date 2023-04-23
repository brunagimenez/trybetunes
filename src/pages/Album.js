import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    albums: [],
    name: '',
    nameAlbum: '',
    loading: false,
    favorite: [],
  };

  async componentDidMount() {
    this.albumMusics();
  }

  albumMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id);
    this.setState({
      albums: music,
      name: music[0].artistName,
      nameAlbum: music[0].collectionName,
    });
  };

  handleChange = (infoMusic) => {
    this.setState({
      loading: true,
    }, async () => {
      await addSong(infoMusic);
      const listMusics = await getFavoriteSongs();
      this.setState({
        loading: false,
        favorite: listMusics,
      });
    });
  };

  render() {
    const { albums, name, nameAlbum, loading, favorite } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{name}</p>
        <p data-testid="album-name">{nameAlbum}</p>
        {loading ? <Loading /> : (
          <section>
            {albums.map((infoMusic) => (
              <div key={ infoMusic.trackId }>
                {infoMusic.previewUrl !== undefined && (
                  <MusicCard
                    infoMusic={ infoMusic }
                    handleChange={ () => this.handleChange(infoMusic) }
                    check={ favorite.some((music) => (
                      infoMusic.trackId === music.trackId)) }
                  />
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default Album;
