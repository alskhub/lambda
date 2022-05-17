<template>
  <v-app id="app">
    <v-container class="col-xl-6 col-lg-5 col-md-6 col-sm-8 col-xs-12">
      <v-main>
        <AppToolbar/>
        <NotesList />
      </v-main>
      <AppFooter/>
      <AppConfirmDialog />
    </v-container>
    
  </v-app>
</template>

<script>
import NotesList from '@/components/NotesList.vue';
import AppToolbar from '@/components/AppToolbar.vue';
import AppFooter from './components/AppFooter.vue';
import AppConfirmDialog from './components/AppConfirmDialog.vue';
import { mapActions } from 'vuex';

export default {
  
  
  methods: {
    ...mapActions([
      'getNotesFromDb',
      'setNotesIntoDb',
      'setDbSnapshot',
    ])
  },
  components: {
    NotesList,
    AppToolbar,
    AppFooter,
    AppConfirmDialog
},
  mounted() {
    this.getNotesFromDb();
  },
  watch: {
  '$store.state.notesModule.notes': {
    deep: true,
    handler() {
      this.setNotesIntoDb();
    }
  }
}
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@200;300;400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap');

#app {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  padding: 30px 0;
  background-color: #FF3CAC;
  background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);

  input,
  input:focus,
  input:active{
    height: 100%;
    width: 100%;
    border: none;
    box-shadow: none;
    outline: none;
    font-size: 16px;
  }
}
</style>
