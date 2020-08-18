<template>
  <div class="outer">
    <apptitle></apptitle>
		<div class="inner fade">
      <input type="email"
             v-model="username"
             v-on:keyup="sot.status = ''"
             placeholder="username" />
      <input type="password"
             v-model="password"
             v-on:keyup="validate"
             placeholder="password" />
      <span class="status">{{ sot.status }}</span>
      <div class="btn" @click="validate('go')">sign in</div>


      <div class="links">
        <!-- <div class="btn inactive" @click="sot.page = 4">about</div>
        <div class="btn inactive" @click="newacc()">create account</div>
        <div class="btn inactive" @click="sot.page = 5">terms</div> -->
        <div class="copy inactive">ncrypt.org &copy; 2019 - {{ currentYear }}</div>
      </div>

    </div>

	</div>
</template>

<script>
import apptitle from './apptitle.vue'

export default {
  name: 'signin',
  components: {
    apptitle
  },
  data: function() {
    return {
      sot: this.$root.$data,
      username: '',
      password: '',
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    validate: function(e) {
      this.sot.status = '';
      if (e.keyCode === 13 || e == 'go') {
        if (this.username == '') {
          this.sot.status = 'you must enter a username';
        }
        else if (this.password == '') {
          this.sot.status = 'you must enter a password';
        }
        else if (this.password.length < 8) {
          this.sot.status = 'your password must be at least 8 characters'
        }
        else {
          this.sot.signin(this.username, this.password);
          this.username = '';
          this.password = '';
        }
      }
    },
    newacc: function() {
      this.sot.page = 3;
      this.sot.status = '';
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

.btn {
  display: inline-block;
  padding: 8px 0;
  margin: 2px 28px 2px 0;
}

.copy {
  display: inline-block;
  padding: 8px 0;
  margin: 2px;
}

.links {
  margin-top: 24px;
}

.status {
  display: block;
  margin: 16px 0 8px 0;
}

@media screen and (max-width: $desktopwidth) { /* Mobile */
  input {width: 100%;}
}

</style>
