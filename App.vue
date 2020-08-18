<template>
  <div id="app">
    <signin id="signin-component" v-show="sot.page == 0"></signin>
    <home id="home-component" v-show="sot.page == 1"></home>
    <busy id="busy-component" v-show="sot.page == 2"></busy>
    <signup id="signup-component" v-show="sot.page == 3"></signup>
    <about id="about-component" v-show="sot.page == 4"></about>
    <terms id="terms-component" v-show="sot.page == 5"></terms>
    <confirm id="confirm-component" v-show="sot.confirm == true"></confirm>
    <change id="change-component" v-show="sot.page == 6"></change>
  </div>
</template>

<script>
import signin from './components/signin.vue'
import home from './components/home.vue'
import busy from './components/busy.vue'
import signup from './components/signup.vue'
import about from './components/about.vue'
import terms from './components/terms.vue'
import confirm from './components/confirm.vue'
import change from './components/change.vue'

export default {
  name: 'app',
  components: {
    signin, home, busy, signup, about, terms, confirm, change
  },
  data: function() {
    return {
      sot: this.$root.$data
    }
  }
}
</script>

<style lang="scss">
@import "/assets/settings.scss";

html, body {
	background: $color-bg;
  color: $color-text;
  font-family: $font;
	margin: 0;
	height: 100%;
	width: 100%;
	font-weight: 100;
	letter-spacing: 1px;
  font-size: 16px;
}

#app {
  height: 100%;
}

.outer {
	width: 768px;
	margin: 0 auto;
	overflow: auto;
}
.inner {
	padding: 0;
	overflow: auto;
}

.title {
  margin: 0 0 16px 0;
}

.status {
  color: $color-inactive;
  margin-top: 12px;
}

/* fade effect ******************/
@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
@keyframes fadeout {
    from { opacity: 1; }
    to   { opacity: 0; }
}

#home-component {
  animation: fadein 1s;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
}

#user-component, #change-component {
  animation: fadein 0.5s;
}

#confirm-component {
  animation: fadein 0.2s;
}

/* buttons **********************/
.btn {
	display: inline-block;
	cursor: pointer;
	user-select: none;
}
.btn:hover {
	transition: color 0.4s ease;
	color: $color-active;
}
.btn:active {
	transition: color 0s;
	color: $color-active;
	outline: 0;
}
.btn:focus {
  outline: 0 none;
	border-bottom: 1px solid $color-active;
}

.item {
	height: 24px;
	border-bottom: 1px solid $color-inactive;
	padding: 16px 0 16px 0;
  line-height: 25px;
}

.active {
	transition: all 0.5s ease;
	color: $color-active;
}

.icon {

}
.icon.active {
  transition: color 0.5s ease;
  color: $color-active;
  box-shadow: none;
}
.icon:active {
  transition: color 0s;
	color: $color-active;
}

/* inputs ************************/
input, textarea {
	display: block;
	font-family: $font;
	font-weight: 300;
	letter-spacing: 1px;
	caret-color: $color-active;
	color: $color-text;
  background: none;
	width: 100%;
  height: 40px;
  margin: 0 0 16px 0;
  padding: 0;
	font-size: 16px;
	border: none;
  border-radius: 0;
  border-bottom: 1px solid $color-active;
  box-sizing: border-box;
}
input:focus, textarea:focus {
  outline: none;
	// transition: all 0.5s ease;
	// box-shadow: inset 0 -5px 9px -5px $color-active;
	// border-color: $color-active;
}
textarea {
  padding: 8px;
  line-height: 24px;
}

.hidden {
  display: none;
}

.inactive {
  color: $color-inactive;
}

.ql-toolbar.ql-snow {
  padding: 8px;
}
.ql-toolbar.ql-snow .ql-formats {
    margin-right: 4px;
}

/* Icons **********************************************/
.icon {
  color: $color-text;
  cursor: pointer;
	user-select: none;
}
.icon:hover {
	transition: color 0.4s ease;
	color: $color-active;
}
.icon:active {
	transition: color 0s;
	color: $color-active;
	outline: 0;
}
.icon:focus {
  outline: 0 none;
	border-bottom: 1px solid $color-active;
}

@media screen and (min-width: $desktopwidth + 1) { /* Desktop */
	.dhidden {
		display: none;
	}
}
@media screen and (max-width: $desktopwidth) { /* Mobile */
  .outer {width: 100%;}
	.inner {padding: 0 16px;}
	.mhidden {
    display: none !important;
  }
}


</style>
