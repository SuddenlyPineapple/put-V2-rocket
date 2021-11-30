<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Connect & Send Bluetooth Event
        </h1>

        <v-btn color="primary" @click="sendEvent">DO IT, PAIR ME!</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PairingButton",
  data: () => ({}),
  methods: {
    sendEvent() {
      this.$store.dispatch("sendEvent");
    },
  },
};
</script>
