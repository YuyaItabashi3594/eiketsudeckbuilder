<script setup lang="ts">
import { VugelMouseEvent } from 'vugel';

const dragTarget: Ref<(Node | null)[]> = ref([])
let startEvent: VugelMouseEvent | null = null;
let startX = 0;
let startY = 0;

const start = (index,e: VugelMouseEvent) => {
  console.log(index)
  if (dragTarget.value[index]) {
    startEvent = e;

    // As Vugel doesn't expose the properties, we refer directly to the element.
    startX = dragTarget.value[index].el.x as number;
    startY = dragTarget.value[index].el.y as number;
  }
};

const move = (index,e: VugelMouseEvent,) => {
  console.log(index)
  if (startEvent) {
    const deltaX = e.canvasOffsetX - startEvent.canvasOffsetX;
    const deltaY = e.canvasOffsetY - startEvent.canvasOffsetY;
    dragTarget.value[index]!.x = startX + deltaX;
    dragTarget.value[index]!.y = startY + deltaY;

    // Do not scroll on mobile.
    e.originalEvent.preventDefault();
  }
};

const end = (index,e: VugelMouseEvent) => {
  startEvent = null;
};

const props = defineProps({
  deck: {
    type: Array,
    required: true
  }
})



watch(() => props.deck, () => {

})

start, move, end

</script>

<template compiler="vugel">
  <rectangle :h="10" :x="0" :y="200" :w="1000" color="rgb(0, 255, 0)" />
  <container :flex="true">
    <picture v-for="(card, index) in deck" :ref="dragTarget[index]" :src="card.img" :w="120" :h="192" :pivot="0.0" @mousedown="start(index)" @mousemove="move(index)" @mouseup="end(index)" @mouseleave="end(index)" />
  </container>
</template>