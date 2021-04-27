<template>
  <div class="messages__container">
    <div
      v-for="(message, index) in messages.messages"
      :key="`${message.name}_${index}`"
    >
      <div class=" flex-column">
        <div class="message flex-row">
          <div class="pfp">
            <img :src="message.authorPFP" alt="" />
          </div>
          <div class="msg__info flex-column">
            <span class="username">{{ message.authorName }}</span>
            <div class="msg">{{ message.message }}</div>
          </div>
        </div>
        <div class="seperator"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  data() {
    return {
      messages: null,
      id: this.$route.params.channelID,
    };
  },

  firestore() {
    return {
      messages: db.collection("messages").doc(this.$route.params.channelID),
    };
  },
};
</script>

<style>
.messages__container {
  background: #36393f;
  flex: 1;
}

.message {
  height: 48px;
  padding: 20px;
}

.pfp img {
  border-radius: 100%;
  height: 40px;
}

.username {
  color: #fff;
}

.msg {
  color: #dcddde;
}

.msg__info {
  padding-left: 20px;
}

.seperator {
  width: calc(100% - 40px);
  height: 2px;
  background: #72767d;
  border-radius: 8px;
  align-self: center;
  justify-self: center;
}
</style>
