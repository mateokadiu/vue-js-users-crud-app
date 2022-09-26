<template>
  <v-app>
    <v-main>
      <UsersList />
    </v-main>
  </v-app>
</template>

<script>
import UsersList from "./components/UsersList.vue";
export default {
  name: "App",

  components: {
    UsersList,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
body {
  background: #f5f5f5;
}
</style>
