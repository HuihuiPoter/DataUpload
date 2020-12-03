import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {
  Button,
  Input,
  Form,
  FormItem,
  Row,
  Col,
  Message,
  Notification,
  ColorPicker,
  Upload,
  Table,
  TableColumn
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(ColorPicker)
Vue.use(Upload)
Vue.use(Table)
Vue.use(TableColumn)
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
