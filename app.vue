<script setup>
import cardData from '~/assets/carddata.json'
import { Vugel } from "vugel";


const cardDataBlue = cardData.filter((card) => card.color === '蒼')
const cardDataRed = cardData.filter((card) => card.color === '緋')
const cardDataGreen = cardData.filter((card) => card.color === '碧')
const cardDataGray = cardData.filter((card) => card.color === '玄')
const cardDataPurple = cardData.filter((card) => card.color === '紫')
const cardDataOrange = cardData.filter((card) => card.color === '琥')

const eiketsuColors = ['蒼', '緋', '碧', '玄', '紫', '琥']
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

const isMobile = ref(false)


</script>
<template>
  <div class="mt-10">
    <div class="flex-row">
      <div class="flex">
        <v-text-field label="デッキ名" v-model="deckName" />
      </div>
      <div class="flex">
        <v-text-field label="コスト上限" v-model="maxCost" />
      </div>
    </div>
    <div class="grid grid-cols-4">
      <Card v-for="cardData in deckCardDatas" :card="cardData" :colorKanji="cardData.color" :selectedCards="selectedCards"
        :mode="'deck'" />
    </div>
    <v-row justify="center">
      <v-dialog v-model="isCardSelectorOpened" scrollable width="auto">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" class="mt-6">
            カード一覧を開く
          </v-btn>
        </template>
        <v-card style="background-color: #B3E5FC;">
          <v-card-title>カード一覧</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="flex">
              <img v-for="color in eiketsuColors" @click="openedTab = color" class="border"
                :class="openedTab == color ? 'bg-yellow-100' : ''" :src="`/${color}.png`" />
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-10">
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
              <Card v-if="openedTab == '琥'" v-for="cardData in cardDataOrange" :card="cardData" :colorKanji="'琥'"
                :selectedCards="selectedCards" :mode="'list'" @removeCard="removeCard" @addCard="addCard" />
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue-darken-1" variant="text" @click="isCardSelectorOpened = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <ClientOnly>
      <div class="sm:flex-row md:flex mt-6">
        <vugel class="border" :settings="{ clearColor: null }" style="width: 700px; height: 350px">
          <StartPositionCanvas :deck="deckCardDatas" />
        </vugel>
        <v-textarea label="初期配置の解説文"></v-textarea>
      </div>
    </ClientOnly>
  </div>
</template>

<style>
body {
  min-height: 100vh;
  width: 1280px;
  margin: 0 auto;
  background-color: #B3E5FC
}

@media screen and (max-width: 1280px) {
  body {
    width: 100vw;
  }
}

.primary {
  background-color: #039BE5
}
</style>