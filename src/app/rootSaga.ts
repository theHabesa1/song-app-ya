// src/app/rootSaga.ts
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchSongsAsync, setSongs } from './songsSlice';
import axios from 'axios';

function* fetchSongs(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, 'https://song-back-addis.onrender.com/songs');
    yield put(setSongs(response.data));
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

function* watchFetchSongs() {
  yield takeEvery(fetchSongsAsync.pending.type, fetchSongs);
}

export default function* rootSaga() {
  yield all([watchFetchSongs()]);
}
