<template>
  <div id="app" class="flex-row">
    <ServerList />
    <div class="content">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script>
import ServerList from "./components/ServerList";

export default {
  components: {
    ServerList,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap");

* {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

#app,
html,
body {
  width: 100%;
  height: 100%;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}
</style>
