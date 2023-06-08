import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { HeartFilled } from '@ant-design/icons';
import { Tag, Button, Spin, Alert, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';

import ArticleStoreService from '../../service/articleList-api';
import { loadArticle, errorsArticle } from '../../redux/slice';

import classes from './articleOne.module.scss';

export default function ArticleOne() {
  const api = new ArticleStoreService();
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [item, setItem] = useState({});
  const { slug } = useParams();
  const history = useNavigate();
  const user = useSelector((state) => state.slice.user);
  const error = useSelector((state) => state.slice.errorArticle);
  const articleLoading = useSelector((state) => state.slice.loadingArticle);
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
  !articleLoading ? checkImgSrc(item.author.image) : null;
  useEffect(() => {
    api
      .getArticleSlug(slug)
      .then((g) => {
        Object.keys(item).length === 0 ? setItem(g.article) : null;
        dispatch(errorsArticle(false));
      })
      .catch((e) => dispatch(errorsArticle(e.message)));
    item.slug ? dispatch(loadArticle(false)) : null;
  });
  const favoritesReg = () => {
    item.favorited
      ? api
          .deleteFavoritesReg(item.slug)
          .then((g) => {
            setItem(g);
          })
          .catch((e) => console.log(e, 'like-true'))
      : api
          .postFavoritesReg(item.slug)
          .then((g) => {
            setItem(g);
          })
          .catch((e) => console.log(e, 'like-false'));
  };
  return !error ? (
    articleLoading ? (
      <Spin style={{ marginTop: 100 }} tip="Loading" size="large">
        <div className="content" />
      </Spin>
    ) : (
      <div>
        <div className={classes.article__one}>
          <div className={classes.article__one_card}>
            <div className={classes.title__flex}>
              <Link to="/articles" className={classes.article__title}>
                {item.title}
              </Link>
              <HeartFilled
                onClick={favoritesReg}
                style={{ opacity: 0.5, color: item.favorited ? '#ff0707' : '#000000' }}
              />
              <div className={classes.heart__count}>{item.favoritesCount}</div>
            </div>
            {item.tagList.map((g, i) => {
              return (
                <Tag key={i} className={classes.tag}>
                  {g}
                </Tag>
              );
            })}
            <div className={classes.article_one__desc}>{item.description}</div>
            <ReactMarkdown className={classes.article__desc}>{item.body}</ReactMarkdown>
            <div className={classes.profile}>
              <div>
                <div className={classes.name}>{item.author.username}</div>
                <div className={classes.date}>{moment(item.createdAt).format('MMMM D, YYYY')}</div>
              </div>
              <img
                className={classes.avatar}
                src={
                  image === 'valid' ? item.author.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'
                }
              />
            </div>
            {user.username === item.author.username ? (
              <div className={classes.article__btn_group}>
                <Popconfirm
                  title="Delete the article"
                  description="Are you sure to delete this article?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() =>
                    api
                      .deleteArticleSlug(slug)
                      .then((g) => (g.status === 204 ? history('/') : null))
                      .catch((e) => console.log(e))
                  }
                >
                  <Button className={classes.article__btn_delete} danger>
                    Delete
                  </Button>
                </Popconfirm>
                <Link to="edit">
                  <Button className={classes.article__btn_edit} danger>
                    Edit
                  </Button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  ) : (
    <Alert style={{ width: '80vw', margin: '20px auto' }} message="Error" description={error} type="error" closable />
  );
}
