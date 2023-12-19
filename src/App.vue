<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar dense>
        <q-toolbar-title>
          D-RSS
        </q-toolbar-title>
        <q-btn round dense flat icon="install_mobile" @click="install()" />
      </q-toolbar>
    </q-header>


    <q-page-container>
      <RSSFeed />
    </q-page-container>
  </q-layout>
</template>

<script>
import RSSFeed from './components/RSSFeed.vue'

export default {
  name: 'LayoutDefault',

  components: {
    RSSFeed
  },
  data() {
    return {
      deferredPrompt: null
    };
  },
  setup () {
    return {
    }
  },
  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
  },
  methods: {
    async install() {
      this.deferredPrompt.prompt();
    }
  }
}
</script>
