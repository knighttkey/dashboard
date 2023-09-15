export interface I_logVar {
  name: string
  version: string
}
/**
 * 輸出版號
 * @param {*} param0 版號資訊
 * @param {*} _color 背影色
 * @param {*} _txtColor 文字色
 */
export const logVersion = ({ name, version }: I_logVar, _color = '#35495e', _txtColor = '#fff') => {
  console.log(
    `🤘%c ${name} %c v${version} %c`,
    `background:${_color} ; padding: 1px; border-radius: 3px 0 0 3px;  color: ${_txtColor}`,
    `background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff`,
    'background:transparent',
  )
}
