<template>
  <div class="pa-6">
    <TARList :itemlist=this.assessments></TARList>
    <div class="pt-6"></div>
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-btn v-on="on" style="margin-left: 50%" fab ripple @click="$router.push({ name: 'tar' })">
          <v-icon color="grey">mdi-pencil-outline</v-icon>
        </v-btn>
      </template>
      <span>Create New Threat Assessment</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TARList from '@/components/TARList.vue';

export default {
  name: "ThreatAssessmentRequests",
  components: { 
    TARList
  },
  async created() {
    await this.getTARsAction();
  },
  computed: {
    assessments() {
      return this.$store.state.assessment.assessments
    }
  },
  methods: {
    ...mapActions(['getTARsAction'])
  }
};
</script>
