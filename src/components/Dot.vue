<template>
  <div>
    <div class="dot" v-show="!isEditing">
      <h3 class="dot__title">Точка {{ dot.dotIndex }}</h3>
      <div class='dot__buttons'>
        <button class='button button--green' v-on:click="showForm">
          Редактировать
        </button>
        <button class="button button--red" v-on:click="deleteDot(dot)">
          Удалить
        </button>
      </div>
    </div>
    <div class="dot__editing" v-show="isEditing">
      <div class="app-create__coords">
        <h2>Координаты:</h2>
        <div class='field'>
          <label>X</label>
          <input v-model="dot.coordX" type='text'>
        </div>
        <div class='field'>
          <label>Y</label>
          <input v-model="dot.coordY" type='text'>
        </div>
      </div>

     <!-- <div class="app-create__connections">
        <h2>Связь с другими точками:</h2>
        <div class='field'
             v-for="(dot1, index) in dots">
          <label>{{ dot.dotIndex }}</label>
          <input type='checkbox'
                 :value="dot1.dotIndex"
                 v-model="dot1.dotIndex">
        </div>
      </div>-->

      <button class='button button--red' v-on:click="hideForm">
        Закрыть
      </button>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: ['dot', 'dots'],
    data() {
      return {
        isEditing: false,
      };
    },
    methods: {
      deleteDot(dot) {
        this.$emit('delete-dot', dot);
      },
      showForm() {
        this.isEditing = true;
      },
      hideForm() {
        this.isEditing = false;
      },
    },
  };
</script>

<style>
  .dot {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #111111;
  }

  .dot__title {
    margin-top: 0;
  }
</style>
