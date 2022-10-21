import { defineStore } from "pinia";
import type Block from '@/types/Block';

const rand = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const getRandomItem = (list: Array<Object>, weight: Array<number>) => {
  let total_weight = weight.reduce(function (prev, cur, i, arr) {
    return prev + cur;
  });

  let random_num = rand(0, total_weight);
  let weight_sum = 0;

  for (let i = 0; i < list.length; i++) {
    weight_sum += weight[i];
    weight_sum = +weight_sum.toFixed(2);

    if (random_num <= weight_sum) {
      return list[i];
    }
  }
};

export const useBlocksStore = defineStore("blocks", {
  state: () => ({
    _blocks: [[] as Block[]]
  }),
  getters: {
    blocks: (state) => state._blocks,
    defaultFontSize(): number {
      return parseFloat(getComputedStyle(document.body).fontSize)
    },
    screenWidthBlocks(): number {
      return Math.ceil(window.innerWidth / (this.defaultFontSize * 3));
    },
    screenHeightBlocks(): number {
      return Math.ceil(window.innerHeight / (this.defaultFontSize * 3));
    },
  },
  actions: {
    createTerrain() {
      this._blocks = [];
      for (let level = 0; level < 3; level++) {
        let levelArray = []
        for (let block = 0; block < this.screenWidthBlocks; block++) {
          levelArray.push({
            type: "open",
            element: "air",
            hitPoints: 0,
            totalHitPoints: 0,
          } as Block);
        }
        this._blocks.push(levelArray);
      }
      // console.log(this._blocks[0]);
      
      
      const weightTable: { [key: number]: Array<number> } = {
        0: [0.2, 0.8],
        1: [0.2, 0.8],
        2: [0.2, 0.8],
        3: [0.2, 0.8],
        4: [0.4, 0.6],
        5: [0.4, 0.6],
        6: [0.9, 0.1],
        7: [0.9, 0.1],
        8: [0.9, 0.1],
        9: [0.9, 0.1],
        10: [0.9, 0.1],
      };
      const blockTypes = [
        {
          type: "closed",
          element: "stone",
          hitPoints: 10,
          totalHitPoints: 10,
        },
        {
          type: "closed",
          element: "dirt",
          hitPoints: 5,
          totalHitPoints: 5,
        }
      ];
      for (let level:number = 3; level < 10; level++) {
        let levelArray = []
        for (let blockNumber:number = 0; blockNumber < this.screenWidthBlocks; blockNumber++) {
          let currentWeightTable = weightTable[level];
          let block = getRandomItem(blockTypes, currentWeightTable);
          levelArray.push(JSON.parse(JSON.stringify(block)));
        }
        this._blocks.push(levelArray);
      }
    }
  },
});