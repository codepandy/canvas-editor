import { ElementType } from '../../../dataset/enum/Element'
import { writeElementList } from '../../../utils/clipboard'
import { CanvasEvent } from '../CanvasEvent'

export function copy(host: CanvasEvent) {
  const draw = host.getDraw()
  // 自定义粘贴事件
  const { copy } = draw.getOverride()
  if (copy) {
    copy()
    return
  }
  const rangeManager = draw.getRange()
  // 光标闭合时复制整行
  const copyElementList = rangeManager.getIsCollapsed()
    ? rangeManager.getRangeRowElementList()
    : rangeManager.getSelectionElementList()
  if (!copyElementList?.length) return
  // 增加输入框可复制功能
  const copyList = copyElementList.map(item => {
    if (item.type === ElementType.IMAGE) {
      return { value: '' }
    }
    return { value: item.value }
  })
  writeElementList(copyList, draw.getOptions())
}
