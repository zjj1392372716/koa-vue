/**
 * 自定义全局 Toast组件
 */
var Toast = {}
let showToast = false // 是否显示toast
let toastVN = null // toast dom

Toast.install = function (Vue, options) {
  // 默认参数
  var opt = {
    defaultType: 'ok', // icon类型
    duration: '1500' // 关闭时间
  }

  // 覆盖默认配置
  for (var property in options) {
    opt[property] = options[property]
  }

  /**
   * 普通提示 toast
   * @ type icon类型
   * @ tips 提示语
   */
  Vue.prototype.$toast = function (tips, type) {
    let curType
    if (type) {
      curType = type
    } else {
      curType = opt.defaultType
    }
    let iconSrc = '&#xe613;' // icon路径
    switch (curType) {
      case 'ok': iconSrc = '&#xe613;'; break
      case 'info': iconSrc = '&#xe76c;'; break
      case 'fail': iconSrc = '&#xe6d9;'; break
    }
    // 模版
    let tmp = `
      <div class="toast_wrapper" v-if="show">
        <div class="toast_hing"></div>
        <div class="toast_box">
          <div class="Toast" style="opacity: 1;">
            <i class="iconfont">${iconSrc}</i>
            <p>{{tip}}</p>
          </div>
        </div>
      </div>`
    if (showToast) {
      console.log('sss')
      return
    }
    if (!toastVN) {
      var ToastTpl = Vue.extend({
        data: function () {
          return {
            show: showToast,
            tip: tips
          }
        },
        template: tmp
      })
      toastVN = new ToastTpl()
    }
    var tpl = toastVN.$mount().$el
    document.body.appendChild(tpl)
    toastVN.tip = tips
    toastVN.show = showToast = true
    setTimeout(function () {
      toastVN.show = showToast = false
    }, opt.duration)
  }
  Vue.prototype.$toast.show = function (tips, type) {
    return Vue.prototype.$toast(tips, type)
  }
}

module.exports = Toast
