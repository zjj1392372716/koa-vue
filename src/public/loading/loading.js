var Loading = {}
let showLoading = false
let loadingVN = null

Loading.install = function (Vue, options) {
  // 默认参数
  let opt = {}
  // 覆盖默认配置
  for (var property in options) {
    opt[property] = options[property]
  }
  /**
   * @ tips 提示语
   */
  Vue.prototype.$loading = function (tips) {
    let temp = `
        <div class="l_toast_wrapper" v-if="show">
          <div class="l_toast_hing"></div>
          <div class="l_toast_box">
            <div class="l_Toast" style="opacity: 1;">
              <span class="l_imgBox">
                <div class="object" id="object_one"></div>
                <div class="object" id="object_two"></div>
                <div class="object" id="object_three"></div>
                <div class="object" id="object_four"></div>
              </span>
              <p>{{tip}}</p>
            </div>
          </div>
        </div>`
    if (showLoading) {
      return
    }
    if (!loadingVN) {
      var LoadingTpl = Vue.extend({
        data: function () {
          return {
            show: showLoading,
            tip: tips
          }
        },
        template: temp
      })
      loadingVN = new LoadingTpl()
    }
    var tpl = loadingVN.$mount().$el
    document.body.appendChild(tpl)
    loadingVN.tip = tips
    loadingVN.show = showLoading = true
  }

  Vue.prototype.$loading.show = function (tips) {
    return Vue.prototype.$loading(tips)
  }

  Vue.prototype.$loading.hide = function () {
    loadingVN.show = showLoading = false
  }
}

module.exports = Loading
