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
      <RSSFeed v-if="checkConnection" />
      <q-dialog v-model="checkConnectionOffline">
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
            <span class="q-ml-sm">You are currently not connected to any network.</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
      deferredPrompt: null,
      checkConnection: navigator.onLine,
      checkConnectionOffline: !navigator.onLine, 
    };
  },
  setup() {
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
