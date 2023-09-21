<script setup lang="ts">
import { VugelMouseEvent } from 'vugel';

const props = defineProps({
  deck: {
    type: Array,
    required: true
  }
})

const dragTarget: Ref<(Node | null)[]> = ref([])
let startEvent: VugelMouseEvent | null = null;
let startX = [];
let startY = [];

const start = (e: VugelMouseEvent) => {
  props.deck.forEach((card, index) => {
    console.log(card.img)
    if (card.img === e.target.tex.source.lookupId && dragTarget.value) {
      console.log('if is true')
      startEvent = e;
      // As Vugel doesn't expose the properties, we refer directly to the element.
      startX[index] = dragTarget.value[index].el.x as number;
      startY[index] = dragTarget.value[index].el.y as number;
    }
  })

};

const move = (e: VugelMouseEvent,) => {
  props.deck.forEach((card, index) => {
    if (card.img === e.target.tex.source.lookupId && startEvent) {
      console.log('if is true move')
      const deltaX = e.canvasOffsetX - startEvent.canvasOffsetX;
      const deltaY = e.canvasOffsetY - startEvent.canvasOffsetY;
      dragTarget.value[index]!.x = startX[index] + deltaX;
      dragTarget.value[index]!.y = startY[index] + deltaY;

      // Do not scroll on mobile.
      e.originalEvent.preventDefault();
    }
  })
};

const end = (e: VugelMouseEvent) => {
  startEvent = null;
};





watch(() => props.deck, () => {

})

start, move, end

</script>

<template compiler="vugel">
  <rectangle :h="10" :x="0" :y="200" :w="1000" color="rgb(0, 255, 0)" />
  <container :flex="true">
    <picture v-for="(card, index) in deck" :ref="el => dragTarget[index] = el" :src="card.img" :rotation="0.0" :w="120" :h="192"
      :pivot="0.0" @mousedown="start" @mousemove="move" @mouseup="end" @mouseleave="end" />
  </container>
</template>