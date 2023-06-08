import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { userReg, isLoggedIn } from '../../redux/slice';
import ArticleStoreService from '../../service/articleList-api';

import classes from './sign-up.module.scss';

function SignUp() {
  const [taken, setTaken] = useState([]);
  const history = useNavigate();
  const dispatch = useDispatch();
  const api = new ArticleStoreService();
  const newUserToken = useSelector((g) => g.slice.user.token);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { username, email, password } = data;
    if (taken !== []) {
      api
        .postUserReg(username, email, password)
        .then((g) => {
          const token = g.user.token;
          setTaken([]);
          dispatch(userReg({ username, email, password, token }));
          localStorage.setItem('token', token);
        })
        .catch((g) => setTaken([g.response.data.errors.username, g.response.data.errors.email]));
    }
  };
  const password = watch('password');
  useEffect(() => {
    if (newUserToken === localStorage.getItem('token')) {
      dispatch(isLoggedIn(true));
      history('/');
    }
  }, [newUserToken]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.sign__flex}>
        <div className={classes.sign__card}>
          <div className={classes.sign__title}>Create new account</div>
          <label>
            <div className={classes.input__title}>Username</div>
            <input
              style={errors.username ? { borderColor: '#f5222d', outline: '#f5222d' } : null}
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
            <div className={classes.input__error}>{errors?.username && errors?.username?.message}</div>
            {taken[0] ? <div className={classes.input__error}>Username is already taken.</div> : null}
          </label>
          <label>
            <div className={classes.input__title}>Email address</div>
            <input
              style={errors.email ? { borderColor: '#f5222d', outline: '#f5222d' } : null}
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
            {taken[1] ? <div className={classes.input__error}>Email is already taken.</div> : null}
          </label>
          <label>
            <div className={classes.input__title}>Password</div>
            <input
              style={errors.password ? { borderColor: '#f5222d', outline: '#f5222d' } : null}
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
              placeholder="Password"
            />
            <div className={classes.input__error}>{errors?.password && errors?.password?.message}</div>
          </label>
          <label>
            <div className={classes.input__title}>Repeat Password</div>
            <input
              style={errors.RepeatPassword ? { borderColor: '#f5222d', outline: '#f5222d' } : null}
              {...register('RepeatPassword', {
                required: 'Passwords must match.',
                validate: (value) => value === password || 'Passwords must match',
              })}
              type="password"
              className={classes.input}
              placeholder="Password"
            />
            <div className={classes.input__error + ' ' + classes.last}>
              {errors?.RepeatPassword && errors?.RepeatPassword?.message}
            </div>
          </label>
          <Checkbox style={{ marginTop: 25 }} required className={classes.checkbox}>
            I agree to the processing of my personal information
          </Checkbox>
          <input className={classes.btn} value="Create" type="submit" />
          <div className={classes.sign__desc}>
            Already have an account?{' '}
            <Link to="/sign-in" className={classes.sign__link}>
              Sign In
            </Link>
            .
          </div>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
