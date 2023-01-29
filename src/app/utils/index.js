import moment from 'moment';
import numeral from 'numeral';
import { isNil } from 'lodash';

export const selectApiData = (data) => data?.data?.data

export const toDateStr = (date, format = 'DD/MM/YYYY') => {
  return moment(date).format(format)
}

export const formatNAV = (NAV, format = '0,0.[00]') => {
  return numeral(NAV).format(format)
}

export const formatNumber = (NAV, format = '0,0.[00]') => {
  return numeral(NAV).format(format)
}

export const NAVColorClass = (nav) => {
  return isNil(nav) ? '' : (nav > 0 ? 'text-green-400' : 'text-red-400')
}