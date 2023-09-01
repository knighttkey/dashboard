export interface SimpleWeatherType {
  dt: number //時間戳，單位為'秒數'
  clouds?: number //雲量百分比
  coord?: { lon: number; lat: number } // 經緯度
  feels_like: number //體感溫度
  temp: number //溫度
  temp_min?: number //最低溫
  temp_max?: number //最高溫
  pressure?: number //氣壓
  humidity: number //濕度
  precipitation?: {
    value: number //降水量
    mode: string //降水型態(rain / snow)
  }
  city_name: string //城市名
  country?: string //國家
  sunrise?: number //日出時間戳(單位：秒)
  sunset?: number //日落時間戳(單位：秒)
  timezone?: number //時區代碼
  visibility?: number //能見度
  weather: {
    id: number //天氣狀態id //https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
    main: string //天氣狀態
    description: string //天氣狀態描述
    icon: string //天氣狀態圖標
  }
  wind: {
    speed: number //風速
    deg: number //風向
    gust?: number //陣風風速
  }
}
