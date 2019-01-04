
function isTouchDevice () {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
  const mq = function (query) {
    return window.matchMedia(query).matches
  }

  if (('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch)) {
    return true
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
  return mq(query)
}

export default {
  name: 'touch-drag-drop',
  inserted (el, { value, modifiers }) {
    if (isTouchDevice()) {
      console.log('is touch device')
      const ctx = {
        onTouch (evt) {
          evt.preventDefault()
          if (evt.touches.length > 1 || (evt.type === 'touchend' && evt.touches.length > 0)) { return }

          const newEvt = document.createEvent('MouseEvents')
          let type = null
          let touch = null

          switch (evt.type) {
            case 'touchstart':
              type = 'mousedown'
              touch = evt.changedTouches[0]
              break
            case 'touchmove':
              type = 'mousemove'
              touch = evt.changedTouches[0]
              break
            case 'touchend':
              type = 'mouseup'
              touch = evt.changedTouches[0]
              break
          }

          newEvt.initMouseEvent(type, true, true, evt.originalTarget.ownerDocument.defaultView, 0,
            touch.screenX, touch.screenY, touch.clientX, touch.clientY,
            evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, 0, null)

          evt.originalTarget.dispatchEvent(newEvt)
          console.log('emit mouse event')
          console.log(newEvt)
        }
      }

      el.__touchDragDrop = ctx
      el.addEventListener('touchstart', ctx.onTouch, false)
      el.addEventListener('touchmove', ctx.onTouch, false)
      el.addEventListener('touchend', ctx.onTouch, false)
    } else {
      console.log('is NOT touch device')
    }
  },
  unbind (el, { modifiers }) {
    const ctx = el.__touchDragDrop
    if (ctx) {
      el.removeEventListener('touchstart', ctx.onTouch, false)
      el.removeEventListener('touchmove', ctx.onTouch, false)
      el.removeEventListener('touchend', ctx.onTouch, false)
      delete el.__touchDragDrop
    }
  }
}
