import moment from 'moment'
import getRequestEndtime from './getRequestEndtime'

export default () => {
  let now = new Date()
  let name = moment(now).format('HH:mm')
  console.log('name', name)
  let millisecond = (Number(name.split(':')[0]) * 60 * 60 + Number(name.split(':')[1]) * 60) * 1000
  return { name: name, millisecond: millisecond, requestEndTime: getRequestEndtime(), disable: false }
}
