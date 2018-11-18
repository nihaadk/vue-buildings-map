<template>
  <div class="index">
    <div class="container">
      <gmap-map :center="centerMap" :zoom="2" style="width:100%;  height: 400px;">
        <gmap-marker
        :key="index"
        v-for="(m, index) in buildingsMarker"
        :position="{lat: m.latitude, lng: m.longitude}"
        ></gmap-marker>
      </gmap-map>

      <table class="responsive-table">
        <thead>
          <tr>
              <th>Building</th>
              <th>Size</th>
              <th>Usage</th>
              <th>Capacity</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="building in buildingsMarker" :key="building.id">
            <td>{{ building.code }}</td>
            <td>{{ building.size }}</td>
            <td>{{ building.usage }}%</td>
            <td>{{ building.capacity }}</td>
          </tr>
        </tbody>
      </table>
     
    </div>
  </div>
</template>
<script>
// import json data
import buildingsJSON from './../assets/json/buildings.json';
import dailyPeaksOfBuildingJSON from './../assets/json/dailyPeaksOfBuilding.json';
import peakOfOccupiedDesksPerBuildingJSON from './../assets/json/peakOfOccupiedDesksPerBuilding.json';
import totalDesksPerBuildingJSON from './../assets/json/totalDesksPerBuilding.json';

export default {
  name: 'Index',
  data () {
    return {
      buildingsMarker: buildingsJSON.buildings,
      centerMap: { lat: 51.1657, lng: 10.4515 } // germany coordinates
    }
  },
  created() {
    this.addSizeToMarker();
    this.calculateUsageAndCapacity();
  },
  methods: {

    addSizeToMarker() {
      this.buildingsMarker.map((building, index) => {
      if(building.id === totalDesksPerBuildingJSON.stats[index].building.id)
        building.size = totalDesksPerBuildingJSON.stats[index].value

      })
    },

    calculateUsageAndCapacity() {
      totalDesksPerBuildingJSON.stats.map((totalDesk, index) => {
        let capacity = 0
        let usage = 0
        peakOfOccupiedDesksPerBuildingJSON.stats.map((occupiedDesk) => {
          if(occupiedDesk.building.id === totalDesk.building.id) {
            
            capacity = totalDesk.value - occupiedDesk.value
            usage = ((occupiedDesk.value * 100) / totalDesk.value)
            
            this.buildingsMarker[index].capacity = capacity
            this.buildingsMarker[index].usage = usage.toFixed(0)
          }
        })
      })
    }
  } 
}
</script>

<style scoped>
  .index {
    padding-top: 25px;
  }

  .index table {
    margin-top: 50px;
  }
</style>
