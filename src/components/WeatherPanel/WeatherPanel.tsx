import { useMemo } from 'react'
import './WeatherPanel.postcss'
import roundTo from './../../tools/roundTo'
import getWindDirection from './../../tools/getWindDirection'
import { SimpleWeatherType } from './weatherType'
import { faker } from "@faker-js/faker";
const defaultLangObj = {
  precipitation: 'Precipitation',
  feelsLike: 'Feels Like',
  wind: 'Wind',
  humidity: 'Humidity',
}
interface langObj {
  precipitation: string
  feelsLike: string
  wind: string
  humidity: string
}
export default (props: {
  weather: SimpleWeatherType //當前天氣資料
  langObj?: langObj // ui語系包，預設為英語，可不填寫
  cityName:string
}) => {
  const { weather, langObj = defaultLangObj, cityName } = props
  const renderHeaderText = useMemo(() => {
    return <div className={`header_text`}>{cityName}</div>
  }, [weather, cityName])
  const renderCenter = useMemo(() => {
    return (
      <div className={`center`}>
        <div className={`temp`}>{roundTo(faker.number.int({ min: 10, max: 40 }), 0)}</div>
        <div className="unit">°</div>
        <div
          className={`weather_icon`}
          style={{ backgroundImage: `url(src/assets/a_icon/${weather.weather.icon}.svg)` }}
        ></div>
      </div>
    )
  }, [weather, cityName])
  const renderBottom = useMemo(() => {
    return (
      <div className={`bottom`}>
        <div className={`value_item`}>
          <div className={`icon precipitation`}></div>
          <div className={`text precipitation`}>
            <div className={`text_1`}>{langObj.precipitation}</div>
            <div className={`text_2`}>
              {weather.precipitation ? weather.precipitation.value : 0} mm
            </div>
          </div>
        </div>
        <div className={`value_item`}>
          <div className={`icon feels_like`}></div>
          <div className={`text feels_like`}>
            <div className={`text_1`}>{langObj.feelsLike}</div>
            <div className={`text_2`}>{roundTo(weather.feels_like, 0)}°C</div>
          </div>
        </div>
        <div className={`value_item`}>
          <div className={`icon wind`}></div>
          <div className={`text wind`}>
            <div className={`text_1`}>{langObj.wind}</div>
            <div className={`text_2`}>{roundTo(weather.wind.speed, 1)}m/s </div>
            <div className={`text_3`}>{getWindDirection(weather.wind.deg)}</div>
          </div>
        </div>
        <div className={`value_item`}>
          <div className={`icon humidity`}></div>
          <div className={`text humidity`}>
            <div className={`text_1`}>{langObj.humidity}</div>
            <div className={`text_2`}>{weather.humidity}%</div>
          </div>
        </div>
      </div>
    )
  }, [weather, langObj])
  return (
    <div className={`detail_panel`}>
      <div className={`inner_wrap`}>
        <div className={`header`}>
          <div className={`menu_btn`}></div>
          {renderHeaderText}
        </div>
        {renderCenter}
        {renderBottom}
      </div>
    </div>
  )
}
