/*
  Turns the raw Facebook exports in /media into web-sized WebP files in
  /public/media. Run it again after adding photos: `npm run media`.

  Photos are numbered in filename order (which is upload order), so cut-07 is
  always the 8th file in /media. Each gets two sizes:
    cut-XX-sm.webp   480px wide  - the photo wall, gallery tiles, cards
    cut-XX-lg.webp  1080px wide  - the gallery lightbox
*/
import sharp from 'sharp'
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SRC = 'media'
const OUT = 'public/media'
mkdirSync(OUT, { recursive: true })

const files = readdirSync(SRC)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !/^logo\./i.test(f))
  .sort()

const manifest = []
for (const [i, f] of files.entries()) {
  const id = String(i).padStart(2, '0')
  const img = sharp(join(SRC, f)).rotate()
  const { width, height } = await img.metadata()
  await img.clone().resize({ width: 480, withoutEnlargement: true }).webp({ quality: 66 }).toFile(join(OUT, `cut-${id}-sm.webp`))
  await img.clone().resize({ width: 1080, withoutEnlargement: true }).webp({ quality: 78 }).toFile(join(OUT, `cut-${id}-lg.webp`))
  manifest.push({ id, src: f, ratio: +(width / height).toFixed(3) })
}

const logo = sharp(join(SRC, 'logo.jpg'))
await logo.clone().resize(192, 192, { fit: 'cover' }).webp({ quality: 90 }).toFile(join(OUT, 'logo-192.webp'))
await logo.clone().resize(512, 512, { fit: 'cover' }).webp({ quality: 90 }).toFile(join(OUT, 'logo-512.webp'))
await logo.clone().resize(64, 64, { fit: 'cover' }).png().toFile('public/favicon.png')

writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`${files.length} photos + logo written to ${OUT}`)
