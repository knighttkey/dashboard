export interface I_TimeInfo {
  year: number
  month: number
  day: number
  week: number
  hour: number
  minute: number
}
export interface I_RecordInfo {
  data: {
    tagValue: unknown
  }
  time: I_TimeInfo
}
const date = new Date()
/**
 * 將時間格式轉換成毫秒
 * @param timeFormat - 時間格式
 * @returns 毫秒
 */

  export function timeFormatToMs(timeFormat: I_TimeInfo, timeLevel:string) {
    // console.log('timeFormat', timeFormat)
    const { year, month, day, hour, minute } = timeFormat
    // console.log('timeLevel', timeLevel)
    switch (timeLevel) {
      case 'year':
        date.setFullYear(year)
        date.setMonth(0)
        date.setDate(0)
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        break;
      case 'month':
        date.setFullYear(year)
        date.setMonth(month - 1)
        date.setDate(0)
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        break;
      case 'week':
        date.setFullYear(year)
        date.setMonth(month - 1)
        date.setDate(day)
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        break;
      case 'day':
        date.setFullYear(year)
        date.setMonth(month - 1)
        date.setDate(day)
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        break;
      case 'hour':
        date.setFullYear(year)
        date.setMonth(month - 1)
        date.setDate(day)
        date.setHours(hour)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        break;
      case 'minute':
        date.setFullYear(year)
        date.setMonth(month - 1)
        date.setDate(day)
        date.setHours(hour)
        date.setMinutes(minute)
        date.setSeconds(0)
        date.setMilliseconds(0)
        break;
      default:
        date.setFullYear(year)
        date.setMonth(month - 1)
        date.setDate(day)
        date.setHours(hour)
        date.setMinutes(minute)
        date.setSeconds(0)
        date.setMilliseconds(0)
        break;
    }

    return date.getTime()
  }
  
  /**
   * 將時間格式轉換成毫秒
   * @param records - 歷史紀錄
   * @returns
   */
  // export function recordsFormat(records: I_RecordInfo[]) {
  //   return records.map((record) => {
  //     return {
  //       ...record,
  //       time: timeFormatToMs(record.time),
  //     }
  //   })
  // }
  
  //以上把資料變成
  // [
  //   {
  //     data: {
  //       tagValue: 1
  //     },
  //     time: 1629781200000
  //   },
  //   {
  //     data: {
  //       tagValue: 2
  //     },
  //     time: 1629784800000
  //   },
  //]
  
