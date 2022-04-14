import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import CountDown from './count-down'

export default function useCountDown(props) {
  /** store */
  const store = useStore()
  const playEvent = computed(() => store.state.player.playEvent)

  /** countdown */
  const countDown = ref(
    new CountDown({
      template: '{s}',
      endTime: props.time * 1000,
      addZero: false,
      render: function (outstring) {
        const el = document.querySelector('.left-time')
        el.innerText = outstring
      },
      end: function () {
        controller.hooks.countdownEnd.call()
      }
    })
  )

  return {
    countDown
  }
}
