<template>
  <v-container>
    <v-row v-if="!paired" class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Connect & Send Bluetooth Event
        </h1>
        <v-btn color="primary" @click="connectToDevice">
          DO IT, PAIR ME!
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" lg="4" md="6" sm="12" class="mb-4">
        <div>
          <h3>Raw Logs</h3>
          <p>Device paired successfully 👌 !</p>
          <ul class="text-left overflowScroll" ref="logs">
            <li v-for="item in bleData" :key="item.time">
              Time: {{ item.time }}; Altitude: {{ item.altitude }}; Pressure:
              {{ item.pressure }}; a(x,y,z, sqrt): ({{ item.aX }},
              {{ item.aY }}, {{ item.aZ }}, {{ item.aSqrt }}); g(x,y,z): ({{
                item.gX
              }}, {{ item.gY }}, {{ item.gZ }}); Battery: {{ item.battery }};
              GPSAlt: {{ item.GPSAlt }}; GPSCourse: {{ item.GPSCourse }};
              GPSDate: {{ item.GPSDate }}; GPSLat: {{ item.GPSLat }}; GPSLng:
              {{ item.GPSLng }}; GPSSatCount: {{ item.GPSSatCount }}; GPSSpeed:
              {{ item.GPSSpeed }}; GPSTime: {{ item.GPSTime }};
            </li>
          </ul>
        </div>
      </v-col>
      <v-col cols="12" lg="4" md="6" sm="12" class="mb-4">
        <IndexChart
          name="Altitude"
          :xData="altitude"
          xLabel="Altitude (m)"
          :yData="time"
          yLabel="Time"
        />
      </v-col>
      <v-col cols="12" lg="4" md="6" sm="12" class="mb-4">
        <IndexChart
          name="Battery"
          :xData="battery"
          xLabel="Battery (%)"
          :yData="time"
          yLabel="Time"
        />
      </v-col>
      <v-col cols="12" lg="4" md="6" sm="12" class="mb-4">
        <IndexChart
          name="Pressure"
          :xData="pressure"
          xLabel="Pressure (Pa)"
          :yData="time"
          yLabel="Time"
        />
      </v-col>
      <v-col cols="12" lg="4" md="6" sm="12" class="mb-4">
        <IndexChart
          name="GPS altitude"
          :xData="GPSAlt"
          xLabel="GPS altitude (m above sea level)"
          :yData="time"
          yLabel="Time"
        />
      </v-col>
      <v-col cols="12" lg="4" md="6" sm="12" class="mb-4">
        <IndexChart
          name="GPS Speed"
          :xData="GPSSpeed"
          xLabel="GPS Speed (m/s)"
          :yData="time"
          yLabel="Time"
        />
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="12" class="mb-4">
        <h3>GPS Satellites Count:</h3>
        <h1>{{ GPSSatCountNow }}</h1>
        <h3>GPS Date:</h3>
        <h1>{{ GPSDate.toString() }}</h1>
        <h3>GPS Time:</h3>
        <h1>{{ GPSTime.toString() }}</h1>
      </v-col>
      <v-col cols="12" lg="8" md="8" sm="12" class="mb-4">
        <MapDrawer :lat="52.332121" :lng="16.756599" :paths="GPSPaths" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import IndexChart from "./IndexChart";
import MapDrawer from "./MapDrawer";

export default {
  name: "PairingButton",
  components: { IndexChart, MapDrawer },
  data: () => ({
    paired: false,
    bleData: [],
  }),
  computed: {
    altitude: function () {
      return this.bleData.map((item) => item.altitude);
    },
    time: function () {
      return this.bleData.map((item) => item.time);
    },
    battery: function () {
      return this.bleData.map((item) => item.battery);
    },
    pressure: function () {
      return this.bleData.map((item) => item.pressure);
    },
    GPSAlt: function () {
      return this.bleData.map((item) => item.GPSAlt);
    },
    GPSSatCountNow: function () {
      return this.bleData.length > 0
        ? this.bleData[this.bleData.length - 1].GPSSatCount
        : 0;
    },
    GPSSpeed: function () {
      return this.bleData.map((item) => item.GPSSpeed);
    },
    GPSDate: function () {
      return this.bleData.length > 0
        ? this.bleData[this.bleData.length - 1].GPSDate
        : 0;
    },
    GPSTime: function () {
      return this.bleData.length > 0
        ? this.bleData[this.bleData.length - 1].GPSTime
        : 0;
    },
    GPSPaths: function () {
      return this.bleData.length
        ? this.bleData
            .filter((item) => {
              return item.GPSLat !== 0 && item.GPSLng !== 0;
            })
            .map((item) => {
              return {
                lat: item.GPSLat,
                lng: item.GPSLng,
              };
            })
        : [];
    },
  },
  methods: {
    connectToDevice() {
      navigator.bluetooth
        .requestDevice({
          filters: [
            {
              services: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"],
            },
          ],
        })
        .then((device) => {
          //console.log('"' + device.name + '" bluetooth device selected');
          device.gatt
            .connect()
            .then((server) =>
              server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b")
            )
            .then((service) => {
              //console.log("Connected to service");
              this.paired = true;
              return service.getCharacteristic(
                "beb5483e-36e1-4688-b7f5-ea07361b26a8"
              );
            })
            .then(async (characteristic) => {
              //console.log("Connected to characteristic");
              //console.log(characteristic.properties);
              characteristic.startNotifications().then(() => {
                characteristic.addEventListener(
                  "characteristicvaluechanged",
                  this.handleNotification.bind(this)
                );
              });
            })
            .catch((error) => console.log(error));
        });
    },
    handleNotification(event) {
      const value = event.target.value.buffer;
      const recivedData = JSON.parse(
        String.fromCharCode.apply(null, new Uint8Array(value))
      );
      //console.log("Received ", recivedData);
      this.bleData.push(recivedData);
      this.scrollToBottom();
    },
    scrollToBottom() {
      const container = this.$refs.logs;
      container.scrollTop = container.scrollHeight;
    },
  },
};
</script>

<style scoped>
.overflowScroll {
  overflow-y: scroll;
  height: 300px;
}
ul > li:nth-child(odd) {
  background-color: #f5f5f5;
}

ul {
  list-style-type: none;
  padding-left: 0;
}
</style>
