<template>
  <div class="wrapper">
    <div id="confirm" class="inner">
      <span>are you sure you want to delete</span>
      <span v-if="sot.notepad.t == '' || sot.notepad.t == null">untitled?</span>
      <span v-else>{{ sot.notepad.t.substring(0,32) }}?</span>

      <div class="btn red" @click="del()">delete</div>
      <div class="btn right" @click="sot.confirm = false">cancel</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'confirm',
  data: function() {
    return {
      sot: this.$root.$data
    }
  },
  methods: {
    del: function() {
      this.sot.confirm = false;
      this.sot.notepad.del();
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/settings.scss";

.wrapper {
  position: fixed;
  z-index: 99;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  background: rgba(255, 255, 255, 0.97);
}

#confirm {
  margin-top: 128px;
  margin-bottom: 32px;
}

.inner {
  width: 768px;
  margin: 0 auto;
  overflow: auto;
}

.right {
  float: right;
}

span {
  margin: 8px 0 16px 0;
  color: $color-text;
  display: block;
}

.btn {
  float: left;
  padding: 8px 8px 8px 0;
  margin: 16px 40px 8px 0;
}

@media screen and (max-width: $desktopwidth) { /* Mobile */
  .inner {width: 100%;}
}

</style>
