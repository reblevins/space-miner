<template>
  <div class="player" :style="playerStyle">
    <span>O</span>
    <span class="pointer" :style="pointerStyle">></span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'player',
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  mounted() {
    
  },
  watch: {
    player: {
      handler(val) {
        console.log(val);
      },
      deep: true
    }
  },
  computed: {
    playerStyle(): Object {
      console.log(this.player.position[0]);
      // if (!this.player.position) {
      //   return {
      //     top: "60px",
      //     left: "0px"
      //   }
      // }
      return {
        top: this.player.position[0] * 30 + "px",
        left: this.player.position[1] * 30 + "px"
      }
    },
    pointerStyle(): Object {
      let topNum;
      let leftNum;
      let rotate = 0;
      switch (this.player.facing) {
        case "right":
          topNum = 6;
          leftNum = 24;
          break;
        case "left":
          topNum = 12;
          leftNum = 3;
          rotate = 180;
          break;
        case "up":
          topNum = -3;
          leftNum = 12;
          rotate = 270;
          break;
        case "down":
          topNum = 22;
          leftNum = 17;
          rotate = 90;
          break;
      }
      return {
        top: `${topNum}px`,
        left: `${leftNum}px`,
        transform: `rotate(${rotate}deg)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  position: absolute;
  display: grid;
  align-items: center;
  justify-items: center;
  font-size: 3em;
  line-height: 2rem;
  width: 3rem;
  height: 3rem;
  color: black;
  z-index: 999;
}
.pointer {
  display: inline-block;
  font-size: 2rem;
  position: absolute;
}
</style>