import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Spin, Alert } from 'antd';
import moment from 'moment';

import { articlesLoaded, articlesPage, load, errorsLoad } from '../../redux/slice';
import Article from '../article/article';
import ArticleStoreService from '../../service/articleList-api';

import classes from './articleList.module.scss';

export default function ArticleList() {
  const api = new ArticleStoreService();
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.slice.articles).flat();
  const total = Math.floor(useSelector((state) => state.slice.total) / 4);
  const page = useSelector((state) => state.slice.page);
  const loading = useSelector((state) => state.slice.loading);
  const error = useSelector((state) => state.slice.error);
  useEffect(() => {
    api
      .getArticles(page)
      .then((g) => {
        dispatch(articlesLoaded(g));
        dispatch(load(false));
      })
      .catch((e) => {
        dispatch(errorsLoad(e.message));
      });
  }, [page]);
  const onPagination = (page) => {
    dispatch(articlesPage((page - 1) * 20));
  };
  return !error ? (
    loading ? (
      <Spin style={{ marginTop: 100 }} tip="Loading" size="large">
        <div className="content" />
      </Spin>
    ) : (
      <div className={classes.article_list}>
        {articles.map((g) => {
          return <Article item={g} key={moment(g.createdAt).format('MMDYYYYhmmss')} />;
        })}
        <Pagination
          className={classes.pagination}
          pageSize={5}
          showSizeChanger={false}
          onChange={onPagination}
          current={page / 20 + 1}
          total={total}
        />
      </div>
    )
  ) : (
    <Alert style={{ width: '80vw', margin: '20px auto' }} message="Error" description={error} type="error" closable />
  );
}
