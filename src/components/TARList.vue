<template>
    <v-data-table 
        :headers="headers" 
        :items="itemlist"
        class="elevation-1">
        <template v-slot:[`item.name`]="{ item }">
        <router-link :to="{ name: 'tar-edit-view', params: { id: item.id }}">{{ item.name }}</router-link>
        </template>
        <template v-slot:[`item.tags`]="{ item }">
        <v-chip v-for="tag in item.tags" :key="tag">
            {{ tag }}
        </v-chip>
        </template>
    </v-data-table>
</template>

<script>
export default {
  name: "TARList",
  props: {
    itemlist: []
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Created", value: "created" },
        { text: "Author", value: "author" },
        { text: "Tags", value: "tags" }
      ],
    }
  }
}
</script>
