<template>
  <div class="legend card">
    <div class="usage">
      <div v-for="usage in usageLegend" :key="usage">
        If {{ usage.statment }} then is color: <span :style="{color: usage.color}">{{ usage.name }}</span>
      </div>
    </div>
    <div class="size">
      <div v-for="size in sizeLegend" :key="size">
        If size {{ size.statment }} then is icon 
        <img v-if="size.name === 'small'" height="20px" src="./../assets/img/small.svg">
        <img v-if="size.name === 'big'" height="20px" src="./../assets/img/big.svg">
        <img v-if="size.name === 'bigger'" height="20px" src="./../assets/img/bigger.svg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Legend",
  data() {
    return {
      usageLegend: [
        {name: 'green', color: '#36CA00', statment: 'usage < 50%'},
        {name: 'orange', color: '#F39400', statment: '50% > usage < 70%'},
        {name: 'red', color: '#ff7156', statment: 'usage > 70%'}
      ],
      sizeLegend: [
        {name: 'small', statment: '< 500'},
        {name: 'big',  statment: '> 500'},
        {name: 'bigger',  statment: '> 1000'}
      ]
    }
  }
};
</script>

<style scoped>
  .legend {
    display: flex;
    margin-bottom: 50px;
    padding: 10px;
    justify-content: space-evenly;
  }

  .legend .usage {
    display: flex;
    flex-direction: column;
    margin: 0px 15px;
  }

  .legend .size {
    display: flex;
    flex-direction: column; 
    margin: 0px 15px;
  }
</style>
