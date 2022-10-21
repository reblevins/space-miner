<script setup lang="ts">
import { mapState, mapActions } from 'pinia';
import { useBlocksStore } from '@/stores/blocks';
import Level from './Level.vue';
import Player from './Player.vue';
onErrorCaptured((e) => {
  console.log(e);
})
</script>

<template>
  <div class="world">
    <Level 
      v-for="(level, index) in blocks"
      :level="level"
      :player="player" 
      :rowIndex="index"
      v-if="blocks.length > 0"
    />
    <Player :player="player" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured } from 'vue';

export default defineComponent({
  name: 'the-world',
  data() {
    return {
      player: {
        position: [3, 0],
        facing: 'right'
      }
    }
  },
  mounted() {
    this.createTerrain()
    window.addEventListener("keypress", (event) => {
      this.move(event.key)
    });
    window.addEventListener("keydown", (event) => {
      this.face(event.key)
    });
    // console.log(this.blocks[0]);
    
  },
  computed: {
    ...mapState(useBlocksStore, ['blocks', 'screenWidthBlocks', 'screenHeightBlocks']),
    worldStyle() {
      return {
        'grid-template-columns': `repeat(${this.screenWidthBlocks}, 3em)`,
        // 'grid-template-rows': `repeat(${this.screenHeightBlocks}, 3em)`
      }
    }
  },
  methods: {
    ...mapActions(useBlocksStore, ['createTerrain']),
    face(key: string) {
      switch(key) {
        case "ArrowUp":
          if (this.player.facing === "up") {
            this.mine(-30);
          }
          this.player.facing = "up";
          break;
        case "ArrowDown":
          if (this.player.facing === "down") {
            this.mine(30);
          }
          this.player.facing = "down";
          break;
        case "ArrowLeft":
          if (this.player.facing === "left") {
            this.mine(-1);
          }
          this.player.facing = "left";
          break;
        case "ArrowRight":
          if (this.player.facing === "right") {
            this.mine(1);
          }
          this.player.facing = "right";
          break;
      }
    },
    move(key: string) {
      let horizontalMove = 0;
      let verticalMove = 0;
      switch (key) {
        case "d":
          horizontalMove = 1;
          break;
        case "a":
          horizontalMove = -1;
          break;
        // case "w":
        //   if (this.blocks[this.player.position].hitPoints > 0) {
        //     verticalMove = -1;
        //   }
        //   break;
        case "s":
          verticalMove = 1;
          break;
      }
      console.log(horizontalMove);
      
      if (this.blocks[this.player.position[0] + verticalMove][this.player.position[1] + horizontalMove]
          && this.blocks[this.player.position[0] + verticalMove][this.player.position[1] + horizontalMove].hitPoints === 0) {
        this.player.position[0] += horizontalMove;
        this.player.position[1] += verticalMove;
      }
    },
    mine(blockPosition: number) {
      // if (this.blocks[this.player.position + blockPosition].hitPoints > 0) {
      //   this.blocks[this.player.position + blockPosition].hitPoints--
      // }
      // if (blockPosition === 30 && this.blocks[this.player.position + blockPosition].hitPoints === 0) {
      //   this.move("s")
      // }
    }
  }
})
</script>

<style lang="scss">
.world {
  position: relative;
  display: grid;
  grid-template-rows: repeat(13, 3em)
}
</style>