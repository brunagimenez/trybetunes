import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';

function Routes() {
  return (
    <Switch>
      <Route
        path="/search"
        render={ () => (
          <Search />
        ) }
      />
      <Route
        path="/favorites"
        render={ () => (
          <Favorites />
        ) }
      />
      <Route
        path="/album/:id"
        render={ (props) => (
          <Album
            { ...props }
          />
        ) }
      />
      <Route
        path="/profile/edit"
        render={ () => (
          <ProfileEdit />
        ) }
      />
      <Route
        path="/profile"
        render={ () => (
          <Profile />
        ) }
      />
      <Route
        exact
        path="/"
        render={ () => (
          <Login />
        ) }
      />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default Routes;
