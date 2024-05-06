import { readFileSync } from 'node:fs'
import path from 'node:path'
import type { AvailableFormatInfo, FormatEnum } from 'sharp'
import sharp from 'sharp'
import imageType from 'image-type'
import { spinner } from '../constants'

const FORMATS = {
  jpeg: sharp.format.jpeg,
  jp2: sharp.format.jp2,
  jxl: sharp.format.jxl,
  webp: sharp.format.webp,
  avif: sharp.format.avif,
  heif: sharp.format.heif,
  tiff: sharp.format.tiff,
  png: sharp.format.png,
}

async function _format(buffer: any): Promise<keyof FormatEnum | AvailableFormatInfo> {
  const type = await imageType(buffer)
  const key = type?.mime.replace('image/', '') || 'jpeg'
  return Object.keys(FORMATS).includes(key) ? Reflect.get(FORMATS, key) : sharp.format.jpeg
}

export default async (argv: any) => {
  const { dir, ext, name } = path.parse(argv.file)
  const output = path.join(dir, `${name}-${Date.now()}${ext}`)
  spinner.start(`picture processing ...`)
  const buffer = await readFileSync(argv.file)
  const format = await _format(buffer)
  sharp(buffer, {
    animated: ['.webp', '.tiff'].includes(ext.toLocaleLowerCase()),
    limitInputPixels: false,
  }).toFormat(
    format,
    { quality: argv.quality || 80 },
  ).toFile(output, (err, info) => {
    if (err) {
      // Processing failure
      spinner.fail(err.message)
    }
    else {
      // Successful processing
      spinner.info(`width: ${info.width}`)
      spinner.info(`height: ${info.height}`)
      spinner.info(`format: ${info.format}`)
      spinner.info(`size: ${info.size}`)
      spinner.succeed('picture processing successful')
    }
  })
}
