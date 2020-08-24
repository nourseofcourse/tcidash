<template>
  <div class="page-wrapper-img">
    <div class="page-wrapper-img-inner">
      <UserSidebar />
      <!-- Page-Title -->
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">
            <div class="float-right align-item-center mt-2">
              <button
                class="btn btn-info px-4 align-self-center report-btn"
                @click="showModal = true"
              >Upload Stats</button>
            </div>
            <h4 class="page-title mb-2">
              <i class="mdi mdi-view-dashboard-outline mr-2"></i>Dashboard
            </h4>
            <div class>
              <ol class="breadcrumb">
                <li class="breadcrumb-item text-light">TCI</li>
                <!-- <li class="breadcrumb-item">
                  <a href="javascript:void(0);">Dashboard</a>
                </li>-->
                <li class="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
          <!--end page title box-->
        </div>
        <!--end col-->
      </div>
      <!--end row-->
      <!-- end page title end breadcrumb -->
    </div>
    <!--end page-wrapper-img-inner-->
    <Modal v-if="showModal" @close="showModal = false" :open="showModal">
      <h5 class="model-title mt-0" slot="header">Upload Statistics</h5>
      <div slot="body">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="month">Sales Month</label>
              <select name="month" id="month" class="form-control" v-model="month">
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="coordinator">Coordinator</label>
              <input
                type="text"
                class="form-control"
                name="coordinator"
                :value="loggedInUser.name"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="consultations">Consultations</label>
              <input
                type="number"
                class="form-control"
                name="consultations"
                v-model="consultations"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="presented">Presented</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-dollar-sign"></i>
                  </span>
                </div>
                <input
                  type="number"
                  class="form-control"
                  name="presented"
                  v-model="presented"
                  @change="calculateCloseRate"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="presented">Actual</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-dollar-sign"></i>
                  </span>
                </div>
                <input
                  type="number"
                  class="form-control"
                  name="actual"
                  v-model="actual"
                  @change="calculateCloseRate"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="closeRate">Close Rate</label>
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  name="closeRate"
                  disabled
                  v-model="closeRate"
                />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fas fa-percent"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-info" @click.prevent="submitStats">Submit Stats</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserSidebar from '@/components/App/UserSidebar.vue'
import Modal from '@/components/Modal.vue'

export default {
  components: {
    UserSidebar,
    Modal
  },
  data() {
    return {
      showModal: false,
      consultations: '',
      month: '',
      presented: '',
      actual: '',
      closeRate: ''
    }
  },
  methods: {
    submitStats() {},
    toggleBodyClass() {
      if (this.showModal) {
        document.body.classList.add('modal-open')
        this.showBackdrop()
      } else {
        document.body.classList.remove('modal-open')
        this.removeBackdrop()
      }
    },
    removeBackdrop() {
      let elem = document.getElementById('modal-backdrop')
      elem.parentNode.removeChild(elem)
    },
    showBackdrop() {
      let elem = document.createElement('div')
      elem.classList.add('modal-backdrop')
      elem.classList.add('fade')
      elem.classList.add('show')
      elem.setAttribute('id', 'modal-backdrop')
      window.document.body.appendChild(elem)
    },
    calculateCloseRate() {
      if (this.actual != 0 && this.presented != 0) {
        this.closeRate = ((this.actual / this.presented) * 100).toFixed(2)
      }
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  watch: {
    showModal() {
      this.toggleBodyClass()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
