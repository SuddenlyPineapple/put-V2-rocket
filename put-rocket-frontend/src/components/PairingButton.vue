<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Connect & Send Bluetooth Event
        </h1>
        <v-btn v-if="{ paired }" color="primary" @click="connectToDevice">
          DO IT, PAIR ME!
        </v-btn>
        <p v-else>Device paired successfully 👌 !</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PairingButton",
  data: () => ({
    paired: false,
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
            .then((server) => {
              return server.getPrimaryService(
                "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
              );
            })
            .then((service) => {
              console.log("Service found, getting characteristic...");

              service
                .getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8")
                .then((characteristic) => {
                  console.log("Notifications started");
                  characteristic.writeValue(
                    new TextEncoder().encode("Dupencja na 3")
                  );
                });
            })
            .catch((err) => {
              console.error("Something is not yes", err);
            });
        });
    },
  },
};
</script>
