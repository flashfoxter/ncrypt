<template>
  <div class="outer">
    <apptitle></apptitle>
    <div class="inner fade">
      <span>{{ sot.status }}</span>
      <div class="bar">
        <div class="progressbar" v-bind:style="{width: sot.progressbar + '%'}"></div>
        <div class="ghostbar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import apptitle from './apptitle.vue'

export default {
  name: 'busy',
  components: {
    apptitle
  },
  data: function() {
    return {
      sot: this.$root.$data
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/settings.scss";

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
.fade {
	animation: fadein 1s;
}

span {
  color: $color-inactive;
  padding-top: 6px;
  display: block;
}

.bar {
  width: 400px;
}

.progressbar {
  position: relative;
  z-index: 101;
  margin-top: 12px;
  height: 1px;
  background: $color-active;
}
.ghostbar {
  position: relative;
  z-index: 1;
  margin-top: -1px;
  height: 1px;
  width: 100%;
  background: $color-inactive;
}

@media screen and (max-width: $desktopwidth) {
  .bar {width: 100%;}
}
</style>
