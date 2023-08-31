import backToMidNight from './backToMidNight'

export default () => {
  let todayMidNight = backToMidNight(new Date())
  let requestEndTime = todayMidNight.getTime() + (60 * 60 * 1000 * 24 - 1000)
  return requestEndTime
}
