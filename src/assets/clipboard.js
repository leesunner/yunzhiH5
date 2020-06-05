import Vue from 'vue'
import Clipboard from 'clipboard'

function onSuccess() {
  Vue.$vux.toast.text('复制成功')
}

function onError() {
  Vue.$vux.toast.text('复制失败')
}

export default function handlerClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: ()=>text
  })
  clipboard.on('success', () => {
    onSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    onError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
