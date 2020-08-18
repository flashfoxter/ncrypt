<template>
  <div class="outer">

    <div class="pointer" @click="sot.page = 0">
      <apptitle></apptitle>
    </div>

    <div class="inner fade">
      <div class="inactive title">create new account</div>

      <input type="email"
             v-model="username"
             v-on:keyup="sot.status = ''"
             placeholder="username" />

      <input type="password"
             v-model="password1"
             v-on:keyup="validate"
             placeholder="password" />

      <input type="password"
             v-model="password2"
             v-on:keyup="validate"
             placeholder="confirm password" />

      <div class="true" v-if="hasUpper">&#10003</div><div class="false" v-else>&#10005</div><div class="subtext">uppercase</div><br>
      <div class="true" v-if="hasNumber">&#10003</div><div class="false" v-else>&#10005</div><div class="subtext">number</div><br>
      <div class="true" v-if="hasSpecial">&#10003</div><div class="false" v-else>&#10005</div><div class="subtext">special character</div><br>
      <div class="true" v-if="hasEight">&#10003</div><div class="false" v-else>&#10005</div><div class="subtext">8 characters long</div><br>
      <div class="true" v-if="hasMatch">&#10003</div><div class="false" v-else>&#10005</div><div class="subtext">passwords match</div>

      <span class="status">{{ sot.status }}</span>

      <span class="inactive"><br>By using ncrypt, you are agreeing to our Terms of Service.<br></span>

      <div class="btn" @click="validate('go')">create</div>

      <div class="btn inactive" @click="cancel()">cancel</div>
    </div>

  </div>
</template>

<script>
import apptitle from './apptitle.vue'

export default {
  name: 'signup',
  components: {
    apptitle
  },
  data: function() {
    return {
      sot: this.$root.$data,
      username: '',
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
        if (this.username == '') {
          this.sot.status = 'you must enter a username';
        }
        else if (this.password1 != this.password2) {
          this.sot.status = "your passwords don't match";
        }
        else if (this.password1.length < 8) {
          this.sot.status = "your password must be at least 8 characters"
        }
        else {
          this.sot.signup(this.username, this.password1);
          this.username = '';
          this.password1 = '';
          this.password2 = '';
        }
      }
    },
    cancel: function() {
      this.sot.page = 0;
      this.sot.status = '';
      this.username = '';
      this.password1 = '';
      this.password2 = '';
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

.pointer {
  display: inline-block;
  cursor: pointer;
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
