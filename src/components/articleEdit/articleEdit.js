import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

import ArticleStoreService from '../../service/articleList-api';

import classes from './articleEdit.module.scss';

export default function ArticleEdit() {
  const history = useNavigate();
  useEffect(() => {
    !localStorage.getItem('token') ? history('/sign-in') : null;
  }, []);
  const api = new ArticleStoreService();
  const { slug } = useParams();
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
      .postArticleSlug(
        slug,
        data.title,
        data.desc,
        data.text,
        data.tags.map((g) => g.tag)
      )
      .then((g) => (g.status === 200 ? history('/') : null))
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <div className={classes.article__one}>
        <div style={{ minHeight: '100%' }} className={classes.article__one_card}>
          <div className={classes.title__new__article__card}>Edit article</div>
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
