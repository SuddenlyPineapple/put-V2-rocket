<template>
  <GmapMap
    :zoom="14.5"
    :center="center"
    :options="{ styles: gmapStyle }"
    style="width: 100%; height: 500px"
  >
    <GmapMarker :position="center" :clickable="true" />
    <GmapPolyline
      v-if="!!paths"
      :path="paths"
      :options="{
        strokeColor: 'red',
      }"
    />
  </GmapMap>
</template>

<script>
import gmapStyle from "../utils/gmap-style.json";

export default {
  name: "MapDrawer",
  props: {
    paths: {
      type: Array,
      default: () => [],
      required: true,
    },
    lat: {
      type: Number,
      default: () => 0,
      required: true,
    },
    lng: {
      type: Number,
      default: () => 0,
      required: true,
    },
  },
  computed: {
    gmapStyle() {
      return gmapStyle;
    },
    center() {
      const defaultMarker = { lat: this.lat, lng: this.lng };
      return this.paths.length > 0 ? this.paths[0] : defaultMarker;
    },
  },
};
</script>
