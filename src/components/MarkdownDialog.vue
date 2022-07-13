<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Preview in Markup
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Preview in Markup</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn text @click="dialog = false">
                Export Markdown File
                <v-icon right>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div style="padding: 25px" v-html="mdContentHtml"></div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { marked } from "marked";
import highlight from 'highlight.js';
import 'highlight.js/styles/github.css';

export default {
  props: {
    show: Boolean,
    mdContent: String,
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
  computed: {
    mdContentHtml() {
      return marked(this.mdContent, {
        highlight(md) {
            return highlight.highlightAuto(md).value;
        }
      });
    },
    showDialog: {
      get() {
        return this.show;
      },
      set(show) {
        this.$emit("close", show);
      },
    },
  },
  components: {},
};
</script>