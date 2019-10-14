<template>
  <div>
    <p class="tasks">Всего точек: {{dots.length}}</p>
    <dot v-on:delete-dot="deleteDot"
         v-for="dot in dots"
         :dot.sync="dot"
          :dots="dots"></dot>
  </div>
</template>

<script type = "text/javascript" >
import Dot from './Dot';

export default {
  props: ['dots'],
  data() {
      return {
          dotsData: this.dots,
      };
  },
  components: {
    Dot,
  },
  methods: {
    deleteDot(dot)  {
        const dotIndex = this.dots.indexOf(dot);
        this.dots.splice(dotIndex, 1);
      },
  },
};
</script>
