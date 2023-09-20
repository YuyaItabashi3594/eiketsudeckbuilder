<script setup>
import cardData from '~/assets/carddata.json'
import { Vugel } from "vugel";

const cardDataBlue = cardData.filter((card) => card.color === '蒼')
const cardDataRed = cardData.filter((card) => card.color === '緋')
const cardDataGreen = cardData.filter((card) => card.color === '碧')
const cardDataGray = cardData.filter((card) => card.color === '玄')
const cardDataPurple = cardData.filter((card) => card.color === '紫')

const eiketsuColors = ['蒼', '緋', '碧', '玄', '紫']
const isCardSelectorOpened = ref(false)
const openedTab = ref('蒼')
const selectedCards = ref([])
const deckCardDatas = computed(() => {
  const selectedCardNumbers = selectedCards.value
  return selectedCardNumbers.map((number) => {
    return cardData.find((card) => card.number === number)
  })
})

const deckName = ref('')
const maxCost = ref(9)

const addCard = (number) => {
  selectedCards.value.push(number)
}
const removeCard = (number) => {
  selectedCards.value = selectedCards.value.filter((cardNumber) => cardNumber !== number)
}
</script>
<template>
  <div>
    <div class="flex-row w-1/4">
      <div class="flex">
        <p>デッキ名：</p>
        <input class="ml-auto mr-0 bg-neutral-50" type="text" v-model="deckName" />
      </div>
      <div class="flex">
        <p>最大コスト：</p>
        <input class="ml-auto mr-0 bg-neutral-50" type="number" v-model="maxCost" />
      </div>
      <button class="border h-16 px-4 text-xl rounded-lg" @click="isCardSelectorOpened = !isCardSelectorOpened">カード一覧を{{
        isCardSelectorOpened ? '閉じる' : '開く' }}</button>
    </div>
    <div class="grid grid-cols-4">
      <Card v-for="cardData in deckCardDatas" :card="cardData" :colorKanji="cardData.color" :selectedCards="selectedCards"
        :mode="'deck'" />
    </div>
    <vugel class="border" :settings="{ clearColor: null }" style="width: 1000px; height: 600px">
      <StartPositionCanvas :deck="deckCardDatas" />
    </vugel>

    <div v-if="isCardSelectorOpened">
      <div class="flex">
        <img v-for="color in eiketsuColors" @click="openedTab = color" class="border"
          :class="openedTab == color ? 'bg-yellow-100' : ''" :src="`/${color}.png`" />
      </div>
      <div class="grid grid-cols-4">
        <Card v-if="openedTab == '蒼'" v-for="cardData in cardDataBlue" :card="cardData" :colorKanji="'蒼'"
          :selectedCards="selectedCards" :mode="'list'" @removeCard="removeCard" @addCard="addCard" />
        <Card v-if="openedTab == '緋'" v-for="cardData in cardDataRed" :card="cardData" :colorKanji="'緋'"
          :selectedCards="selectedCards" :mode="'list'" @removeCard="removeCard" @addCard="addCard" />
        <Card v-if="openedTab == '碧'" v-for="cardData in cardDataGreen" :card="cardData" :colorKanji="'碧'"
          :selectedCards="selectedCards" :mode="'list'" @removeCard="removeCard" @addCard="addCard" />
        <Card v-if="openedTab == '玄'" v-for="cardData in cardDataGray" :card="cardData" :colorKanji="'玄'"
          :selectedCards="selectedCards" :mode="'list'" @removeCard="removeCard" @addCard="addCard" />
        <Card v-if="openedTab == '紫'" v-for="cardData in cardDataPurple" :card="cardData" :colorKanji="'紫'"
          :selectedCards="selectedCards" :mode="'list'" @removeCard="removeCard" @addCard="addCard" />
      </div>
    </div>
    <NuxtWelcome />
  </div>
</template>

<style>
body {
  min-height: 100vh;
  width: 1280px;
  margin: 0 auto;
  background-color: #4280a8
}
</style>