<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense class="pa-1" v-if="this.userName != ''">
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar size="44">
              <img v-if="this.userAvatar != ''" :src="this.userAvatar">
              <v-icon v-else>account_circle</v-icon>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ this.userName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in menuItems"
          :key=item.title
          :to=item.to
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      flat
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Threat Assessment</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => (
    {
      drawer: null,
      dialog: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/', isPublic: false },
        { title: 'Threat Assessment', icon: 'mdi-atom', to: '/tars', isPublic: false },
        { title: 'About', icon: 'mdi-help-box', to: 'about', isPublic: true },
      ],
    }
  ),
  methods: {
    openSettings() {
      this.$router.push({ name: "settings" });
    },
    changeDialog(dialog) {
      this.dialog = dialog;
    }  
  },
  computed: {
    menuItems() {
      return this.items.filter(item => Boolean(this.userName) || item.isPublic == true);

      // If later to change mind to make the link enable/disable
      // return this.items.map(item => ({ ...item, enabled: Boolean(this.userName) || item.isPublic }));
    },
    userName() {
      return localStorage.getItem("userName");
    },
    userAvatar() {
      return localStorage.getItem("userAvatar");
    },
    darkMode() {
      return this.$store.state.settings.darkMode;
    },
    isConfigured() {
      return this.$store.getters.isConfigured;
    },
    isAdmin() {
      return (
        this.$store.getters.getConnectedUser &&
        this.$store.getters.getConnectedUser.is_admin
      );
    },
    ...mapGetters({
      connectedUser: "getConnectedUser"
    })      
  },
  mounted() {
    if (!this.isConfigured) {
      this.openSettings();
    } else {
      this.$vuetify.theme.dark = this.darkMode;
    }
  }
}
</script>

<style>
.v-app-bar-title__content{
  width: 200px !important;
}
</style>
