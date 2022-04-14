import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import usePlayerStore from './store/use-player-store'

import { palylistMaper, playTypeMaper, contentNameMaper, playMode as playModeConfig } from './config/player'
import { autoPlayIntroSteps, manualyPlayIntroSteps } from './guid-steps'
import sourceService from '@/packages/course/services/source'
import teacherService from '@/packages/course/services/teacher'
import ProcessController from './process-controller'
import { useGoBack } from '@/packages/course/utils/index'

export default function usePlayer() {
  useGoBack()
  /** store */
  const {
    guidConf,
    playMode,
    showCountDown,
    firstOpenFollow,
    setCurContent,
    setCurUrl,
    setPlaylist,
    setPlayType,
    setFirstOpenFollow,
    setGuidConf
  } = usePlayerStore()

  /** 指引步骤配置 */
  const guid = computed(() => {
    return playMode.value === playModeConfig.AUTO ? autoPlayIntroSteps : manualyPlayIntroSteps
  })
  /** 展示侧边栏 */
  const showSideBar = computed(() => playMode.value === playModeConfig.MANUALY)

  /** 流程控制器 */
  const playlist = ref(null)
  const processController = new ProcessController()

  const sideBar = ref(null)

  watch(
    () => playMode.value,
    () => {
      // 切换模式手动跟读，且未曾出现提示
      if (playMode.value !== playModeConfig.AUTO) {
        if (firstOpenFollow.value !== 3) {
          setGuidConf({
            showGuid: true,
            emitType: 'user'
          })
        }
      }
    }
  )

  watch(
    () => playlist.value,
    () => {
      if (playlist.value.length) {
        processController.init()
      }
    }
  )

  /** life hook */
  const sid = useRoute().query.sid
  const playTypeName = ref('')
  const contentName = ref('')
  onMounted(async () => {
    const { type, content, firstOpenFollow } = await sourceService.getFollowCopyDetail({ sid: sid })
    //if (firstOpenFollow) await teacherService.reportFollow()
    console.log('content', palylistMaper[type](content))
    playlist.value = palylistMaper[type](content)
    playTypeName.value = playTypeMaper[type]
    contentName.value = contentNameMaper[type]
    setPlayType(type)
    setCurContent(playlist.value[0].content)
    setCurUrl(playlist.value[0].url)
    setPlaylist(playlist.value)
    setFirstOpenFollow(firstOpenFollow)
  })

  return {
    guidConf,
    showCountDown,
    guid,
    showSideBar,
    playlist,
    playTypeName,
    contentName,
    sideBar
  }
}
