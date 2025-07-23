import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import {IntlProvider} from 'react-intl';

import { App } from './modules/app/index.js';
import {initReactIntl} from './i18n';


const {locale, messages} = initReactIntl();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <IntlProvider locale={locale} messages={messages}>
        <App />
      </IntlProvider>
    </BrowserRouter>
  </StrictMode>
)
