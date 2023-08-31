import moment from 'moment'

export default (date: Date) => {
  let thisMoment = moment(date).format('YYYY-MM-DD 00:00:00')
  return new Date(thisMoment)
}