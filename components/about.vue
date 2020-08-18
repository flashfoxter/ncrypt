<template>
  <div>
    <div class="outer">
      <div class="pointer" @click="sot.page = 0">
        <apptitle></apptitle>
      </div>

      <div class="inner fade">

        <span class="tag">Encrypted Notes</span>

        <span>Free, open-source, and privacy-focused. Accessible from any web browser on any device.</span>

        <div class="container">
          <div class="box">
            <div class="boxtitle">Secure</div>
            <span>Your data is encrypted using AES256 before it leaves your device, so only you can read your notes.  Not even the website owner or Amazon Web Services (where the data is stored) can decrypt your data.</span>
          </div>
          <div class="box">
            <div class="boxtitle">Private</div>
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
      </div>
    </div>

    <div class="screenshot fade">
      <img id="screenshot" src="screenshot.png">
    </div>

    <div class="outer">
      <div class="inner fade">
        <span>Privacy is a fundamental human right, so the goal of ncrypt.org is to give you full control over the privacy of your data.  By design, there is no password recovery.  It is your responsibility to create a strong password and keep it stored securely.</span>

        <span>For source code and detailed information on the encryption process, visit the <a href="https://github.com/routman/ncrypt" target="_blank">git repository</a>.</span>

        <span>Ncrypt.org is completely free to use, and there are no advertisements.  We rely solely on your generous donations to pay for the operating costs.  Please consider making a small donation today.</span>
        <span>daniel@ncrypt.org<br>
        BTC: 1HrQfojcRt4gGEZntEwp24KVrSch8mtqMk<br>
        LTC: Lc5Mw23SWYJjX3Fx4Nw7J5PG4eyyG3Pow2</span>



        <div class="back btn" @click="sot.page = 0">&larr; back</div>

      </div>

    </div>


  </div>
</template>

<script>
import apptitle from './apptitle.vue'

export default {
  name: 'about',
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
  margin-bottom: 16px;
}

a, a:visited {
  color: $color-text;
}

.back {
  margin-bottom: 128px;
}

.tag {
  font-size: 16px;
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
  width: 1315px;
  margin: 0 auto;
}

@media all and (max-width: 1314px) {
  .screenshot {width: 100%;}
  #screenshot {width: 100%;}
}

@media all and (max-width: $desktopwidth) {
  .back {
    margin-bottom: 32px;

  }
  .box {
    width: 100%;
  }
}


</style>
