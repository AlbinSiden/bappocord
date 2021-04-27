<template>
  <div class="channel__container flex-column">
    <div class="serverName__container"></div>
    <div class="channels">
      <div
        v-for="category in channels"
        :key="category.name"
        class="category__container flex-column"
      >
        <div class="category">{{ category.name }}</div>
        <div
          v-for="channel in category.channels"
          :key="channel.id"
          class="channel"
        >
          <router-link
            tag="button"
            :to="{
              name: 'Server',
              params: { id, channelID: channel.channelID },
            }"
            >{{ channel.name }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  data() {
    return {
      id: this.$route.params.id,
      channels: null,
    };
  },

  firestore() {
    return {
      channels: db.collection("channels").doc(this.$route.params.id),
    };
  },
};
</script>

<style>
.channel__container {
  min-width: 248px;
  height: 100%;
  background: #2f3136;
}

.category,
.channel button {
  color: #8e9297;
  text-decoration: none;
  width: 100%;
  background: none;
  outline: none;
  border: none;
}

.channels {
  padding: 10px;
}

.category {
  margin-bottom: 5px;
}

.category__container {
  margin-bottom: 20px;
}

.channel button {
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 8px;
  text-align: start;
}

.channel button:hover {
  background: #34373c;
  color: #dcddde;
}

.channel button:focus {
  background: #393c43;
  color: #fff;
}
</style>
