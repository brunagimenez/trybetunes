import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class App extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ name: user.name });
    this.setState({ loading: false });
  };

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        <Link
          to="/search"
          data-testid="link-to-search"
        >
          Pesquisa
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Favoritos
        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
        >
          Perfil
        </Link>
        {(loading) && <Loading />}
        <p data-testid="header-user-name">{name}</p>
      </header>
    );
  }
}

export default App;
