<template>
  <div class="flex-row content__wrapper">
    <Channels />
    <Messages/>
  </div>
</template>

<script>
import Channels from "../components/Channels";
import Messages from "../components/Messages";

export default {
  components: {
    Channels,
    Messages,
  },
};
</script>

<style>
.content__wrapper {
  height: 100%;
}
</style>
