import React, { useEffect } from 'react';
import { NavLink, Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ArticleStoreService from '../../service/articleList-api';
import { userReg, isLoggedIn, loadArticle } from '../../redux/slice';

import classes from './header.module.scss';

export default function Header() {
  const location = useLocation();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const api = new ArticleStoreService();
  const user = useSelector((g) => g.slice.user);
  const log = useSelector((g) => g.slice.logged);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      api
        .getUserReg()
        .then((g) => {
          dispatch(userReg(g));
        })
        .catch((e) => console.log(e));
      dispatch(isLoggedIn(true));
    }
    !slug || location.pathname === `/articles/${slug}/edit` ? dispatch(loadArticle(true)) : null;
  }, [slug, location]);
  const logOutHandler = () => {
    dispatch(isLoggedIn(false));
    localStorage.clear();
  };
  return (
    <>
      <header className={classes.header}>
        <Link to="/articles" className={classes.title + ' ' + classes.logo}>
          RealWorld Blog
        </Link>
        {log ? (
          <div className={classes.flex}>
            <NavLink to="/new-article">
              <button className={classes.sign}>Create article</button>
            </NavLink>
            <NavLink style={{ textDecoration: 'none' }} to="profile">
              <div style={{ marginRight: 30 }} className={classes.flex}>
                <div className={classes.name}>{user.username}</div>
                <img
                  className={classes.avatar}
                  src={user.image ? user.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                />
              </div>
            </NavLink>
            <button style={{ borderColor: '#000000BF' }} className={classes.sign}>
              <Link onClick={logOutHandler} style={{ textDecoration: 'none', color: 'inherit', padding: 15 }} to="/">
                Log Out
              </Link>
            </button>
          </div>
        ) : (
          <div className={classes.sign__group}>
            <NavLink to="/sign-in">
              <button className={classes.sign}>Sign In</button>
            </NavLink>
            <NavLink to="/sign-up">
              <button className={classes.sign}>Sign Up</button>
            </NavLink>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
}
