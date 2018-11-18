<template>
  <div class="index">
    <div class="container">
      
      <gmap-map :center="centerMap" :zoom="4" style="width:100%;  height: 500px;">
        <gmap-custom-marker 
          :key="index"
          v-for="(m, index) in buildingsMarker" 
          :marker="{lat: m.latitude, lng: m.longitude}">
          <img :class="m.usageClass" v-if="m.icon == 'small'" src="../assets/img/small.svg" />
          <img :class="m.usageClass" v-if="m.icon  == 'big'" src="../assets/img/big.svg" />
          <img :class="m.usageClass" v-if="m.icon  == 'bigger'" src="../assets/img/bigger.svg" />
          <span class="marker-title">{{ m.code }}</span>
        </gmap-custom-marker>
      </gmap-map>
      
      <a @click="toggleLegend()" class="waves-effect waves-light btn-small center-align blue darken-4">Toggle Legend</a>
      <Legend v-if="toggleLegendState"/>
      
      <div class="card">
          <table class="responsive-table highlight">
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
  </div>
</template>
<script>
// import json data
import buildingsJSON from './../assets/json/buildings.json'
import dailyPeaksOfBuildingJSON from './../assets/json/dailyPeaksOfBuilding.json'
import peakOfOccupiedDesksPerBuildingJSON from './../assets/json/peakOfOccupiedDesksPerBuilding.json'
import totalDesksPerBuildingJSON from './../assets/json/totalDesksPerBuilding.json'

import GmapCustomMarker from 'vue2-gmap-custom-marker'
import Legend from '@/components/Legend'

export default {
  name: 'Index',
  components: {
      'gmap-custom-marker': GmapCustomMarker,
      Legend
  },
  data () {
    return {
      buildingsMarker: buildingsJSON.buildings,
      centerMap: { lat: 51.1657, lng: 10.4515 }, // germany coordinates
      buildingSizeIcons: ['small', 'big', 'bigger'], // small: buildingSize < 500, big: buildingSize > 500, bigger: buildingSize > 1000
      toggleLegendState: false
    }
  },
  created() {
    this.addSizeToMarker()
    this.calculateUsageAndCapacity()
    this.addBuildingsSizeIcons()
    this.addBuildingsUsageColors()
  },
  methods: {

    toggleLegend(){
      this.toggleLegendState = !this.toggleLegendState;
    },

    addSizeToMarker() {
      this.buildingsMarker.map((building, index) => {
      if(building.id === totalDesksPerBuildingJSON.stats[index].building.id)
        building.size = totalDesksPerBuildingJSON.stats[index].value
      })
    },

    addBuildingsSizeIcons() {
      this.buildingsMarker.map((building) => {
        if(building.size <= 500)
          building.icon = this.buildingSizeIcons[0]
        if(building.size >= 500)
          building.icon = this.buildingSizeIcons[1]
        if(building.size > 1000)
          building.icon = this.buildingSizeIcons[2]
      })
    },

    addBuildingsUsageColors() {
      this.buildingsMarker.map((building) => {
        if(building.usage <= 50)
          building.usageClass = 'usageSmall' 
        if(building.usage >= 50 && building.usage <= 70 )
          building.usageClass = 'usageMedium' 
        if(building.usage > 70)
          building.usageClass = 'usageLarge' 
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
    margin-bottom: 50px;
  }

  .usageSmall {
    filter: invert(.5) sepia(1) saturate(5) hue-rotate(60deg);
  }

  .usageMedium {
    filter: invert(.5) sepia(1) saturate(5) hue-rotate(0deg);
  }

  .usageLarge {
    filter: invert(.5) sepia(1) saturate(5) hue-rotate(320deg);
  }

  .marker-title {
    font-size: 10pt;
    background-color: white;
    border-radius: 5%;
    padding: 2px 2px;
  }

  .index .btn-small {
    margin: 20px 20px;
  }
</style>
