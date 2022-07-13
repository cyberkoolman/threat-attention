<template>
  <div class="pa-6">
    <MarkdownDialog :show="mdPreviewDialog" :mdContent=this.mdPreviewContent @close="closeMdPreviewDialog"></MarkdownDialog>
    <v-form ref="form" lazy-validation>
      <TARDescription :item=this.assessment></TARDescription>
      <AbuseCase></AbuseCase>
      <v-divider class="pt-6"></v-divider>
      <Mitigation></Mitigation>
      <v-divider class="pt-6"></v-divider>
      <v-btn color="info" class="mr-4" @click="todo">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { cloneDeep } from 'lodash';
import TARDescription from '@/components/TARDescription.vue';
import AbuseCase from '@/components/AbuseCase.vue';
import Mitigation from '@/components/Mitigation.vue';
import MarkdownDialog from '@/components/MarkdownDialog.vue';

export default {
  name: "ThreatAssessment",
  props: {
    id: ""
  },
  data() {
    return {
      assessment: {},
      mdContent: "",
      mdPreviewDialog: false
    }
  },
  components: { 
    TARDescription, 
    AbuseCase,
    Mitigation,
    MarkdownDialog
  },
  created() {
    if (this.isAddMode) {
      this.assessment = {}
    }
    else {
      this.assessment = cloneDeep(this.getTarById(this.id));
      this.assessment.abusecases = cloneDeep(this.getAbuseCasesById(this.id));
    }
  },
  computed: {
    ...mapGetters(['getTarById', 'getAbuseCasesById']),
    mdPreviewContent() {
      this.mdContent = '## ' + this.assessment.name + '\n\n';
      this.mdContent += '**Contacts**: ' + this.assessment.contacts + '\n\n';
      this.mdContent += '**Snap Risk Assessment**: ' + this.assessment.snaprisk + '\n\n';
      this.mdContent += '**Tags**: ' + this.assessment.tags + '\n\n';
      this.mdContent += '**Brief Description**: ' + this.assessment.desc + '\n\n';
      this.mdContent += '![Data Flow Diagram](' + this.assessment.dataflowurl + ')\n\n';
      this.mdContent += '**Use Cases**: ' + this.assessment.usecases + '\n\n';
      this.mdContent += '**What Could Go Wrong**: ' + this.assessment.whatwrongs + '\n\n';
      this.mdContent += '**Abuse Cases**: ' + this.assessment.abusecases + '\n\n';

      return this.mdContent;
    },
    isAddMode() {
      return !this.id;
    }
  },
  methods: {
    ...mapActions(['getTARsAction']),
    todo() {},
    closeMdPreviewDialog(dialog) {
      this.mdPreviewDialog = dialog;
    }
  }
};
</script>
