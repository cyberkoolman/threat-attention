<template>
  <div>
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="warning" dark class="mb-2" v-bind="attrs" v-on="on">
          + Abuse Case
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
                  v-model="editedItem.scenario"
                  label="Abuse Case / Threat Scenario"
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
                  v-model="editedItem.riskScore"
                  label="Risk Score"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.mitigation"
                  label="Mitigation"
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
      :items="abusecases"
      hide-default-footer
      class="elevation-1">
      <template v-slot:[`item.tags`]="{ item }">
        <v-chip v-for="tag in item.tags" :key="tag">
          {{ tag }}
        </v-chip>
      </template>
      <template v-slot:[`item.riskScore`]="{ item }">
        <v-chip :color="getRiskColor(item.riskScore)">
          {{ abbrevByFirst(item.riskScore) }}
        </v-chip>
      </template>
      <template v-slot:[`item.mitigation`]="{ item }">
        <v-icon :color="getMitigationColor(item.mitigation)">
          {{ getMitigationIcon(item.mitigation) }}
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
  name: 'AbuseCase',
  data() {
    return {
      dialog: false,
      dialogDelete: false,      
      headers: [
        { text: "No", sortable: false, value: "id" },
        { text: "Abuse Case / Threat Scenario", sortable: false, value: "scenario" },
        { text: "Tags / Keywords", sortable: false, value: "tags" },
        { text: "Risk", sortable: false, value: "riskScore" },
        { text: "Mitigate", sortable: false, value: "mitigation" },
        { text: "Edit", sortable: false, value: "actions" },
      ],      
      abusecases: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        scenario: '',
        tags: [],
        riskScore: 'Low',
        mitigation: false
      },
      defaultItem: {
        id: 0,
        scenario: '',
        tags: [],
        riskScore: 'Low',
        mitigation: false
      }
    };
  },
  async created() {
    console.log('populated abuse cases');
    await this.loadAbuseCases();
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Abuse Case / Threat' : 'Edit Abuse Case / Threat'
    },
  },  
  methods: {
    async loadAbuseCases() {
      this.abusecases = [];
      this.message = 'fetching Abuse Cases ...';
      this.abusecases = await data.getAbuseCases();
      this.message = '';
    },
    getRiskColor (risk) {
        if (risk === "High") return 'red'
        else if (risk === "Moderate") return 'orange'
        else return 'green'
    },
    getMitigationColor (mitigation) {
        if (mitigation === "Research") return 'red'
        else if (mitigation === "WIP") return 'orange'
        else return 'green'
    },
    abbrevByFirst(stringdata) {
      return stringdata.charAt(0);
    },
    getMitigationIcon(mitigation) {
        if (mitigation === "Research") return 'mdi-feature-search-outline'
        else if (mitigation === "WIP") return 'mdi-progress-pencil'
        else return 'mdi-check'
    },
    createAbuseCase() {

    },
    editItem (item) {
      this.editedIndex = this.abusecases.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.abusecases.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.abusecases.splice(this.editedIndex, 1)
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
      this.editedItem.id = this.abusecases.length + 1
      if (this.editedIndex > -1) {
        Object.assign(this.abusecases[this.editedIndex], this.editedItem)
      } else {
        this.abusecases.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
