import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    loginName: '',
    isSaveButtonDisabled: true,
    loading: false,
    direct: false,
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    const minName = 2;
    this.setState({ loginName: value }, () => {
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

  onSaveButtonClick = async () => {
    const { loginName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: loginName });
    this.setState({ direct: true });
  };

  render() {
    const { loading, loginName, isSaveButtonDisabled, direct } = this.state;
    if (direct) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login" className="page-login">
        <form className="form-login">
          <input
            className="input-name"
            type="text"
            onChange={ this.onInputChange }
            value={ loginName }
            placeholder="qual é seu nome?"
            data-testid="login-name-input"
          />
          {(loading) && <Loading />}
          <button
            type="button"
            disabled={ isSaveButtonDisabled }
            onClick={ this.onSaveButtonClick }
            data-testid="login-submit-button"
            className="button-login"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
