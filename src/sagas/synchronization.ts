import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { ApplicationState } from '../store';
import { LOAD_GAME, SAVE_GAME, TEST_TOKEN } from '../store/synchronization/types';
import { get, patch, post, to } from '../utils/api';
import {
  loadGameFailed,
  loadGameSucceeded,
  saveGameFailed,
  saveGameSucceeded,
  testTokenFailed,
  testTokenSucceeded
} from '../store/synchronization/actions';

const GITHUB_API_ENDPOINT = 'https://api.github.com';

const getToken = (state: ApplicationState) => state.synchronization.token;

/**
 * Data as returned by the Github API. This only contains the fields that are used by YAKGS.
 */
interface Gist {
  id?: string;
  files: {
    [filename: string]: {
      content?: string;
    };
  };
  description: string;
  public: boolean;
}

const getGists = (token: string): Promise<{ error?: Error; data?: Gist[] }> => {
  return to(get<Gist[]>(`${GITHUB_API_ENDPOINT}/gists`, { Authorization: `token ${token}` }));
};

const getGist = (token: string, id: string): Promise<{ error?: Error; data?: Gist }> => {
  return to(get<Gist>(`${GITHUB_API_ENDPOINT}/gists/${id}`, { Authorization: `token ${token}` }));
};

const updateGist = (
  token: string,
  id: string,
  content: string
): Promise<{ error?: Error; data?: Gist }> => {
  return to(
    patch<Gist>(
      `${GITHUB_API_ENDPOINT}/gists/${id}`,
      {
        description: 'Kittens Game Save',
        files: {
          'kittens-game-save': {
            content
          }
        }
      },
      { Authorization: `token ${token}` }
    )
  );
};

const createGist = (token: string, content: string): Promise<{ error?: Error; data?: Gist }> => {
  return to(
    post<Gist>(
      `${GITHUB_API_ENDPOINT}/gists`,
      {
        description: 'Kittens Game Save',
        files: {
          'kittens-game-save': {
            content
          }
        },
        public: false
      },
      { Authorization: `token ${token}` }
    )
  );
};

/**
 * Performs a request to `/gists`, to test if the provided Github Token is valid.
 * @return {SagaIterator}
 */
function* testToken(): SagaIterator {
  const token = yield select(getToken);

  const { error } = yield call(getGists, token);

  if (error) {
    yield put(testTokenFailed());
  } else {
    yield put(testTokenSucceeded());
  }
}

function* loadGame(): SagaIterator {
  const token = yield select(getToken);

  const { error, data } = yield call(getGists, token);

  if (error) {
    yield put(loadGameFailed());
    alert(`Failed to load game: ${error.message}`);
  } else {
    const gist = (data as Gist[]).find(gist => gist.description === 'Kittens Game Save');

    if (!gist || !gist.files['kittens-game-save']) {
      yield put(loadGameFailed());
      alert('Failed to load game: gist not found.');
    } else {
      const { error, data } = yield call(getGist, token, gist.id as string);

      if (error) {
        yield put(loadGameFailed());
        alert(`Failed to load game: ${error.message}`);
      } else {
        const save = (data as Gist).files['kittens-game-save'].content;
        const json = atob(save as string);

        localStorage.setItem('com.nuclearunicorn.kittengame.savedata', json);
        game.load();
        game.update();
        game.render();

        yield put(loadGameSucceeded());
      }
    }
  }
}

function* saveGame(): SagaIterator {
  const token = yield select(getToken);

  const { error, data } = yield call(getGists, token);

  if (error) {
    yield put(saveGameFailed());
    alert(`Failed to save game: ${error.message}`);
  } else {
    // Find previous gist or create a new one
    const gist = (data as Gist[]).find(gist => gist.description === 'Kittens Game Save');

    game.save();
    const save = btoa(localStorage.getItem('com.nuclearunicorn.kittengame.savedata') || '');

    if (gist && gist.id) {
      const { error } = yield call(updateGist, token, gist.id, save);

      if (error) {
        yield put(saveGameFailed());
        alert(`Failed to save game: ${error.message}`);
      } else {
        yield put(saveGameSucceeded());
      }
    } else {
      const { error } = yield call(createGist, token, save);

      if (error) {
        yield put(saveGameFailed());
        alert(`Failed to save game: ${error.message}`);
      } else {
        yield put(saveGameSucceeded());
      }
    }
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(TEST_TOKEN, testToken),
    takeLatest(LOAD_GAME, loadGame),
    takeLatest(SAVE_GAME, saveGame)
  ]);
}
