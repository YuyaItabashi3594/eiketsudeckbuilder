<script setup>

const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  colorKanji: {
    type: String,
    required: true
  },
  selectedCards: {
    type: Array,
    required: true
  },
  mode: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['addCard', 'removeCard'])

const colorTailwindcss = {
  '蒼': 'blue',
  '緋': 'red',
  '碧': 'green',
  '玄': 'gray',
  '紫': 'purple'
}

const color = computed(() => {
  return colorTailwindcss[props.colorKanji]
})

const highlight = computed(() => {
  if(props.mode === 'list' && props.selectedCards.includes(props.card.number)){
    return 'highlight'
  } else {
    return ''
  }
})

function clickCard() {
  if(props.mode === 'deck') return
  if (props.selectedCards.includes(props.card.number)) {
  emit('removeCard', props.card.number)
} else {
  emit('addCard', props.card.number)
}
}

</script>

<template>
  <div class="border flex w-auto cursor-pointer" :class="color,highlight" @click="clickCard">
    <img class="object-scale-down h-28" :src="card.img" :alt="card.name" />
    <div class="flex-row w-full ml-1 my-auto">
      <div class="flex items-center justify-center">
        <p class="text-xl">{{ card.name }}</p>
        <img class="object-scale-down h-8 mr-1 ml-auto" :src="`/${card.type}.png`" />
        <div class="flex-row ml-1">
          <p class="text-center">{{ card.era }}</p>
          <p class="-mt-1.5 text-center">{{ card.cost }}</p>
        </div>
        
      </div>
      <div class="flex gap-2">
        <p>{{ card.str }} / {{ card.int }}</p>
        <p v-if="card.traits.length != 0" v-for="trait in card.traits" class="">{{ trait }}</p>
        <p v-else>特技なし</p>
      </div>
      <div class="flex gap-2">
        <p>{{ card.skillName }}</p>
        <p>士気{{ card.skillCost }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blue {
  @apply bg-blue-200/80;
}
.red {
  @apply bg-red-200/80;
}

.green {
  @apply bg-green-200/80;
}

.gray {
  @apply bg-gray-200/80;
}

.purple {
  @apply bg-purple-200/80;
}

.highlight {
  @apply bg-yellow-200/80;
}
</style>
```