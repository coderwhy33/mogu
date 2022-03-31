import Toast from './Toast'

const obj = {}
obj.install = function(Vue) {
  // console.log('执行了obj的install函数', Vue);
  //1.创建组件构造器
  const toastConstrustor = Vue.extend(Toast)
  //2.new的方式，根据组件构造器可以创建出一个组件对象
  const toast = new toastConstrustor()
  //3.将组件对象，挂载到某一元素上
  toast.$mount(document.createElement('div'))
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast;
}
export default obj