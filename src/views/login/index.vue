<template>
  <div class="login">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到平台</h2>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :prefix-icon="Lock" v-model="loginForm.password" placeholder="请输入密码" type="password"
                      :show-password="true">
            </el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="code" style="color: white">
            <el-input-number v-model="loginForm.code" :controls="controls"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<script setup lang="ts">
import {ref, reactive} from 'vue'
import {Lock, User} from "@element-plus/icons-vue";
import {loginFormData} from "@/api/user/types";
import useUserStore from "@/store/modules/user";
import {useRoute, useRouter} from "vue-router";
import {ElNotification} from "element-plus";

let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
let loading = ref(false)

const controls = ref(false);
let loginForm: loginFormData = reactive({username: 'admin', password: 'admin', code: 999999})

const login = async () => {
  loading.value = true
  try {
    await userStore.userLogin(loginForm);
    let redirect: any = $route.query.redirect;
    if (!redirect) {
      redirect = '/home';
    }
    await $router.push(redirect);
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: 'Hi, 欢迎回来'
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  } finally {
    loading.value = false
  }
}
</script>

<script lang="ts">
export default {
  name: 'Login'
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/images/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  .login_form {
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    position: relative;
    width: 80%;
    top: 30vh;
    padding: 40px; // 内边距

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>