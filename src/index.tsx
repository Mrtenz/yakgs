import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './components/App';
import * as css from './scss/index.scss';
import { ConnectedRouter } from 'react-router-redux';
import { createMemoryHistory } from 'history';
import { PersistGate } from 'redux-persist/integration/react';

// Inject the YAKGS element into the page
let yakgs = document.getElementById('yakgs');
if (!yakgs) {
  const footerLinks = document.getElementById('footerLinks');
  if (footerLinks) {
    footerLinks.innerHTML += ' | ';

    const link = document.createElement('a');
    link.href = '#';
    link.innerText = 'YAKGS';
    link.onclick = toggle;
    footerLinks.appendChild(link);

    yakgs = document.createElement('div');
    yakgs.id = 'yakgs';
    document.body.appendChild(yakgs);

    const style = document.createElement('style');
    style.appendChild(document.createTextNode('' + css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }
}

let visible = false;

function toggle(): void {
  if (yakgs) {
    if (visible) {
      yakgs.classList.remove('visible');
    } else {
      yakgs.classList.add('visible');
    }
    visible = !visible;
  }
}

const history = createMemoryHistory();
const { store, persistor } = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  yakgs
);
