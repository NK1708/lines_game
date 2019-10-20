<template>
  <div class="app-create">
    <button class="button button--green app-create__new-button" v-on:click="openForm" v-show="!isCreating">
      Создать новую точку
    </button>
    <div class='app-create__box' v-show="isCreating">
      <div class="app-create__coords">
        <h2>Координаты:</h2>
        <label class="app-create__label">
          <span>X</span>
          <input v-model="coordX" type='text'>
        </label>
        <label class="app-create__label">
          <span>Y</span>
          <input v-model="coordY" type='text'>
        </label>
      </div>

      <div class="app-create__connections" v-if="dots.length > 0">
        <h2>Связь с другими точками:</h2>
        <div class='field'
             v-for="(dot, index) in dots">
          <label>{{ index + 1 }}</label>
          <input type='checkbox'
                 :value="index + 1"
                 v-model="dotsConnections">
        </div>
      </div>

      <div class='app-create__buttons'>
        <button class='button button--green' v-on:click="sendForm()">
          Создать
        </button>
        <button class='button button--red' v-on:click="closeForm">
          Отменить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: ['dots'],
        data() {
            return {
                coordX: '',
                coordY: '',
                dotIndex: this.dots.length + 1,
                dotsConnections: [],
                isCreating: false,
            };
        },
        methods: {
            openForm() {
                this.isCreating = true;
            },
            closeForm() {
                this.isCreating = false;
            },
            sendForm() {
                if (this.coordX.length > 0 && this.coordY.length > 0) {
                    const coordX = this.coordX;
                    const coordY = this.coordY;
                    const dotIndex = this.dotIndex;
                    const dotsConnections = this.dotsConnections;

                    this.$emit('create-dot', {
                        coordX,
                        coordY,
                        dotIndex,
                        dotsConnections
                    });
                    this.coordX = '';
                    this.coordY = '';
                    this.dotIndex = this.dotIndex + 1;
                    this.isCreating = false;
                }
            },
        },
    };
</script>

<style>
  .app-create__new-button {
    margin-bottom: 20px;
  }

  .app-create__box {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #111111;
  }

  .app-create__label {
    display: block;
  }
  .app-create__label:not(:last-child) {
    margin-bottom: 10px;
  }

  .app-create__label span {
    margin-right: 10px;
  }

  .app-create__label input[type='text'] {
    padding: 5px 10px;
  }

  .app-create__buttons {
    margin-top: 20px;
  }
</style>
