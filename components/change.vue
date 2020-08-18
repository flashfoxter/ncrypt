<template>
  <div class="outer">

    <apptitle></apptitle>

    <div class="inner fade">

      <div class="inactive title">change password</div>

      <input type="password"
             v-model="oldpassword"
             v-on:keyup="sot.status = ''"
             placeholder="current password" />

      <input type="password"
             v-model="password1"
             v-on:keyup="validate"
             placeholder="new password" />

      <input type="password"
             v-model="password2"
             v-on:keyup="validate"
             placeholder="confirm new password" />

      <div class="true" v-if="hasUpper">&#10003</div><div class="false" v-else>&#10005</div><div class="subtext">uppercase</div><br>
      <div class="true" v-if="hasNumber">&#10003</div><div class="false" v-else>&#10005</div><div class="subtext">number</div><br>
      <div class="true" v-if="hasSpecial">&#10003</div><div class="false" v-else>&#10005</div><div class="subtext">special character</div><br>
      <div class="true" v-if="hasEight">&#10003</div><div class="false" v-else>&#10005</div><div class="subtext">8 characters long</div><br>
      <div class="true" v-if="hasMatch">&#10003</div><div class="false" v-else>&#10005</div><div class="subtext">passwords match</div>

      <span class="status">{{ sot.status }}</span>

      <span class="inactive"><br>Your notes will be encrypted using your new encryption key.  Do not close your browser or interrupt this process until it has completed.<br></span>

      <div class="btn" @click="validate('go')">submit</div>

      <div class="btn inactive" @click="cancel()">cancel</div>
    </div>

  </div>
</template>

<script>
import apptitle from './apptitle.vue'

export default {
  name: 'change',
  components: {
    apptitle
  },
  data: function() {
    return {
      sot: this.$root.$data,
      oldpassword: '',
      password1: '',
      password2: '',
      hasUpper: false,
      hasNumber: false,
      hasSpecial: false,
      hasEight: false,
      hasMatch: false
    }
  },
  methods: {
    cancel: function() {
      this.sot.page = 1;
      this.sot.status = '';
      this.oldpassword = '';
      this.password1 = '';
      this.password2 = '';
    },
    validate: function(e) {
      this.sot.status = '';

      //test for numbers
      if (/\d/.test(this.password1)) {
        this.hasNumber = true;
      }
      else {
        this.hasNumber = false;
      }
      //test for uppercase
      if (/[A-Z]/.test(this.password1)) {
        this.hasUpper = true;
      }
      else {
        this.hasUpper = false;
      }
      //test for special character
      if (/[~`!#@$%\^&*+=\-_\[\]\\';,./{}()|\\":<>\?]/g.test(this.password1)) {
        this.hasSpecial = true;
      }
      else {
        this.hasSpecial = false;
      }
      //test for 8 characters
      if (this.password1.length >= 8) {
        this.hasEight = true;
      }
      else {
        this.hasEight = false;
      }
      //test for match
      if (this.password1 == this.password2 && this.password1 != '') {
        this.hasMatch = true;
      }
      else {
        this.hasMatch = false;
      }

      if (e.keyCode === 13 || e == 'go') {

        if (this.oldpassword == '') {
          this.sot.status = 'you must enter your current password';
        }
        else if (this.password1 != this.password2) {
          this.sot.status = "your passwords don't match";
        }
        else if (this.password1.length < 8) {
          this.sot.status = "your new password must be at least 8 characters"
        }
        else {
          this.sot.change(this.oldpassword, this.password1);
          this.oldpassword = '';
          this.password1 = '';
          this.password2 = '';
        }
      }
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

input {
  width: 400px;
}

.status {
  display: block;
  margin: 16px 0 8px 0;
}

.btn {
  display: inline-block;
  padding: 8px 0;
  margin: 14px 40px 2px 0;
}

.right {
  float: right;
}

.true {
  display: inline-block;
  color: $color-green;
}
.false {
  display: inline-block;
  color: $color-active;
}

.subtext {
  display: inline-block;
  margin: 2px 0 0 10px;
  color: $color-inactive;
}

@media screen and (max-width: $desktopwidth) {
  input {width: 100%;}
}
</style>
