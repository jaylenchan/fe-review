<template>
  <div>
    <input type="file" @change="onFileChange" />
    <el-button type="primary" @click="onFileUpload">上传</el-button>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref } from 'vue'

type Chunk = {
  chunk: Blob
  hash: string
  filename: string
}

class ChunkForm {
  public chunk: Blob
  public hash: string
  public filename: string
  public chunkForm: FormData | null = null

  constructor({ chunk, hash, filename }: Chunk) {
    this.chunk = chunk
    this.hash = hash
    this.filename = filename
    this.initForm()
  }

  initForm() {
    const chunkForm = new FormData()
    chunkForm.append('chunk', this.chunk)
    chunkForm.append('hash', this.hash)
    chunkForm.append('filename', this.filename)
    this.chunkForm = chunkForm
  }
}

export default defineComponent({
  name: 'FileUpload',
  setup() {
    const fileRef = ref<File | null>(null)
    /**
     *
     */
    function onFileChange(e: InputEvent) {
      const files = (e.target as HTMLInputElement).files
      if (!files) return
      const file = files[0] as File
      fileRef.value = file
    }

    function createChunks(file: File) {
      const CHUNK_SIZE = 10 * 1024 * 1024
      let cur = 0
      let index = 0
      const chunks: Array<Chunk> = []
      while (cur < file.size) {
        const chunk = file.slice(cur, cur + CHUNK_SIZE)
        chunks.push({
          chunk,
          hash: file.name + '-' + index,
          filename: file.name
        })
        cur += CHUNK_SIZE
        index += 1
      }
      return chunks
    }

    async function uploadChunks(chunks: Array<Chunk>) {
      const chunkRequestList = chunks.map((chunk) => {
        const { chunkForm } = new ChunkForm(chunk)
        return axios({
          method: 'post',
          url: 'http://localhost:3000/chunk',
          data: chunkForm
        })
      })
      await Promise.all(chunkRequestList)
    }

    async function notifyMergeChunks() {
      if (!fileRef.value) return
      return axios({
        method: 'post',
        url: 'http://localhost:3000/merge',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify({
          filename: fileRef.value.name
        })
      })
    }

    async function onFileUpload() {
      if (!fileRef.value) return
      const chunks = createChunks(fileRef.value)
      console.log(chunks)
      await uploadChunks(chunks)
      await notifyMergeChunks()
    }

    return {
      onFileChange,
      onFileUpload
    }
  }
})
</script>

<style scoped></style>
