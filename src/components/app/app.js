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
  const articles = 'articles';
  const articlesSlug = 'articles/:slug';
  const articlesSlugEdit = 'articles/:slug/edit';
  const signIn = 'sign-in';
  const signUp = 'sign-up';
  const profile = 'profile';
  const newArticle = 'new-article';
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<ArticleList />} />
          <Route path={articles} element={<ArticleList />} />
          <Route path={articlesSlug} element={<ArticleOne />} />
          <Route path={articlesSlugEdit} element={<ArticleEdit />} />
          <Route path={signIn} element={<SignIn />} />
          <Route path={signUp} element={<SignUp />} />
          <Route path={profile} element={<Profile />} />
          <Route path={newArticle} element={<CreateArticle />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
