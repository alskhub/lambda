<template> 
    <v-row justify="center">
    <v-dialog
      v-model="confirmDialogSettings.showed"
      persistent
      max-width="250"
    >
      <v-card>
        <v-card-title class="text-h5">{{ confirmDialogSettings.title }}</v-card-title>
        <v-card-text>{{ confirmDialogSettings.text }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="regular"
            @click="confirmDialogSettings.denideHandler()"
            text
          >
            Cancel
          </v-btn>
          <v-btn
            width="50%"
            color="green darken-1"
            @click="confirmDialogSettings.successHandler()"
            text
          >
            Сonfirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "AppConfirmDialog",
    props: ['confirmData'],
    computed: {
    ...mapGetters([
      'confirmDialogSettings',
    ]),
  },
};
</script>


<style lang="scss" scoped>
</style>
