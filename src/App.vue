<template>
  <div id="app" class="app">
    <div class='app__start' v-if="!gameStarted">
      <dot-list v-bind:dots="dots"></dot-list>
      <create-dot
        v-bind:dots="dots"
        v-on:create-dot="createDot"></create-dot>
      <button @click="gameStarted = true"
              class="button button--green">Начать игру</button>
    </div>
    <dots-game v-else
               v-bind:dots="dots"></dots-game>
  </div>
</template>

<script>
import DotList from './components/DotList';
import CreateDot from './components/CreateDot';
import DotsGame from './components/DotsGame';

export default {
  name: 'app',
  components: {
    DotList,
    CreateDot,
    DotsGame
  },
  data() {
    return {
      dots: [],
        gameStarted: false
    };
  },
  methods: {
    createDot(newDot) {
      this.dots.push(newDot);
    },
  },
};
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: #F6F5F6;
    overflow-x: hidden;
  }

  .app {
    width: 100%;
    height: 100%;
  }

  .app__start {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  .button {
    padding: 10px 30px;
    color: #fff;
    border-radius: 30px;
    border: 0;
    cursor: pointer;
  }

  .button--green {
    background-color: #00C831;
  }

  .button--red {
    background-color: #E61A23;
  }

  .button--grey {
    background-color: #EDEEF0;
  }
</style>
