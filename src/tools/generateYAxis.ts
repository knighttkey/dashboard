export default (minAndMax:{min:number, max:number}) => {
  return { min: minAndMax.max * -0.5, max: minAndMax.max * 1.5 }
}
