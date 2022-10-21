<script setup lang="ts">
import { mapState } from "pinia";
import { useBlocksStore } from "@/stores/blocks";
import dirt from "@/assets/dirt.jpg";
import stone from "@/assets/stone.jpg";
import hidden from "@/assets/hidden.jpg";
</script>

<template>
  <div class="block" :class="[block.element, block.type]" v-if="block">
    <div class="block-background" :style="blockStyle"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type Block from "@/types/Block";

export default defineComponent({
  name: "block",
  props: {
    rowIndex: {
      type: Number,
      required: true,
    },
    blockIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      random: Math.floor(Math.random() * 4),
      backgrounds: {
        dirt: dirt,
        stone: stone,
        hidden: hidden
      },
    };
  },
  mounted() {
  },
  computed: {
    ...mapState(useBlocksStore, ["blocks"]),
    block() {
      return this.blocks[this.rowIndex][this.blockIndex];
    },
    exposed() {
      return (
        (this.blocks[this.rowIndex][this.blockIndex + 1] &&
          this.blocks[this.rowIndex][this.blockIndex + 1].hitPoints === 0) ||
        (this.blocks[this.rowIndex][this.blockIndex - 1] &&
          this.blocks[this.rowIndex][this.blockIndex - 1].hitPoints === 0) ||
        (this.blocks[this.rowIndex - 1] && this.blocks[this.rowIndex - 1][this.blockIndex] &&
          this.blocks[this.rowIndex - 1][this.blockIndex].hitPoints === 0) ||
        (this.blocks[this.rowIndex + 1] && this.blocks[this.rowIndex + 1][this.blockIndex] &&
          this.blocks[this.rowIndex + 1][this.blockIndex].hitPoints === 0)
      );
    },
    blockStyle() {
      let element: string = this.exposed ? this.block.element : "hidden";
      let opacity =
        this.block.hitPoints === this.block.totalHitPoints || this.block.hitPoints === 0
          ? this.block.hitPoints / this.block.totalHitPoints
          : this.block.hitPoints / this.block.totalHitPoints + 0.3;
      let image = element === "air" ? "none" : `url(${this.backgrounds[element]})`;
      let rotation = 90 + this.random * 90;
      // console.log(rotation);

      return {
        backgroundImage: image,
        opacity: opacity,
        transform: `rotate(${rotation}deg)`,
      };
    },
  },
});
</script>

<style lang="scss">
.block {
  width: 3em;
  height: 3em;
  position: relative;
  display: inline-block;
  // border: 1px solid white;

  .block-background {
    font-size: 1em;
    color: white;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &.air,
  &.open {
    background-color: white;
  }
  &.dirt {
    // border: 1px solid rgb(236, 236, 236);
    // background-color: brown;
  }
}
</style>
