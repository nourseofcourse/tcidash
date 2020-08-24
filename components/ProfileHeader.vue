<template>
  <div class="fro_profile">
    <GridRow classes="align-items-center">
      <GridCol classes="col-lg-4 mb-3 mb-lg-0">
        <div class="fro_profile-main">
          <div class="fro_profile-main-pic">
            <AvatarGenerator :name="team.title.rendered" :size="128" :avatarImage="team.acf.image" />
            <span class="fro-profile_main-pic-change">
              <i class="fas fa-camera"></i>
            </span>
          </div>
          <div class="fro_profile_user-detail">
            <h5 class="fro_user-name">{{ team.title.rendered }}</h5>
            <p
              class="mb-0 fro_user-name-post"
              v-if="team.acf.city"
            >{{ team.acf.city | capitalize }}, {{ team.acf.state | capitalize }}</p>
          </div>
        </div>
      </GridCol>
      <GridCol classes="col-lg-4 mb-3 mb-lg-0">
        <GridRow>
          <GridCol classes="col-7">
            <div class="header-title">close rate</div>
            <div class="seling-report">
              <h3 class="seling-data mb-1">{{ getTeamAverageCloseRate(team.id) }}%</h3>
              <p class="text-muted">Avgerage monthly sales per coordinator</p>
              <!-- <h5 class="seling-data-detail">Avg. close rate shown</h5> -->
            </div>
          </GridCol>
          <GridCol classes="col-5 align-item-center">
            <PeityChart :type="'donut'" :chartData="getTeamAverageCloseRate(team.id) + '/100'"></PeityChart>
          </GridCol>
        </GridRow>
      </GridCol>
      <GridCol classes="col-lg-4 mb-2 mb-lg-0">
        <GridRow>
          <GridCol classes="col-6">
            <div class="header-title">Total Sales</div>
            <div class="seling-report">
              <h3
                class="seling-data mb-1"
              >${{ getTeamAverageTotalSales(team.id) | numbersWithCommas }}</h3>
              <p class="text-muted">Avgerage monthly sales per coordinator</p>
            </div>
          </GridCol>
          <GridCol classes="col-6">
            <PeityChart></PeityChart>
          </GridCol>
        </GridRow>
      </GridCol>
    </GridRow>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>
