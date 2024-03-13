import { inputToRGB, rgbToHex, rgbToHsv } from '@ctrl/tinycolor'

/**
 * 根据颜色获取文字应该显示白色或者黑色
 * @param color
 * @returns
 */
export const getTextColor = (color: TColor): string => {
    const rgb = hex2Rgb(color)
    return 0.213 * rgb[0] + 0.715 * rgb[1] + 0.072 * rgb[2] > 180 ? '#000000' : '#FFFFFF'
}
/**
 * 16进制转rgb
 * @param hex
 * @returns
 */
export const hex2Rgb = (hex: TColor): number[] => {
    const sColor = hex.toLowerCase()
    const sColorChange = []
    for (let i = 1; i < 7; i += 2) sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    return sColorChange
}

/**
 * rgb转hex
 * @param rgb
 * @returns
 */
export const rgb2Hex = (rgb: POJO): TColor => {
    const { r, g, b } = rgb
    return `#${rgbToHex(r, g, b, false)}`
}

/**
 * rgb 2 hsv
 * @param rgb
 * @returns
 */
export const rgb2HSV = (rgb: POJO): POJO<number> => {
    const { r, g, b } = rgb
    const hsv = rgbToHsv(r, g, b)
    return {
        h: hsv.h * 360,
        s: hsv.s,
        v: hsv.v
    }
}

/**
 * 根据主题色计算颜色梯度
 * @param color
 */
export const getColorGradient = (color: TColor, isDark: boolean = false): TColor[] => {
    const hueStep: number = 2 //色相阶梯
    const saturationStep = 0.16 // 饱和度阶梯，浅色部分
    const saturationStep2 = 0.05 // 饱和度阶梯，深色部分
    const brightnessStep1 = 0.05 // 亮度阶梯，浅色部分
    const brightnessStep2 = 0.15 // 亮度阶梯，深色部分
    const lightColorCount = 5 // 浅色数量，主色上
    const darkColorCount = 4 // 深色数量，主色下

    //暗色主题颜色映射关系表
    const darkColorMap: POJO<number>[] = [
        {
            index: 7,
            opacity: 0.15
        },
        {
            index: 6,
            opacity: 0.25
        },
        {
            index: 5,
            opacity: 0.3
        },
        {
            index: 5,
            opacity: 0.45
        },
        {
            index: 5,
            opacity: 0.65
        },
        {
            index: 5,
            opacity: 0.85
        },
        {
            index: 4,
            opacity: 0.9
        },
        {
            index: 3,
            opacity: 0.95
        },
        {
            index: 2,
            opacity: 0.97
        },
        {
            index: 1,
            opacity: 0.98
        }
    ]

    const patterns: TColor[] = []

    const pColor = inputToRGB(color)

    const getHue = (hsv: POJO<number>, i: number, light?: boolean) => {
        let hue // 根据色相不同，色相转向不同

        if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
            hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i
        } else {
            hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i
        }
        if (hue < 0) {
            hue += 360
        } else if (hue >= 360) {
            hue -= 360
        }
        return hue
    }

    const getSaturation = (hsv: POJO<number>, i: number, light?: boolean) => {
        // grey color don't change saturation
        if (hsv.h === 0 && hsv.s === 0) {
            return hsv.s
        }

        let saturation

        if (light) {
            saturation = hsv.s - saturationStep * i
        } else if (i === darkColorCount) {
            saturation = hsv.s + saturationStep
        } else {
            saturation = hsv.s + saturationStep2 * i
        } // 边界值修正

        if (saturation > 1) {
            saturation = 1
        } // 第一格的 s 限制在 0.06-0.1 之间

        if (light && i === lightColorCount && saturation > 0.1) {
            saturation = 0.1
        }

        if (saturation < 0.06) {
            saturation = 0.06
        }

        return Number(saturation.toFixed(2))
    }

    const getValue = (hsv: POJO<number>, i: number, light?: boolean) => {
        let value

        if (light) {
            value = hsv.v + brightnessStep1 * i
        } else {
            value = hsv.v - brightnessStep2 * i
        }

        if (value > 1) {
            value = 1
        }

        return Number(value.toFixed(2))
    }

    for (let i = lightColorCount; i > 0; i -= 1) {
        const hsv = rgb2HSV(pColor)
        const colorString = rgb2Hex(
            inputToRGB({
                h: getHue(hsv, i, true),
                s: getSaturation(hsv, i, true),
                v: getValue(hsv, i, true)
            })
        )
        patterns.push(colorString)
    }
    patterns.push(rgb2Hex(pColor))
    for (let _i = 1; _i <= darkColorCount; _i += 1) {
        const _hsv = rgb2HSV(pColor)

        const _colorString = rgb2Hex(
            inputToRGB({
                h: getHue(_hsv, _i),
                s: getSaturation(_hsv, _i),
                v: getValue(_hsv, _i)
            })
        )

        patterns.push(_colorString)
    }
    // dark theme patterns
    if (isDark) {
        const mix = (rgb1: POJO, rgb2: POJO, amount: number) => {
            const p = amount / 100
            const rgb = {
                r: (rgb2.r - rgb1.r) * p + rgb1.r,
                g: (rgb2.g - rgb1.g) * p + rgb1.g,
                b: (rgb2.b - rgb1.b) * p + rgb1.b
            }
            return rgb
        }
        return darkColorMap.map(function (_ref3) {
            const index = _ref3.index,
                opacity = _ref3.opacity
            const darkColorString = rgb2Hex(
                mix(inputToRGB('#17171A'), inputToRGB(patterns[index]), opacity * 100)
            )
            return darkColorString as TColor
        })
    }
    return patterns
}
