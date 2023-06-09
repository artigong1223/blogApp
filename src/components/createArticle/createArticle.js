import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ArticleStoreService from '../../service/articleList-api';
import { load } from '../../redux/slice';

import classes from './createArticle.module.scss';

export default function CreateArticle() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const logged = useSelector((state) => state.slice.logged);
  const articlesLink = '/articles';
  const signInLink = '/sign-in';
  useEffect(() => {
    !logged ? history(signInLink) : null;
  }, []);
  const api = new ArticleStoreService();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });
  const onSubmit = (data) => {
    api
      .postArticles(
        data.title,
        data.desc,
        data.text,
        data.tags.map((g) => g.tag)
      )
      .then((g) => {
        dispatch(load(true));
        g.status === 200 ? history(articlesLink) : null;
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <div className={classes.article__one}>
        <div style={{ minHeight: '100%' }} className={classes.article__one_card}>
          <div className={classes.title__new_article_card}>Create new article</div>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form__new__article}>
            <label className={classes.title__new__article}>
              Title
              <input
                {...register('title', {
                  required: 'Required field',
                })}
                className={classes.title__new__article__input}
                placeholder="Title"
              />
              <div className={classes.input__error}>{errors?.title && errors?.title?.message}</div>
            </label>
            <label className={classes.description__new__article}>
              Short description
              <input
                {...register('desc', {
                  required: 'Required field',
                })}
                className={classes.description__new__article__input}
                placeholder="Title"
              />
              <div className={classes.input__error}>{errors?.desc && errors?.desc?.message}</div>
            </label>
            <label className={classes.text__new__article}>
              Text
              <textarea
                {...register('text', {
                  required: 'Required field',
                })}
                className={classes.text__new__article__input}
                placeholder="Text"
              />
              <div className={classes.input__error}>{errors?.text && errors?.text?.message}</div>
            </label>
            <div className={classes.tags__new__article}>
              Tags
              {fields.map((field, index) => {
                return (
                  <div className={classes.tag__new__article} key={field.id}>
                    <label>
                      <input
                        {...register(`tags.${index}.tag`)}
                        className={classes.tag__new__article__input}
                        placeholder="Tag"
                      />
                      <Button onClick={() => remove(index)} className={classes.tag__new__article__btn__del} danger>
                        Delete
                      </Button>
                      <Button onClick={() => append({ tag: '' })} className={classes.tag__new__article__btn__add}>
                        Add tag
                      </Button>
                    </label>
                  </div>
                );
              })}
              {fields.length === 0 ? (
                <Button
                  style={{ marginLeft: 0, marginTop: 5 }}
                  onClick={() => append({ tag: '' })}
                  className={classes.tag__new__article__btn__add}
                >
                  Add tag
                </Button>
              ) : null}
            </div>
            <input className={classes.btn__new__article} type="submit" value="Send" />
          </form>
        </div>
      </div>
    </div>
  );
}
