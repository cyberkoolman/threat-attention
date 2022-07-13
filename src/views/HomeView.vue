<template>
  <HomePage />
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import HomePage from '../components/HomePage'

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters({
      user: "getConnectedUser",
    })
  },
  components: {
    HomePage,
  },
}
</script>
