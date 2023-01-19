import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'home',
    title: 'Trang chủ',
    type: 'item',
    icon: 'heroicons-outline:view-grid',
    url: 'home'
  },
  {
    id: 'quy_mo',
    title: 'Quỹ mở',
    type: 'item',
    icon: 'heroicons-outline:folder-open',
    url: 'quy-mo'
  },
  {
    id: 'quy_etf',
    title: 'Quỹ ETF',
    type: 'item',
    icon: 'heroicons-outline:office-building',
    url: 'quy-etf'
  },
  {
    id: 'etf',
    title: 'So sánh',
    type: 'item',
    icon: 'heroicons-outline:adjustments',
    url: 'so-sanh'
  },
  {
    id: 'dautu',
    title: 'Đầu tư',
    type: 'item',
    icon: 'heroicons-outline:calendar',
    url: 'dau-tu'
  }
];

export default navigationConfig;
