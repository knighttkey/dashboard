export default (dataList:ChartData[]) => {
  const valueArrayList = dataList.map((i) => {
    return i.data
  })

  let singleMax = valueArrayList.map((listItem) => {
    const innerMax = Math.max.apply(null, listItem)
    return innerMax
  })
  let max = Math.max.apply(null, singleMax)
  let singleMin = valueArrayList.map((listItem) => {
    const innerMin = Math.min.apply(null, listItem)
    return innerMin
  })
  let min = Math.min.apply(null, singleMin)
  // console.log('min', min)
  return { max: max, min: min }
}