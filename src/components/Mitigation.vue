<template>
  <div>
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
          + Mitigation
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.mitigation"
                  label="Mitigation"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.tags"
                  label="Tags / Keywords"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.status"
                  label="Status"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table 
      :headers="headers" 
      :items="mitigations"
      hide-default-footer
      class="elevation-1">
      <template v-slot:[`item.tags`]="{ item }">
        <v-chip v-for="tag in item.tags" :key="tag">
          {{ tag }}
        </v-chip>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-icon :color="getMitigationColor(item.status)">
          {{ getMitigationIcon(item.status) }}
        </v-icon>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>      
    </v-data-table>
  </div>  
</template>

<script>
import { data } from '@/data';

export default {
  name: 'Mitigation',
  data() {
    return {
      dialog: false,
      dialogDelete: false,      
      headers: [
        { text: "No", sortable: false, value: "id" },
        { text: "Mitigation", sortable: false, value: "mitigation" },
        { text: "Tags / Keywords", sortable: false, value: "tags" },
        { text: "Status", sortable: false, value: "status" },
        { text: "Edit", sortable: false, value: "actions" },
      ],      
      mitigations: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        mitigation: '',
        tags: [],
        status: "WIP"
      },
      defaultItem: {
        id: 0,
        mitigation: '',
        tags: [],
        status: "WIP"
      }
    };
  },
  async created() {
    console.log('populated mitigations');
    await this.loadMitigations();
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Mitigation' : 'Edit Mitigation'
    },
  },  
  methods: {
    async loadMitigations() {
      this.mitigations = [];
      this.message = 'fetching Mitigations ...';
      this.mitigations = await data.getMitigations();
      this.message = '';
    },
    getMitigationColor (mitigation) {
        if (mitigation === "Research") return 'red'
        else if (mitigation === "WIP") return 'orange'
        else return 'green'
    },
    getMitigationIcon(mitigation) {
        if (mitigation === "Research") return 'mdi-feature-search-outline'
        else if (mitigation === "WIP") return 'mdi-progress-pencil'
        else return 'mdi-check'
    },
    createMitigation() {

    },
    editItem (item) {
      this.editedIndex = this.mitigations.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.mitigations.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.mitigations.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      this.editedItem.id = this.mitigations.length + 1
      if (this.editedIndex > -1) {
        Object.assign(this.mitigations[this.editedIndex], this.editedItem)
      } else {
        this.mitigations.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
