<template>
  <el-row class="tac">
    <el-col
      :span="3"
      style="background-color: #282C35; height: calc(100vh);"
    >
      <el-menu
        active-text-color="#e60012"
        background-color="#282C35"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Operation />
            </el-icon>
            <span>竞赛管理</span>
          </template>
          <el-menu-item-group>
			<el-menu-item
			  index="/competition"
			  @click="goTo('/competition')"
			>竞赛管理</el-menu-item>
			<el-menu-item
			  index="/competitionCreate"
			  @click="goTo('/competitionCreate')"
			>竞赛创建</el-menu-item>
			<el-menu-item
			  index="/competitionSignUp"
			  @click="goTo('/competitionSignUp')"
			>竞赛报名</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-col>

    <el-col :span="21">
      <router-view></router-view>
    </el-col>

  </el-row>
</template>
  <script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useUserStore } from "../../store/user";
export default defineComponent({
  setup() {
    //组合api
    const store = useUserStore();
    const { count } = storeToRefs(store);
    console.log(count);
    return {
      count,
    };
  },
  data() {
    return {
      msg: "this is vue app",
      msgHtml: "<h3>this is v-html 指令</h3>",
      home: "home",
      ok: true,
      number1: 1, //数量增加
      data: [],
      obj: {
        name: "rose",
        children: {
          name: "22",
        },
      },
      product: {
        name: "mac book",
        price: 99,
        count: 10,
        total: 0,
      },
    };
  },
  computed: {
    //商品的价格计算
    //简单数字计算
    sum() {
      this.product.total = this.product.price * this.product.count;
      return this.product.total;
    },
  },
  mounted() {
    // this.increate();
    // this.sum();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(path) {
      this.$router.replace(path);
    },
    componentEvent(data) {
      console.log("组件自定义事件", data);
    },
    componentEmitEvent(data) {
      console.log("$emit组件自定义事件", data);
    },
    btnTemple() {
      let str = "home";
      let str1 = `this is vue string temple ${str}`; //字符串模板写法
      console.log(str1);
    },
    // increate() {
    //     this.number1++
    // },
    btnDeep() {
      this.obj.children.age = 23;
    },
    // sum() {
    //     this.product.total = this.product.price * this.product.count;
    // }
  },
  components: {
    //HelloWorld
  },
});
</script>
  
  <style lang="scss" scoped>
.home {
  background-color: $blue;
}

.index {
  background-color: red;
}
* {
  margin: 0;
  padding: 0;
}
</style>
  