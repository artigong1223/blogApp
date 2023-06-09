import axios from 'axios';

export default class ArticleStoreService {
  url = 'https://blog.kata.academy/api';
  getArticles = async (page) => {
    const response = await axios.get(`${this.url}/articles?offset=${page}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };
  postArticles = async (title, description, body, tags) => {
    const response = await axios.post(
      `${this.url}/articles`,
      {
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tags,
        },
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  };
  getArticleSlug = async (slug) => {
    const response = await axios.get(`${this.url}/articles/${slug}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };
  postArticleSlug = async (slug, title, description, body, tags) => {
    const response = await axios.put(
      `${this.url}/articles/${slug}`,
      {
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tags,
        },
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  };
  deleteArticleSlug = async (slug) => {
    const response = await axios.delete(`${this.url}/articles/${slug}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  };
  postUserReg = async (username, email, password) => {
    const response = await axios.post(
      `${this.url}/users`,
      {
        user: {
          username: username,
          email: email,
          password: password,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  };
  getUserReg = async () => {
    const response = await axios.get(`${this.url}/user`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.user;
  };
  getUserLogin = async (email, password) => {
    const response = await axios.post(
      `${this.url}/users/login`,
      {
        user: {
          email: email,
          password: password,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.user;
  };
  putUserUpdate = async (username, email, password, image) => {
    const response = await axios.put(
      `${this.url}/user`,
      {
        user: {
          username: username,
          email: email,
          password: password,
          image: image,
        },
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  };
  postFavoritesReg = async (slug) => {
    const response = await axios.post(
      `${this.url}/articles/${slug}/favorite`,
      {
        body: '',
      },

      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.article;
  };
  deleteFavoritesReg = async (slug) => {
    const response = await axios.delete(`${this.url}/articles/${slug}/favorite`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.article;
  };
}
