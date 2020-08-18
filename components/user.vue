<template>
  <div class="wrapper fade">
      <div class="item">
        <div class="profile icon"></div>
        <div class="username">{{sot.username}}</div>
      </div>
      <div class="btn" @click="sot.signout()">sign out</div>
      <div class="btn" @click="sot.page = 6; sot.profile = false; sot.status = '';">change password</div>
      <div class="btn" @click="sot.profile = false">cancel</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'user',
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
	animation: fadein 0.5s;
}

.wrapper {
  clear: both;
  padding-bottom: 50px;
}

.item {
  padding: 24px 0 8px 0;
  border-color: $color-active;
  margin-bottom: 16px;
}

.username {
  padding-left: 24px;
}

.btn {
  display: block;
  padding: 8px 8px 8px 0;
  margin: 8px 16px 8px 0;
}

/* Profile Icon *************************************/
.profile.icon {
  position: absolute;
  margin-left: 0;
  margin-top: 10px;
  width: 14px;
  height: 6px;
  border-left: solid 1px currentColor;
  border-right: solid 1px currentColor;
  border-top: solid 1px currentColor;
  border-bottom: solid 1px transparent;
  border-radius: 6px 6px 0 0;
}
.profile.icon:before {
  content: '';
  position: absolute;
  left: 2px;
  top: -10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: solid 1px currentColor;
}

</style>
