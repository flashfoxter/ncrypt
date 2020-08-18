<template>
  <div>
    <div class="outer">
      <apptitle></apptitle>
  		<div class="inner fade">
        <span class="tag">Encrypted Notes</span>
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

        <div class="btn inactive" @click="newacc()">create account</div>
        <div class="btn inactive" @click="sot.page = 5">terms</div>

      </div>

  	</div>

    <div class="outer">
      <div class="inner fade">

        <span class="description">Ncrypt.org is a free, open-source, and privacy-focused online notepad. Access your notes from any web browser on any device.</span>

        <div class="container">
          <div class="box">
            <div class="boxtitle">Private</div>
            <span>Your data is encrypted using AES256 before it leaves your device, so only you can read your notes.  Not even the website owner or Amazon Web Services (where the data is stored) can decrypt your data.</span>
          </div>
          <div class="box">
            <div class="boxtitle">Secure</div>
            <span>Your encryption keys are generated using a deliberately time-consuming process that strengthens the encryption.  No analytics tools or advertisements are ever used, further protecting your data from peering eyes.</span>
          </div>
          <div class="box">
            <div class="boxtitle">Anonymous</div>
            <span>No personal information is ever collected and no tracking tools are ever used, so your identity, along with your notes, remain completely confidential.</span>
          </div>
          <div class="box">
            <div class="boxtitle">Simple</div>
            <span>Clean, intuitive, and functional.  Ncrypt runs in any web browser, ensuring that you have immediate access to your notes even if your device is lost or stolen.</span>
          </div>
        </div>

        <span>Privacy is a fundamental human right, so the goal of ncrypt.org is to give you full control over the privacy of your data.  By design, there is no password recovery.  It is your responsibility to create a strong password and keep it stored securely.</span>

      </div>
    </div>

    <div class="screenshot fade">
      <img id="screenshot" src="screenshot.png" width="1191">
    </div>

    <div class="outer">
      <div class="inner fade">
        <span>For source code and detailed information on the encryption process, visit the <a href="https://github.com/routman/ncrypt" target="_blank">git repository</a>.</span>

        <span>Ncrypt.org is completely free to use, and there are no advertisements.  We rely solely on user donations to pay for the operating costs.  Thank you for your continued support!</span>

        <form id="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="ZKGBT6EKPNUPC" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
        <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>

        <span>
        Bitcoin: 1HrQfojcRt4gGEZntEwp24KVrSch8mtqMk<br>
        Litecoin: Lc5Mw23SWYJjX3Fx4Nw7J5PG4eyyG3Pow2<br>
        <br>
        daniel@ncrypt.org
      </span>

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

span {
  display: block;
  margin-bottom: 16px;
}

a, a:visited {
  color: $color-text;
}

.tag {
  // margin-top: 64px;
  font-size: 16px;
}

.description {
  margin-top: 48px;
}

.container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 8px 0;
}

.box {
  width: 47%;
}
.boxtitle{
  font-size: 16px;
  margin-bottom: 8px;
  padding-bottom: 2px;
  border-bottom: 1px solid $color-active;
}

.screenshot {
  width: 1191px;
  margin: 0 auto;
}

.copy {
  margin-bottom: 128px;
}

#paypal {
  margin-top: 24px;
}
#paypal input {
  width: 147px;
  border: none;
}

@media all and (max-width: 1314px) {
  .screenshot {width: 100%;}
  #screenshot {width: 100%;}
}

@media screen and (max-width: $desktopwidth) { /* Mobile */
  input {width: 100%;}
  .box {
    width: 100%;
  }
}

</style>
