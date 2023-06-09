import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { invalid, isLoggedIn } from '../../redux/slice';
import ArticleStoreService from '../../service/articleList-api';

import classes from './sign-in.module.scss';

export default function SignIn() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const inv = useSelector((state) => state.slice.inv);
  const logged = useSelector((state) => state.slice.logged);
  const api = new ArticleStoreService();
  const signUpLink = '/sign-up';
  const articlesLink = '/articles';
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    api
      .getUserLogin(email, password)
      .then((g) => {
        dispatch(invalid([]));
        localStorage.setItem('token', g.token);
        dispatch(isLoggedIn(true));
      })
      .catch((g) => dispatch(invalid(g.response.data.errors)));
  };
  useEffect(() => {
    if (logged) {
      history(articlesLink);
    }
  });
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.sign__flex}>
        <div style={{ minHeight: '32vh' }} className={classes.sign__card}>
          <div className={classes.sign__title}>Sign In</div>
          <label>
            <div className={classes.input__title}>Email address</div>
            <input
              {...register('email', {
                required: 'Enter your email address',
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                  message: 'Please enter a valid email address.',
                },
              })}
              className={classes.input}
              placeholder="Email address"
            />
            <div className={classes.input__error}>{errors?.email && errors?.email?.message}</div>
          </label>
          <label>
            <div className={classes.input__title}>Password</div>
            <input
              {...register('password', {
                required: 'Enter password.',
              })}
              type="password"
              className={classes.input}
              placeholder="Password"
            />
            {inv['email or password'] ? (
              <div className={classes.input__error}>Incorrect email address or password</div>
            ) : null}
            <div className={classes.input__error + ' ' + classes.last}>
              {errors?.password && errors?.password?.message}
            </div>
          </label>
          <input className={classes.btn} type="submit" />
          <div className={classes.sign__desc}>
            Don’t have an account?{' '}
            <Link to={signUpLink} className={classes.sign__link}>
              Sign Up
            </Link>
            .
          </div>
        </div>
      </form>
    </div>
  );
}
