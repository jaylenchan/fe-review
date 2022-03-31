import fs from 'fs-extra'
import path from 'path'

function pipeStream(path, writeStream) {
  return new Promise<void>((resolve) => {
    const readStream = fs.createReadStream(path)
    readStream.on('end', () => {
      fs.unlinkSync(path)
      resolve()
    })
    readStream.pipe(writeStream)
  })
}

export function getChunkStorePath(filename: string, fileStorePath: string) {
  return path.resolve(fileStorePath, filename + '-chunks')
}

async function getChunkPaths(filePath, filename: string) {
  const chunkDir = path.resolve(filePath, filename)
  let chunkPaths = await fs.readdir(chunkDir)
  chunkPaths.sort((a: any, b: any) => a.split('-')[1] - b.split('-')[1])
  chunkPaths = chunkPaths.map((chunkPath) => path.resolve(chunkDir, chunkPath))

  return chunkPaths
}

export async function mergeFileChunk(filePath, filename, size) {
  const chunkStorePath = getChunkStorePath(filename, filePath)
  const chunkPaths = await getChunkPaths(filePath, chunkStorePath)
  await Promise.all(
    chunkPaths.map((chunkPath, index) => {
      return pipeStream(
        chunkPath,
        fs.createWriteStream(path.resolve(filePath, filename + '.apk'), {
          start: index * size
        })
      )
    })
  )
  fs.rmdirSync(chunkStorePath)
}
