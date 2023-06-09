import React, { useState } from 'react';
import { Tag } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ArticleStoreService from '../../service/articleList-api';

import classes from './article.module.scss';

export default function Article(props) {
  const api = new ArticleStoreService();
  const logged = useSelector((state) => state.slice.logged);
  const [valid, setValid] = useState('');
  const [count, setCount] = useState(props.item.favoritesCount);
  const [countBool, setCountBool] = useState(props.item.favorited);
  const checkImgSrc = (src) => {
    const img = new Image();
    img.onload = function () {
      setValid('valid');
    };
    img.onerror = function () {
      setValid('unvalid');
    };
    img.src = src;
  };
  const favoritesReg = () => {
    logged
      ? countBool
        ? api
            .deleteFavoritesReg(props.item.slug)
            .then((g) => {
              setCountBool(g.favorited);
              setCount(count - 1);
            })
            .catch((e) => console.log(e, 'like-true'))
        : api
            .postFavoritesReg(props.item.slug)
            .then((g) => {
              setCountBool(g.favorited);
              setCount(count + 1);
            })
            .catch((e) => console.log(e, 'like-false'))
      : null;
  };
  checkImgSrc(props.item.author.image);
  return (
    <div className={classes.article}>
      <div className={classes.title__flex}>
        <Link to={`/articles/${props.item.slug}`} className={classes.article__title}>
          {props.item.title}
        </Link>
        <HeartFilled
          onSubmit={(e) => e.preventDefault()}
          onClick={favoritesReg}
          style={{ opacity: 0.5, color: countBool ? '#ff0707' : '#000000' }}
          twoToneColor="#000000"
        />
        <div className={classes.heart__count}>{count}</div>
      </div>
      {props.item.tagList.map((g, i) => {
        return (
          <Tag key={i} className={classes.tag}>
            {g}
          </Tag>
        );
      })}
      <div className={classes.article__subtitle}>{props.item.description}</div>
      <div className={classes.profile}>
        <div>
          <div className={classes.name}>{props.item.author.username}</div>
          <div className={classes.date}>{moment(props.item.createdAt).format('MMMM D, YYYY')}</div>
        </div>
        <img
          className={classes.avatar}
          src={
            valid === 'valid' ? props.item.author.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'
          }
        />
      </div>
    </div>
  );
}
