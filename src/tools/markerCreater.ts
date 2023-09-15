// @ts-nocheck
import {
  Viewer,
  Cartesian3,
  DistanceDisplayCondition,
  Cartesian2,
  PrimitiveCollection,
  Primitive,
} from 'cesium'

interface marker {
  type: string
  title: string
  format: string
  pos: { longitude: number; latitude: number; altitude?: number }
  slopeLevel?: number
  val: number
}

//marker type 對應的標籤色碼
export default (viewer: Viewer, markerList: marker[]) => {
  //依據使用者自定義斜率等級，取得創建指標線canvas的寬度及高度
  const getLine = (slopeLevel: number) => {
    switch (slopeLevel) {
      case 0:
        return { offsetX: 5, offsetY: -100 }
      case 1:
        return { offsetX: 5, offsetY: -90 }
      case 2:
        return { offsetX: 10, offsetY: -80 }
      case 3:
        return { offsetX: 20, offsetY: -70 }
      case 4:
        return { offsetX: 30, offsetY: -60 }
      case 5:
        return { offsetX: 40, offsetY: -50 }
      case 6:
        return { offsetX: 50, offsetY: -50 }
      case 7:
        return { offsetX: 60, offsetY: -50 }
      case 8:
        return { offsetX: 70, offsetY: -50 }
      case 9:
        return { offsetX: 80, offsetY: -50 }
      case 10:
        return { offsetX: 90, offsetY: -50 }
      default:
        return { offsetX: 5, offsetY: -100 }
    }
  }

  //多文字自動換行
  const canvasTextAutoLine = (
    str: string,
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    initX: number,
    initY: number,
    lineHeight: number,
  ) => {
    var lineWidth = 0
    var lastSubStrIndex = 0
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width
      if (lineWidth > canvasWidth - initX) {
        ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY)
        initY += lineHeight
        lineWidth = 0
        lastSubStrIndex = i
      }
      if (i === str.length - 1) {
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY)
      }
    }
  }

  //多文字預先計算換行行數
  const textLineCounter = (
    str: string,
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    initX: number,
    initY: number,
    lineHeight: number,
  ) => {
    var lineWidth = 0
    let lineCount = 0
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width
      if (lineWidth > canvasWidth - initX) {
        initY += lineHeight
        lineWidth = 0
        lineCount++
      }
      if (i === str.length - 1) {
        lineCount++
      }
    }
    return lineCount
  }

  const makersCollection = new PrimitiveCollection()

  markerList.forEach((item, index) => {
    const position = Cartesian3.fromDegrees(item.pos.longitude, item.pos.latitude)

    //文字標籤貼 Canvas
    const canvasPanel = document.createElement('canvas')
    const ctxFont = canvasPanel.getContext('2d')
    const ctxStick = canvasPanel.getContext('2d')
    const ctxBack = canvasPanel.getContext('2d')
    if (!ctxFont) return
    if (!ctxStick) return
    if (!ctxBack) return
    let offsetX
    let offsetY
    if (item.slopeLevel) {
      offsetX = getLine(item.slopeLevel).offsetX
      offsetY = getLine(item.slopeLevel).offsetY
    } else {
      offsetX = getLine(0).offsetX
      // offsetY = getLine(0).offsetY
      offsetY = -30
    }

    //計算 marker title 文字所佔據寬度px
    ctxFont.font = '12px monospace'
    let modifiedTitle = item.title
    if (modifiedTitle.length > 60) {
      modifiedTitle = item.title.substring(0, 59) + '...'
    } else {
      modifiedTitle = item.title
    }
    const textWidth = ctxFont.measureText(modifiedTitle).width
    const testingWidth =
      modifiedTitle.length > 10 ? (textWidth <= 200 ? textWidth : 200) : textWidth + 28
    const lineCount = textLineCounter(modifiedTitle, ctxFont, testingWidth, 20, 17, 14)
    const testingHeight = lineCount > 1 ? 16 + lineCount * 14 : 24
    canvasPanel.width = testingWidth + Math.abs(lineCount - 1) * 10
    canvasPanel.height = testingHeight
    ctxBack.fillStyle = '#004e6695'

    if (lineCount > 1) {
      ctxBack.fillRect(
        0,
        0,
        testingWidth + Math.abs(lineCount - 1) * 10,
        // testingWidth +  20,
        testingHeight,
      )
    } else {
      ctxBack.fillRect(0, 0, testingWidth, testingHeight)
    }

    ctxFont.font = '12px monospace'
    ctxFont.fillStyle = '#42c6fc'
    if (lineCount > 1) {
      canvasTextAutoLine(modifiedTitle, ctxFont, testingWidth, 20, 18, 14)
    } else {
      canvasTextAutoLine(modifiedTitle, ctxFont, testingWidth, 20, 16, 14)
    }
    ctxStick.fillStyle = getColorCode(item.val, 80)
    ctxStick.fillRect(0, 0, 13, testingHeight)

    var my_gradient = ctxFont.createLinearGradient(0, 0, 0, 120)
    // #004e6690  #546c7890
    my_gradient.addColorStop(0, '#004e6690')
    my_gradient.addColorStop(1, '#546c7890')
    ctxFont.fillStyle = my_gradient

    //文字標籤貼 看板
    const maker = viewer.entities.add({
      position: position,
      billboard: {
        image: canvasPanel,
        pixelOffset: new Cartesian2(
          lineCount > 1 ? offsetX + testingWidth * 0.5 + 3 : offsetX + testingWidth * 0.5 - 7,
          offsetY - testingHeight * 0.5 + 1,
        ),
        // distanceDisplayCondition: new DistanceDisplayCondition(0, 5e6),
      },
    })
    makersCollection.add(maker)

    //指標線 Canvas
    const canvasLine = document.createElement('canvas')
    canvasLine.width = Math.abs(offsetX)
    canvasLine.height = Math.abs(offsetY)
    const ctxLine = canvasLine.getContext('2d')
    if (!ctxLine) return
    ctxLine.fillStyle = '#00ff0030'
    ctxLine.beginPath()
    ctxLine.lineWidth = 1.5
    ctxLine.strokeStyle = getColorCode(item.val, 80)
    ctxLine.moveTo(offsetX < 0 ? -offsetX : 0, offsetY < 0 ? -offsetY : 0)
    ctxLine.lineTo(offsetX < 0 ? 0 : offsetX, offsetY < 0 ? 0 : offsetY)
    ctxLine.stroke()

    //指標線 Canvas 看板
    const line = viewer.entities.add({
      position: position,
      billboard: {
        image: canvasLine,
        pixelOffset: new Cartesian2(offsetX * 0.5, offsetY * 0.5),
        // distanceDisplayCondition: new DistanceDisplayCondition(0, 5e6),
      },
    })
    makersCollection.add(line)
  })
  //新增一個 showOff 方法
  //@ts-ignore
  makersCollection.showOff = (_off: boolean) => {
    //@ts-ignore
    makersCollection._primitives.forEach((element: Primitive) => {
      element.show = _off
    })
  }
  return makersCollection
}

/**
 * 它接受 0 到 120 之间的数字，并返回颜色代码
 * @param {number} value - 要转换为颜色代码的值。
 * @returns 颜色代码。
 */
function getColorCode(value: number, max: number = 150) {
  /* 将数字转换为颜色代码的函数。 */
  if (value > max) value = max
  // 將0~120的值轉換為0~255的數值
  var redValue = Math.round((255 * value) / max)
  var greenValue = 255 - Math.round((255 * value) / max)
  // 將紅綠色值轉換為16進制碼
  var redHex = redValue.toString(16)
  var greenHex = greenValue.toString(16)
  // 如果紅綠色值的16進制碼只有1位，補0
  if (redHex.length === 1) {
    redHex = '0' + redHex
  }
  if (greenHex.length === 1) {
    greenHex = '0' + greenHex
  }
  // 返回對應的色碼
  return '#' + redHex + greenHex + '00'
}
