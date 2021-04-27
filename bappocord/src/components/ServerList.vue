<template>
  <div class="serverList__container flex-column">
    <div v-for="server in servers" :key="server.name" class="server__container">
      <router-link
        :src="server.icon"
        :to="{
          name: 'Server',
          params: {
            id: server.serverID,
            channelID: server.selectedChannelId,
          },
        }"
        tag="img"
      >
      </router-link>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  data() {
    return {
      servers: null,
    };
  },

  firestore() {
    return {
      servers: db.collection("servers"),
    };
  },
};
</script>

<style>
.serverList__container {
  width: 72px;
  height: 100%;
  background: #202225;
  align-items: center;
}

.server__container img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 5px;
  transition: 0.1s;
}

.server__container img:hover {
  border-radius: 40%;
}
</style>
