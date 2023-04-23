import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    artist: '',
    isSaveButtonDisabled: true,
    loading: false,
    albums: [],
    searchedName: '',
    clickButton: false,
    error: false,
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    const minName = 1;
    this.setState({ artist: value }, () => {
      if (value.length > minName) {
        this.setState({
          isSaveButtonDisabled: false,
        });
      } else {
        this.setState({
          isSaveButtonDisabled: true,
        });
      }
    });
  };

  searchArtist = async () => {
    const { artist } = this.state;
    this.setState({ loading: true });
    const listAlbums = await searchAlbumsAPI(artist);
    if (listAlbums.length === 0) {
      this.setState({
        loading: false,
        clickButton: false,
        error: true,
      });
    } else {
      this.setState({
        searchedName: artist,
        artist: '',
        albums: listAlbums,
        loading: false,
        clickButton: true,
        error: false,
      });
    }
  };

  render() {
    const {
      loading,
      artist,
      isSaveButtonDisabled,
      searchedName,
      albums,
      clickButton,
      error,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            onChange={ this.onInputChange }
            value={ artist }
            type="text"
            placeholder="NOME DO ARTISTA"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isSaveButtonDisabled }
            onClick={ this.searchArtist }
          >
            Pesquisar
          </button>
        </form>
        {(loading) && <Loading />}
        {(error) && (
          <h2> Nenhum álbum foi encontrado </h2>
        )}
        {(clickButton) && (
          <>
            <h2>
              Resultado de álbuns de:
              {' '}
              {searchedName}
              ,
            </h2>
            <section>
              {albums.map(({
                artistId,
                artistName,
                collectionName,
                artworkUrl100,
                collectionId,
              }) => (
                <div key={ artistId }>
                  <img src={ artworkUrl100 } alt={ collectionName } />
                  <p>{collectionName}</p>
                  <p>{artistName}</p>
                  <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    Saiba Mais
                  </Link>
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    );
  }
}

export default Search;
