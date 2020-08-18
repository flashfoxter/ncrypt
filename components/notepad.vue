<template>
  <div class="wrapper">

    <div id="toolbar">

      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>
      </span>

      <button id="ql-delete" @click="sot.confirm = true">
        <div class="trash icon"><span></span></div>
      </button>
      <span class="right">{{ sot.status }}</span>

    </div>

    <div id="editor"></div>



  </div>
</template>

<script>
export default {
  name: 'notepad',
  data: function() {
    return {
      sot: this.$root.$data
    }
  }
}

</script>


<style lang="scss"> //not scoped due to quilljs

@import "../assets/settings.scss";
@import "../assets/quill.snow.css";

.wrapper {
  position: relative;
}

#toolbar {
  margin-top: 8px;
  position: fixed;
  top: 0;
  left: $navwidth;
  right: 0;
}

#editor {
  font-family: $font;
  letter-spacing: 1px;
  border: none;
  position: fixed;
  top: 48px;
  left: $navwidth;
  right: 0;
  bottom: 0;
}

.ql-container {
	font-size: 16px;
	overflow-y: auto;
}

.ql-toolbar.ql-snow {
  border: none;
  font-family: $font;
}


.ql-editor {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: calc(100% - 48px);
}
.ql-editor::-webkit-scrollbar {
  display: none;
}

#ql-delete {
  display: inline-block;
  position: relative;
  padding: 0;
  height: 1px;
  width: 16px;
  margin-right: 4px;
  float: right;
}
.trash.icon {
  color: #444;
  position: absolute;
  margin-left: 0;
  margin-top: 9px;
  width: 12px;
  height: 10px;
  border-left: solid 2px currentColor;
  border-right: solid 2px currentColor;
  border-bottom: solid 2px currentColor;
  border-radius: 0 0 2px 2px;
}
.trash.icon:before {
  content: '';
  position: absolute;
  left: -4px;
  top: -2px;
  width: 16px;
  height: 2px;
  background-color: currentColor;
}
.trash.icon:after {
  content: '';
  position: absolute;
  left: -2px;
  top: -5px;
  width: 8px;
  height: 2px;
  border-left: solid 2px currentColor;
  border-right: solid 2px currentColor;
  border-top: solid 2px currentColor;
  border-radius: 4px 4px 0 0;
}
.trash.icon span {
  color: #444;
  position: absolute;
  margin-left: 1px;
  margin-top: 1px;
  width: 1px;
  height: 6px;
  border-left: solid 1px currentColor;
  border-radius: 0;
}
.trash.icon span:before {
  content: '';
  position: absolute;
  left: -4px;
  top: 0;
  width: 1px;
  height: 6px;
  background-color: currentColor;
}

.right {
  display: inline-block;
  float: right;
  margin-right: 16px;
  margin-top: 2px;
}

// #toolbar .ql-font span[data-label="arial"]::before {
//    font-family: "arial";
//  }
//
//  #toolbar .ql-font span[data-label="times"]::before {
//    font-family: "times";
//  }
//
//  #toolbar .ql-font span[data-label="courier"]::before {
//    font-family: "corier";
//  }

 /* Set content font-families */
 //
 // .ql-font-arial {
 //   font-family: "arial";
 // }
 //
 // .ql-font-times {
 //   font-family: "times";
 // }
 //
 // .ql-font-courier {
 //   font-family: "courier";
 // }
 //
 // .ql-font-opensans {
 //   font-family: "opensans";
 // }

 .ql-editor ul {
   padding-left: 0;
 }

 .ql-editor ol {
   padding-left: 0;
 }

/* Mobile *******************************************/
@media screen and (max-width: $desktopwidth) {
  #toolbar {
    left: 0;
    top: 52px;
  }
  #editor {
    left: 0;
    top: 100px;
  }
  .ql-editor {
    height: calc(100% - 100px);
  }
}

</style>
