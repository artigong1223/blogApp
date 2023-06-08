import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import ArticleStoreService from '../../service/articleList-api';
import { userReg } from '../../redux/slice';

import classes from './profile.module.scss';

export default function Profile() {
  const [taken, setTaken] = useState([]);
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const history = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const url = watch('url');
  const api = new ArticleStoreService();
  const checkImgSrc = (src) => {
    const img = new Image();
    img.onload = function () {
      setImage('valid');
    };
    img.onerror = function () {
      setImage('unvalid');
    };
    img.src = src;
  };
  checkImgSrc(url);
  const onSubmit = (data) => {
    const { username, email, password, url } = data;
    if (taken !== []) {
      api
        .putUserUpdate(username, email, password, url)
        .then((g) => {
          const token = g.data.user.token;
          setTaken([]);
          dispatch(userReg({ username, email, password, token, url }));
          localStorage.setItem('token', token);
          history('/');
        })
        .catch((g) => {
          setTaken([g.response.data.errors.username, g.response.data.errors.email]);
        });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.sign__flex}>
        <div style={{ minHeight: '40vh' }} className={classes.sign__card}>
          <div className={classes.sign__title}>Edit Profile</div>
          <label>
            <div className={classes.input__title}>Username</div>
            <input
              {...register('username', {
                required: 'Enter preferred name',
                maxLength: {
                  value: 20,
                  message: 'Maximum 20 characters',
                },
                minLength: {
                  value: 3,
                  message: 'Minimum 3 characters',
                },
              })}
              className={classes.input}
              placeholder="Username"
            />
            {taken[0] ? <div className={classes.input__error}>Username is already taken.</div> : null}
            <div className={classes.input__error}>{errors?.username && errors?.username?.message}</div>
          </label>
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
            {taken[1] ? <div className={classes.input__error}>Email is already taken.</div> : null}
            <div className={classes.input__error}>{errors?.email && errors?.email?.message}</div>
          </label>
          <label>
            <div className={classes.input__title}>New password</div>
            <input
              {...register('password', {
                required: 'Enter password.',
                maxLength: {
                  value: 40,
                  message: 'Maximum 40 characters',
                },
                minLength: {
                  value: 6,
                  message: 'Minimum 6 characters',
                },
              })}
              type="password"
              className={classes.input}
              placeholder="New password"
            />
            <div className={classes.input__error}>{errors?.password && errors?.password?.message}</div>
          </label>
          <label>
            <div className={classes.input__title}>Avatar image (url)</div>
            <input
              {...register('url', {
                validate: () => image === 'valid' || url === '' || 'Link is not an image.',
                pattern: {
                  value: /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i,
                  message: 'Please enter a valid url address.',
                },
              })}
              className={classes.input}
              placeholder="Avatar image"
            />
            <div className={classes.input__error}>{errors?.url && errors?.url?.message}</div>
          </label>
          <input style={{ marginTop: 20, marginBottom: 20 }} className={classes.btn} value="Create" type="submit" />
        </div>
      </form>
    </div>
  );
}
