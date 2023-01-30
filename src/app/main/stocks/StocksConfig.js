import QuyETFList from './QuyETFList/QuyETFList';
import Home from './Home/Home';
import QuyMoList from './QuyMoList/QuyMoList';
import QuyMoDetail from './QuyMoDetail/QuyMoDetail';
import QuyETFDetail from './QuyETFDetail/QuyETFDetail';

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
      element: <QuyMoList />,
    },
    {
      path: 'quy-mo/view/:id',
      element: <QuyMoDetail />,
    },
    {
      path: 'quy-etf',
      element: <QuyETFList />,
    },
    {
      path: 'quy-etf/view/:code',
      element: <QuyETFDetail />,
    },
    {
      path: 'so-sanh',
      element: <Home />,
    },
    {
      path: 'dau-tu',
      element: <Home />,
    },
  ],
};

export default ExampleConfig;
