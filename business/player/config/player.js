export const playMode = {
  AUTO: 0,
  MANUALY: 1
}

export const playTypeCode = {
  ARTICLE: 2,
  SENTENCE: 3,
  WORD: 5
}
let paraghId = 0;

export const palylistMaper = {
  [playTypeCode.ARTICLE]: ({ audio, item }) => {
    return [
      item.reduce((ret, { juzi }) => {
        paraghId++
        juzi.map(({ sentenceId: id, start, duration, enText: text }) => {
          ret.push({
            content: {
              id,
              start,
              duration,
              text,
              paraghId: paraghId.toString()
            },
            url: audio
          })
        })
        return ret
      }, [])
    ][0]
  },
  // [playTypeCode.ARTICLE]: ({ audio, item }) => {
  //   let index = 0
  //   return [
  //     item.reduce(
  //       (ret, { juzi }) => {
  //         juzi.map(({ sentenceId: id, start, duration, enText: text }) => {
  //           ret.item.push({
  //             content: {
  //               id,
  //               start,
  //               duration,
  //               text
  //             },
  //             url: audio
  //           })
  //           ret.startTimeList.push({
  //             index: index++,
  //             start
  //           })
  //         })
  //         return ret
  //       },
  //       {
  //         item: [],
  //         startTimeList: [],
  //         url: audio
  //       }
  //     )
  //   ]
  // },
  [playTypeCode.SENTENCE]: ({ audio: url, item }) => {
    return item.map(({ enText: text, sentenceId: id, start, duration }) => {
      return {
        content: {
          text,
          id,
          start,
          duration
        },
        url
      }
    })
  },
  [playTypeCode.WORD]: (content) => {
    return content.map(({ id, enText: text, yinbiao: symbol, translate: definitions, audio: url }) => {
      definitions = definitions.map((item) => item.cixing + item.zhText)
      return {
        content: { id, text, symbol, definitions },
        url
      }
    })
  }
}

export const playTypeMaper = {
  [playTypeCode.ARTICLE]: '课文跟读',
  [playTypeCode.SENTENCE]: '句子跟读',
  [playTypeCode.WORD]: '单词跟读'
}

export const contentNameMaper = {
  [playTypeCode.ARTICLE]: 'Article',
  [playTypeCode.SENTENCE]: 'Sentence',
  [playTypeCode.WORD]: 'Word'
}
