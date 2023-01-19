import i18next from 'i18next';

import ETF from './ETF';
import Home from './Home';
import QuyMo from './QuyMo';

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'home',
      element: <Home />,
    },
    {
      path: 'quy-mo',
      element: <QuyMo />,
    },
    {
      path: 'quy-etf',
      element: <ETF />,
    },
    {
      path: 'so-sanh',
      element: <ETF />,
    },
    {
      path: 'dau-tu',
      element: <ETF />,
    },
  ],
};

export default ExampleConfig;
