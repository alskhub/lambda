<template> 
  <v-toolbar dark>
    <img src="@/assets/logo.png"  height="25" widht="25"/> 

    <v-toolbar-title class="ml-2"> Noted</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn 
        v-if="notesSnapshotListLength > 0" 
        class="mr-1"  
        @click="getDbSnapshot()" 
        icon
    >
        <v-icon size="22px">mdi-arrow-u-left-top</v-icon>
    </v-btn>

    <v-btn class="mr-1" @click="addNote()" icon>
        <v-icon size="22px">mdi-plus-circle-outline</v-icon>
    </v-btn>

    <v-menu 
        left 
        offset-y
        origin="center center"
        transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
         <v-btn
            class="mr-0"
            v-bind="attrs"
            v-on="on" 
            icon
            large
        >
            <v-icon size="22px">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in toolBarMenu"
          :key="index"
          @click="item.handler()"
        >{{ item.title }}</v-list-item>
      </v-list>
    </v-menu>
    </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "AppToolbar",
    data() {
        return {
            toolBarMenu: [
                {
                    title: 'Import notes',
                    handler: () => {
                    }
                },
                {
                    title: 'Export notes',
                    handler: () => this.exportNotes()
                },
                {
                    title: 'Clear notes',
                    handler: () => this.clearNotesDb()
                }
            ]
        }
    },
    computed: {
        ...mapGetters([
            'notesList',
            'notesSnapshotListLength',
        ])
    },
    methods: {
        ...mapActions([
            'addNote',
            'getDbSnapshot',
            'exportNotes',
            'clearNotesDb',
        ])
    },
};
</script>


<style lang="scss" scoped>

</style>
