import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ArticleList from '../articleList/articleList';
import ArticleOne from '../articleOne/articleOne';
import SignIn from '../signIn/signIn';
import SignUp from '../signUp/signUp';
import Profile from '../profile/profile';
import Header from '../header/header';
import CreateArticle from '../createArticle/createArticle';
import ArticleEdit from '../articleEdit/articleEdit';

import './app.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slug" element={<ArticleOne />} />
          <Route path="articles/:slug/edit" element={<ArticleEdit />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
          <Route path="new-article" element={<CreateArticle />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
