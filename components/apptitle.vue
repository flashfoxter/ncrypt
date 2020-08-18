<template>
  <div id="header" class="inner">
    <div class="logo red">n</div>
    <div class="logo">crypt</div>
  </div>
</template>

<script>
export default {
  name: 'apptitle',
  data: function() {
    return {
      sot: this.$root.$data
    }
  }
}
</script>

<style lang="scss">
@import "../assets/settings.scss";

.red {
  color: $color-active;
}

.logo {
  display: inline-block;
  font-size: 22px;
  letter-spacing: 16px;
  font-weight: 100;
  user-select: none;
}

#header {
  color: $color-text;
  margin: 128px 0 16px 0;
}

@media screen and (max-width: $desktopwidth) { /* Mobile */
	#header {margin-top: 32px;}
}

</style>
