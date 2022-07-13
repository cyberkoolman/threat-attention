<template>
    <div>
        <v-text-field v-model="this.taritem.name" label="Threat Assessment for" required></v-text-field>
        <v-text-field v-model="this.taritem.contacts" label="Contacts" requried></v-text-field>
        <v-text-field v-model="this.taritem.snaprisk" label="Snap Risk Reference"></v-text-field>
        <v-text-field v-model="this.taritem.tags" label="Tags"></v-text-field>
        <v-text-field v-model="this.taritem.desc" label="Brief description"></v-text-field>
        <div class="pb-6">
            <v-btn color="primary" onclick="document.getElementById('fileDataFlow').click();">Upload Data Flow diagram</v-btn>
        </div>
        <input type="file" style="display:none" id="fileDataFlow" @change="onFileChange" />
        <div id="preview">
            <img v-if="this.taritem.dataflowurl" :src="this.taritem.dataflowurl" />
        </div>
        <v-textarea v-model="this.taritem.usecases" filled label="Use Cases" rows="2" auto-grow value=""></v-textarea>
        <v-textarea v-model="this.taritem.whatwrongs" filled label="What could go wrong?" rows="2" auto-grow value=""></v-textarea>
    </div>
</template>

<script>
export default{
  name: 'TARDescription',
  props: {
    item: {}
  },
  data() {
    return {
      taritem: {}
    }
  },
  created() {
    this.taritem = this.item;
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.taritem.dataflowurl = URL.createObjectURL(file);
    }
  }
}
</script>

<style scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>
