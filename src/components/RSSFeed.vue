<template>
  <q-page class="flex flex-center">
    <div class="flex flex-center row q-gutter-md q-pa-lg">
      <q-card class="card" v-for="(item) in items">
        <q-card-section horizontal>

          <div class="card-icon" v-html="generateImgElement(item)"></div>

          <q-card-section style="width: 100%;">
            <div v-if="typeof item.title !== 'undefined'" class="text-h6" v-html="item.title"></div>
            <div v-if="typeof item.author !== 'undefined'" class="text-subtitle2">by {{ item.author }}</div>
            <q-scroll-area class="card-description">
              <div v-if="typeof item.description !== 'undefined'" v-html="item.description['#text']"></div>
            </q-scroll-area>
            <q-card-actions align="right">
              <q-btn v-if="typeof item.link !== 'undefined'" round dense flat icon="send" @click="openLink(item.link)" />
            </q-card-actions>

          </q-card-section>

        </q-card-section>


      </q-card>
    </div>

  </q-page>
</template>

<style></style>

<script>

import { XMLParser } from 'fast-xml-parser'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export default {
  name: 'RSSFeed',
  data() {
    return {
      items: {},
      site: "https://dmelo.eu/index.xml"
    }
  },
  mounted() {
    this.getListFromXML(this.site).then((value) => {
      this.items = value;
      console.log(value)
    });
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank').focus();
    },
    generateImgElement(item) {
      try {
        let link = item.description.img['@_src'];
        if (link.match(/\.(jpeg|jpg|gif|png)$/) != null) {
          return "<img class=\"card-icon\" src=\"" + link + "\" >"
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getListFromXML(url) {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();
      const options = {
        ignoreAttributes: false,
        cdataPropName: "__cdata"
      };

      const parser = new XMLParser(options);
      let jsonObj = parser.parse(text);
      return jsonObj.rss.channel.item
    }
  },
}



const firebaseConfig = {
  apiKey: "AIzaSyCXPh_qT_9JTEbiUzFU57-fZZbDug63RiI",
  authDomain: "ddavidmelo-14dc2.firebaseapp.com",
  databaseURL: "https://ddavidmelo-14dc2.firebaseio.com",
  projectId: "ddavidmelo-14dc2",
  storageBucket: "ddavidmelo-14dc2.appspot.com",
  messagingSenderId: "211150998925",
  appId: "1:211150998925:web:2098c2ff8f71989ad141c4"
};

const vapidKey = 'BLqsnB1ivhiqR1g7OYw575D57eulxiV1-Oe4xlj7vgF-o-eSTpmLD14srIkC5I5NNPMooHYcCwTqK2u1TSG1u7Q'

const app = initializeApp(firebaseConfig);


// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

getToken(messaging, { vapidKey: vapidKey }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    console.log("Token is:", currentToken);
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

</script>

<style>
.card {
  width: 100%;
}

.card-icon {
  max-height: 250px;
  max-width: 250px;
  border-radius: 5px !important;
}

.card-description {
  height: 100px;
  width: 100%;
}

@media only screen and (max-width: 400px) {
  .card-icon {
    max-height: 100px;
    max-width: 100px;
    border-radius: 5px !important;
  }
}
</style>
