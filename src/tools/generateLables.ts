import moment from 'moment'
export default (minSec: number, timeLevel: string) => {
  // console.log('minSec', moment(minSec).format('YYYY-MM-DD HH:mm'))
  let format = ''
  // console.log('timeLevel', timeLevel)
  switch (timeLevel) {
    case 'minute':
      format = 'MM/DD HH:mm'
      break
    case 'hour':
      format = 'MM/DD HH'
      break
    case 'day':
      format = 'MM/DD'
      break
    case 'week':
      format = 'MM/DD'
      break
    case 'month':
      format = 'MM'
      break
    case 'year':
      format = 'YYYY'
      break
    default:
      format = 'MM/DD'
      break
  }
  // const res =  moment(minSec).format(format)
  // console.log('+++++++res', res)
  return moment(minSec).format(format)
}
