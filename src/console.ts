import { debug, error, info, log } from 'node:console'
import process from 'node:process'

const isDev = process.env.COMMAND_LINE_TOOLBOX_ENV === 'development'

export default {
  i: (message?: any, ...optionalParams: any[]) => info(message, ...optionalParams),
  d: (message?: any, ...optionalParams: any[]) => isDev && debug(message, ...optionalParams),
  e: (message?: any, ...optionalParams: any[]) => isDev && error(message, ...optionalParams),
  l: (message?: any, ...optionalParams: any[]) => isDev && log(message, ...optionalParams),
}
