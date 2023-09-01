import roundTo from './roundTo'

export default (d: number) => {
  //依據風向的角度數據算出風向方位

  //英文語系風向方位
  let directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ]
  // 中文語系風向方位
  // let directions = ['北','北北東', '東北','東北東', '東','東南東', '東南','南南東', '南','南南西', '西南','西南西', '西','西北西', '西北','北北西']

  // d += 22.5   //八個方向
  d += 11.25 //十六個方向

  if (d < 0) d = 360 - (Math.abs(d) % 360)
  else d = d % 360

  // let w = roundTo(d / 45, 0) //八個方向
  let w = roundTo(d / 22.5, 0) //十六個方向
  return `${directions[w]}`
}
