import moment from 'moment'
import backToMidNight from './backToMidNight'

export default () => {
  let now = new Date()
  let name = moment(now).format('HH:mm')
  console.log('name', name)
  let todayMidNight = backToMidNight(new Date())
  console.log('todayMidNight', todayMidNight)
  console.log('todayMidNight_ millisecond', todayMidNight.getTime())
  console.log('todayMidNight_ millisecond_endTime', todayMidNight.getTime() + (60 * 60 * 1000 * 24 - 1000))
  let millisecond = 60 * 60 * 1000 * 24 - 1000
  console.log('+++++++++++++++++millisecond', millisecond)
  return { name: name, millisecond: millisecond, disable: false }
}
