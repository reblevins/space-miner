<script setup lang="ts">
import { mapState } from 'pinia';
import { useBlocksStore } from '@/stores/blocks';
import Block from './Block.vue';
</script>

<template>
  <div class="level" :style="levelStyle">
    <Block
      v-for="(block, index) in level"
      :blockIndex="index"
      :rowIndex="rowIndex"
    >
      <!-- <Player v-if="player.postion === index" :player="player" /> -->
    </Block>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    level: {
      type: Array,
      required: true
    },
    // player: {
    //   type: Object,
    //   required: true
    // },
    rowIndex: {
      type: Number,
      required: true
    }
  },
  mounted() {},
  computed: {
    ...mapState(useBlocksStore, ['screenWidthBlocks']),
    levelStyle() {
      return {
        'grid-template-columns': `repeat(${this.screenWidthBlocks}, 3em)`,
        // 'grid-template-rows': `repeat(${this.screenHeightBlocks}, 3em)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.level {
  display: grid;
}
</style>