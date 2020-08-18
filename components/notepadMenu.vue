<template>
  <div class="wrapper">

    <transition-group name="items" tag="div">
      <div class="item btn"
            v-for="(i, index) in sot.notepad.d"
            @click="sot.notepad.sel(index)"
            v-bind:class="{active: index == sot.notepad.n}"
            v-show="i.show == true"
            :key="i.id">

        <div v-if="i.title == '' || i.title == null">untitled</div>
        <div v-else>{{ i.title }}</div>

      </div>

    </transition-group>

  </div>

</template>

<script>
export default {
  name: 'notepadMenu',
  data: function() {
    return {
      sot: this.$root.$data
    }
  }
}

</script>

<style scoped lang="scss">
@import "../assets/settings.scss";

.wrapper {
  clear: both;
  padding-bottom: 50px;
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

.item {
	// animation: fadein 0.3s;
  display: block;
}

.items-move {
  transition: transform 0.4s;
}

</style>
