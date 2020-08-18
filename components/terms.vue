<template>
  <div class="outer">

    <div class="pointer" @click="sot.page = 0">
      <apptitle></apptitle>
    </div>

    <div class="inner fade">
      <span class="inactive">Terms of Service</span>

      <span>By using the ncrypt app or web app (“Service”), you are agreeing to be bound by the following terms and conditions (“Terms of Use”) set forth by ncrypt.org (“We”).</span>

      <span>I. You are responsible for keeping your username and password safe.</span>
      <span>II. We are not responsible for any information stored with the Service.</span>
      <span>III. We reserve the right to modify or terminate the Service for any reason, without notice at any time.</span>
      <span>IV. We reserve the right to alter these terms at any time.</span>
      <span>V. We reserve the right to refuse service to anyone for any reason at any time.</span>

      <div class="btn" @click="sot.page = 0">
        <div class="arrow-left icon"></div>
        <div class="back">back</div>
      </div>

    </div>

  </div>
</template>

<script>
import apptitle from './apptitle.vue'

export default {
  name: 'terms',
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

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  padding: 8px 0;
  margin: 16px 0;
  display: block;
}

.pointer {
  display: inline-block;
  cursor: pointer;
}

span {
  display: block;
  margin-bottom: 20px;
}

a, a:visited {
  color: $color-text;
}

.back {
  margin-bottom: 128px;
  margin-left: 28px;
}

/* back button */
.arrow-left.icon {
  color: $color-text;
  position: absolute;
  margin-left: 3px;
  margin-top: 10px;
  width: 16px;
  height: 1px;
  background-color: currentColor;
}

.arrow-left.icon:before {
  content: '';
  position: absolute;
  left: 1px;
  top: -5px;
  width: 10px;
  height: 10px;
  border-top: solid 1px currentColor;
  border-right: solid 1px currentColor;
  -webkit-transform: rotate(-135deg);
          transform: rotate(-135deg);
}



@media screen and (max-width: $desktopwidth) {
  margin-bottom: 32px;
}
</style>
