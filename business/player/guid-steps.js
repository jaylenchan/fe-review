import { computed } from 'vue'
import store from '@/store'

const setIntroContent = (totalStep) => (text, step) => `<div>
        <span>${text} </span>
        <span>(</span>
        <span style="font-size:24px;font-weight:600;color:#333333;margin-left: -5px;">${step}</span>
        <span style="margin-left:-5px">/${totalStep}</span>
        <span style="margin-left:-5px">)</span>
      </div>`

const setAutoPlayIntro = setIntroContent(3)

/** 自动播放指引流程 */
export const autoPlayIntroSteps = [
  {
    el: '#media',
    popOver: {
      intro: setAutoPlayIntro('默认开启自动跟读，首先由系统进行标准发音领读', 1),
      position: {
        right: 240,
        bottom: 155
      },
      iconType: 'left',
      button: {
        btnText: '下一步',
        overlay: 3
      }
    }
  },
  {
    el: '#media',
    popOver: {
      intro: setAutoPlayIntro('领读完毕后会开始跟读，跟读时间根据发音时长自动计算', 2),
      position: {
        right: 240,
        bottom: 155
      },
      iconType: 'left',
      button: {
        btnText: '下一步',
        overlay: 3
      }
    }
  },
  {
    el: '#mode',
    popOver: {
      intro: setAutoPlayIntro('您也可以关闭自动跟读功能，进行手动切换跟读内容', 3),
      position: {
        right: 250,
        bottom: 120
      },
      iconType: 'bottom',
      button: {
        btnText: '我知道了',
        handler: () => {
          const playEvent = computed(() => store.state.player.playEvent)
          const stepType = computed(() => store.state.player.stepType)
          playEvent.value.emit('guidend')
          // 手动点击使用帮助，提示结束后重新该流程
          if(store.state.player.helpClick) {
            playEvent.value.emit('playAudio', { stepType: stepType.value })
          }
        }
      }
    },
    showHighLightBox: true
  }
]

const setManualyPlayIntro = setIntroContent(2)

/** 手动播放指引流程 */
export const manualyPlayIntroSteps = [
  {
    el: '#sidebar',
    popOver: {
      intro: setManualyPlayIntro('切换到手动跟读后，可以手动选择单词或切换跟读内容', 1),
      position: {
        right: 240,
        bottom: 230
      },
      iconType: 'right',
      button: {
        btnText: '下一步',
        overlay: 3
      }
    }
  },
  {
    el: '#media',
    popOver: {
      intro: setManualyPlayIntro('完成跟读后，可以再读一次，或选择其他内容，或直接退出', 2),
      position: {
        right: 240,
        bottom: 155
      },
      iconType: 'left',
      button: {
        btnText: '我知道了',
        handler: () => {
          const playEvent = computed(() => store.state.player.playEvent)
          const stepType = computed(() => store.state.player.stepType)
          playEvent.value.emit('guidend')
          playEvent.value.emit('playAudio', { stepType: stepType.value })
        }
      }
    }
  }
]
