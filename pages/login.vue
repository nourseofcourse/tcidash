<template>
  <div class="row vh-100">
    <div class="col-lg-3 pr-0">
      <div class="card mb-0 shadow-none">
        <div class="card-body">
          <div class="px-3">
            <div class="media justify-content-center">
              <a href="index.html" class="logo logo-admin">
                <img src="/tci-logo.png" height="55" alt="logo" class="my-3" />
              </a>
              <!-- <div class="media-body ml-3 align-self-center">
                <h4 class="mt-0 mb-1">Login on TCI</h4>
                <p class="text-muted mb-0">Sign in to continue to Frogetor.</p>
              </div>-->
            </div>
            <form
              class="form-horizontal my-4"
              method="post"
              @submit.prevent="login"
            >
              <Notification :message="error" v-if="error" />
              <div class="form-group">
                <label for="username">Username</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="mdi mdi-account-outline font-16"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder="Enter username"
                    name="username"
                    v-model="username"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="userpassword">Password</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon2">
                      <i class="mdi mdi-key font-16"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    id="userpassword"
                    placeholder="Enter password"
                    name="password"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="form-group row mt-4">
                <div class="col-sm-6">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customControlInline"
                    />
                    <label
                      class="custom-control-label"
                      for="customControlInline"
                      >Remember me</label
                    >
                  </div>
                </div>
                <div class="col-sm-6 text-right">
                  <a href="#" class="text-muted font-13">
                    <i class="mdi mdi-lock"></i> Forgot your password?
                  </a>
                </div>
              </div>
              <div class="form-group mb-0 row">
                <div class="col-12 mt-2">
                  <button
                    class="btn btn-info btn-block waves-effect waves-light"
                    type="submit"
                  >
                    Log In
                    <i class="fas fa-sign-in-alt ml-1"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- <div class="m-3 text-center bg-light p-3 text-info">
            <h5 class>Don't have an account ?</h5>
            <p class="font-13">
              Join
              <span>TCI</span> Now
            </p>
            <a href="#" class="btn btn-info btn-round waves-effect waves-light">Resister Free</a>
          </div> -->
        </div>
      </div>
    </div>
    <div class="col-lg-9 p-0 d-flex justify-content-center">
      <div class="accountbg d-flex align-items-center justify-content-center">
        <div class="account-title text-white text-center">
          <img src="assets/images/logo-sm.png" alt class="thumb-sm" />
          <h4 class="mt-3">Welcome To The Closing Institute</h4>
          <div class="border w-25 mx-auto border-info"></div>
          <h1 class>Let's Get Started</h1>
          <!-- <p class="font-14 mt-3">
            Don't have an account ?
            <a href class="text-info">Register Free</a>
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '@/components/Notification.vue'
export default {
  name: 'Login',
  layout: 'login',
  head() {
    return {
      title: 'Sign in',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Sign in to The Closing Institute by Progressive Dental Marketing. Learn dental marketing strategies to close large dental implant cases. Sign in here!'
        }
      ]
    }
  },
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
