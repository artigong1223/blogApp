import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [],
  inv: [],
  page: 0,
  total: 0,
  user: {},
  logged: false,
  loading: true,
  loadingArticle: true,
  error: false,
  errorArticle: false,
};
const slice = createSlice({
  name: 'ARTICLE',
  initialState,
  reducers: {
    articlesLoaded(state, action) {
      state.articles = action.payload.articles;
      state.total = action.payload.articlesCount;
    },
    articlesPage(state, action) {
      state.page = action.payload;
      state.loading = true;
    },
    invalid(state, action) {
      state.inv = action.payload;
    },
    userReg(state, action) {
      state.user = action.payload;
    },
    isLoggedIn(state, action) {
      state.logged = action.payload;
    },
    loadArticle(state, action) {
      state.loadingArticle = action.payload;
    },
    load(state, action) {
      state.loading = action.payload;
    },
    errorsLoad(state, action) {
      state.error = action.payload;
    },
    errorsArticle(state, action) {
      state.errorArticle = action.payload;
    },
  },
});

export const {
  articlesLoaded,
  articlesPage,
  userReg,
  invalid,
  isLoggedIn,
  loadArticle,
  load,
  errorsLoad,
  errorsArticle,
} = slice.actions;
export default slice.reducer;
