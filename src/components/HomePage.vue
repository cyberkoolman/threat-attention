<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4 pa-12">
        <h1 class="display-2 mb-3">
          Threat Assessment
        </h1>

        <p class="subheading font-weight-regular">
          To understand the goal for the Threat Assessment,
          <br>please read online documentations
          <a
            href="#"
            target="_blank"
          >Why Threat Assessment?</a>
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline mb-3 pa-6">
          Submit & Track assessment requests
        </h2>

        <v-row justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HomePage',

    data: () => ({
      ecosystem: [
        {
          text: 'new',
          href: '#',
        },
        {
          text: 'review',
          href: '#',
        },
        {
          text: 'track actvities',
          href: '#',
        },
      ],
    }),
  }
</script>
