<script setup lang="ts">
import { VugelMouseEvent } from 'vugel';

const props = defineProps({
  deck: Array as () => Card[]
})

const dragTarget: Ref<(Node | null)[]> = ref([])
let startEvent: VugelMouseEvent | null = null;
let startX: number[] = [];

let startY: number[] = [];
interface Card {
      img: string;
    }

const start = (e: VugelMouseEvent) => {
  props.deck.forEach((card:Card, index) => {
    if (card.img === e.target.tex.source.lookupId && dragTarget.value) {
      startEvent = e;
      currentCardIndex.value = index
      // As Vugel doesn't expose the properties, we refer directly to the element.
      startX[index] = dragTarget.value[index].el.x as number;
      startY[index] = dragTarget.value[index].el.y as number;
    }
  })

};

const move = (e: VugelMouseEvent,) => {
  props.deck.forEach((card, index) => {
    if (card.img === e.target.tex.source.lookupId && startEvent) {
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
  console.log(dragTarget.value[currentCardIndex.value].x)
};

start, move, end

const radian = ref([0, 0, 0, 0, 0, 0, 0, 0])
const currentCardIndex = ref()
function rotateRight45Degree() {
  console.log(radian.value[0])
  radian.value[currentCardIndex.value] += 0.7853981633974483
}
function rotateLeft45Degree() {
  radian.value[currentCardIndex.value] -= 0.7853981633974483
}

</script>
  <template compiler="vugel">
    <picture :w="40" :h="40" :x="600" src="/arrow-down-left-bold.png" @mousedown="rotateLeft45Degree"></picture>
    <picture :w="40" :h="40" :x="650" src="/arrow-down-right-bold.png" @mousedown="rotateRight45Degree"></picture>
    <rectangle :h="10" :x="0" :y="100" :w="768" color="rgb(0, 255, 0)" />
    <container :flex="true">
      <picture v-for="(card,index) in deck" :ref="el => dragTarget[index] = el" :src="card.img" :rotation="radian[index]"
        :w="80" :h="128" :pivot="0.5" @mousedown="start" @mousemove="move" @mouseup="end" @mouseleave="end" />
    </container>
  </template>
