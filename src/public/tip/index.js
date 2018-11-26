import Toast from './tip.vue'

let $vm

export default {
  install (Vue, options) {
    if (!$vm) {
      const ToastConstructor = Vue.extend(Toast)
      $vm = new ToastConstructor()
      var tpl = $vm.$mount().$el
      document.body.appendChild(tpl)
    }

    $vm.show = false
    let toast = {
      show (tip) {
        $vm.show = true
        $vm.tip = tip
        setTimeout(() => {
          $vm.show = false
        }, 400)
      },
      hide () {
        $vm.show = false
      }
    }
    if (!Vue.$toast) {
      Vue.$toast = toast
    }

    Vue.prototype.$toast = Vue.$toast
    // Vue.mixin({
    //   created () {
    //     this.$toast = Vue.$toast
    //   }
    // })
  }
}
