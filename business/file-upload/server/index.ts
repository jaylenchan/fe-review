import express from 'express'
import path from 'path'
import multiparty from 'multiparty'
import fs from 'fs-extra'
import cors from 'cors'
import bodyParser from 'body-parser'
import { mergeFileChunk, getChunkStorePath } from './utils'
import rimraf from 'rimraf'

rimraf(path.resolve(__dirname, '..', 'target'), (err) => {
  if (err) return
  console.log('target 清除完毕')
})

const app = express()

const fileStorePath = path.resolve(__dirname, '..', 'target')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    optionsSuccessStatus: 200
  })
)

app.post('/chunk', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, async (err, fields, files) => {
    if (err) return
    const chunk = files.chunk[0]
    const hash = fields.hash[0] as string
    const filename = (fields.filename[0] as string).split('.')[0] as string
    const chunkStorePath = getChunkStorePath(filename, fileStorePath)

    if (!fs.existsSync(chunkStorePath)) {
      await fs.mkdirs(chunkStorePath)
    }
    await fs.move(chunk.path, `${chunkStorePath}/${hash}`)
    res.json({
      code: 0,
      msg: 'received chunk successfully'
    })
  })
})

app.post('/merge', async (req, res) => {
  const data = req.body
  const filename = (data.filename as string).split('.')[0] as string

  await mergeFileChunk(fileStorePath, filename, 10 * 1024 * 1024)

  res.json({
    code: 0,
    msg: 'merge chunks successfully'
  })
})

app.listen(3000, function () {
  console.log('file-upload-server is listening 3000 port ...')
})
