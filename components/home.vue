<template>
  <div>
    <!-- ****** navigation ****** -->
		<div id="nav">
      <div id="topnav">
        <div id="logo">
          <div class="logo red" @click="sot.refreshToken()">n</div>
          <div class="logo">crypt</div>
        </div>
        <div class="search icon"
            v-bind:class="{red: sot.searchmenu}"
            @click="searchicon()">
        </div>

        <div id="search" v-show="sot.searchmenu == true">
          <input type="text"
                 v-model="searchtext"
                 ref="search"
                 v-on:keyup="sot.search.q(searchtext)"
                 placeholder="search" />
        </div>

        <notepadMenu v-show="sot.profile == false"></notepadMenu>

        <user v-show="sot.profile == true"></user>
      </div>

      <div id="bottomnav">

        <div class="add btn" @click="sot.notepad.new()">
          <div class="plus icon"></div>
          <div id="new">new</div>
        </div>

        <div id="profile" @click="profile()">
          <div class="profile icon" v-bind:class="{red: sot.profile}"></div>
        </div>

      </div>

		</div>

		<!-- ********** content  ********* -->
    <transition name="home-slide">
      <div class="full" v-show="window.width > 900 || (sot.nav == false && window.width <= 900)">

        <div id="content">
          <div id="back" class="dhidden" @click="sot.nav = true">
            <div id="backarrow"></div>
            <div class="backtext">back</div>
          </div>
          <notepad></notepad>
    		</div>

      </div>

    </transition>

  </div>
</template>

<script>
import notepad        from './notepad.vue'
import notepadMenu    from './notepadMenu.vue'
import user           from './user.vue'

export default {
  name: 'home',
  components: {
    notepad,
    notepadMenu,
    user
  },
  data: function() {
    return {
      sot: this.$root.$data,
      window: {
        width: 0,
        height: 0
      },
      searchtext: ''
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize: function() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    searchicon: function() {
      this.sot.searchmenu = !this.sot.searchmenu;
      this.sot.profile = false;
      if (this.sot.searchmenu == true) {
        this.searchtext = '';
        for (let i of this.sot.notepad.d) {
          i.show = true;
        }
        this.$nextTick(() => {
          this.$refs.search.focus();
        });
      }
      else {
        for (let i of this.sot.notepad.d) {
          i.show = true;
        }
        this.sot.notepad.sel(0);
      }
    },
    profile: function() {
      this.sot.profile = !this.sot.profile;
      this.sot.searchmenu = false;
      if (this.sot.profile == false && this.sot.searchmenu == false) {
        for (let i of this.sot.notepad.d) {
          i.show = true;
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/settings.scss";



#nav {
  position: absolute;
	z-index: 0;
  top: 0;
  left: 0;
  bottom: 0;
	width: $navwidth;
  padding: 0;
	background: $color-nav;
  border-right: 1px solid $color-inactive;
  box-sizing: border-box;
}

#content {
  z-index: 1;
  position: absolute;
	top: 0;
  right: 0;
  left: $navwidth;
  bottom: 0;
	background: $color-bg;
	// color: $color-text-dark;
}

#topnav {
  position: fixed;
  top: 0;
  left: 16px;
  width: $navwidth - 16px;
  bottom: 48px;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
	-webkit-overflow-scrolling: touch;
}
#topnav::-webkit-scrollbar {
  display: none;
}

#bottomnav {
  position: fixed;
  bottom: 0;
  left: 16px;
  height: 48px;
  width: $navwidth - 16px;
  background: $color-nav;
  border-right: 1px solid $color-inactive;
  box-sizing: border-box;
  // -webkit-box-shadow: 0px -5px 14px 16px $color-nav;
  // -moz-box-shadow: 0px -5px 14px 16px $color-nav;
  // box-shadow: 0px -5px 14px 16px $color-nav;
}

.btn {
  padding: 8px 0;
}

#header {
  padding: 0;
}

.logo {
  font-size: 18px;
  letter-spacing: 14px;
  padding: 0;
  margin: 16px 0 8px 0;
}

#back {
  cursor: pointer;
  color: $color-text;
  background: $color-nav;
  padding: 16px 16px 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid $color-inactive;
  box-sizing: border-box;
}
.backtext {
  display: inline-block;
  font-size: 18px;
  letter-spacing: 14px;
  padding: 0;
  margin-bottom: 12px;
  margin-left: 2px;
}
#backarrow{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    margin-left: 4px;
    border: solid $color-active;
    border-width: 0 0 1px 1px;
    transform: rotate(45deg);
}


/* fade effect ******************/
@keyframes fadein {
    from { opacity: 0; visibility: hidden}
    to   { opacity: 1; visibility: visible}
}
@keyframes fadeout {
    from { opacity: 1; }
    to   { opacity: 0; }
}

#nav, #content, {
	animation: fadein 0.5s;
}


/* slide effect *************************************/
.home-slide-enter-active {
  transition: all 0.2s ease;
}
.home-slide-leave-active {
  transition: all 0.2s ease;
}
.home-slide-enter, .home-slide-leave-to {
  transform: translateX(100%);
}

.full {
  width: 100%;
  height: 100%;
}

#logo {
  float: left;
}

.red {
  color: $color-active;
}

#search {
  clear: both;
  padding-top: 17px;
}

/* Search Icon **************************************/
.search.icon {
  float: right;
  margin-top: 22px;
  margin-left: 3px;
  margin-right: 22px;
  width: 12px;
  height: 12px;
  border: solid 1px currentColor;
  border-radius: 100%;
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
}
.search.icon:before {
  content: '';
  position: absolute;
  top: 12px;
  left: 5px;
  height: 7px;
  width: 1px;
  background-color: currentColor;
}


/* Profile Icon *************************************/
#profile {
  float: right;
  width: 24px;
  height: 24px;
  margin: 8px 16px;
  color: $color-text;
}
.profile.icon {
  position: absolute;
  margin-left: 3px;
  margin-top: 16px;
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

/* Plus Icon ****************************************/
#new {
  margin: 4px 0 0 24px;
}

.plus.icon {
  color: $color-active;
  position: absolute;
  margin-left: 0;
  margin-top: 15px;
}

.plus.icon:before {
  content: '';
  position: absolute;
  width: 15px;
  height: 1px;
  background-color: currentColor;
}

.plus.icon:after {
  content: '';
  position: absolute;
  width: 15px;
  height: 1px;
  background-color: currentColor;
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

/* Mobile *******************************************/
@media screen and (max-width: $desktopwidth) {

  #nav {
    position: fixed;
		left: 0;
    right: 0;
    width: auto;
    border-right: none;
	}
	#content {
    position: fixed;
		width: auto;
    left: 0;
    right: 0;
    top: 0;
	}
  #topnav {
    right: 0;
    width: auto;
  }

  #bottomnav {
    right: 0;
    width: auto;
  }
}


</style>
