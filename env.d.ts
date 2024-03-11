/// <reference types="vite/client" />

declare type Primitive = string | boolean | number | null | undefined | any
declare type Trivial = string | number
declare type POJO<T = any> = {
  [p: string]: T
}
declare type POVO = {
  [p: string]: Primitive
}
declare type POTO = {
  [p: string]: Trivial
}
declare type POSO = {
  [p: string]: string
}
declare interface PIJO<T = any> {
  [x: number]: T
}
declare interface PITO<T = Trivial> {
  [x: number]: T
}
declare interface PISO {
  [x: number]: string
}
declare interface PINO {
  [x: number]: number
}

declare type TColor = `#${string}`

declare type ThemeType = 'light' | 'dark'

declare type Noop<T = any> = (e?: T) => void

declare type AsyncNoop<T = any> = (e?: T) => Promise<void>

declare type TLanguage = 'zh-CN' | 'en-US'
