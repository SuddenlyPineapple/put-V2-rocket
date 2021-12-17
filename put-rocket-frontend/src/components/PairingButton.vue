<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Connect & Send Bluetooth Event
        </h1>
        <v-btn v-if="!paired" color="primary" @click="connectToDevice">
          DO IT, PAIR ME!
        </v-btn>
        <div v-else>
          <p>Device paired successfully 👌 !</p>
          <ul class="text-left">
            <li v-for="item in bleData" :key="item.time">
              Time: {{ item.time }}; Altitude: {{ item.altitude }}; Pressure:
              {{ item.pressure }}; a(x,y,z, sqrt): ({{ item.aX }},
              {{ item.aY }}, {{ item.aZ }}, {{ item.aSqrt }}); g(x,y,z): ({{
                item.gX
              }}, {{ item.gY }}, {{ item.gZ }}); Battery: {{ item.battery }};
            </li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PairingButton",
  data: () => ({
    paired: false,
    bleData: [],
  }),
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
          console.log('"' + device.name + '" bluetooth device selected');

          device.gatt
            .connect()
            .then((server) =>
              server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b")
            )
            .then((service) => {
              console.log("Connected to service");
              this.paired = true;
              return service.getCharacteristic(
                "beb5483e-36e1-4688-b7f5-ea07361b26a8"
              );
            })
            .then(async (characteristic) => {
              console.log("Connected to characteristic");
              console.log(characteristic.properties);
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
      console.log("Received ", recivedData);
      this.bleData.push(recivedData);
    },
  },
};
</script>
