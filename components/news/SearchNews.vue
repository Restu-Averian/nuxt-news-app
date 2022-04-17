<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen transition="dialog-top-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn @click="dialog = false" dark icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Search News</v-toolbar-title>
        </v-toolbar>

        <!-- Search Bar -->
        <v-container grid-list-xs>
          <v-text-field
            label="Search News"
            v-model="searchField"
            placeholder="Search News by Title..."
            @keyup.enter="searchNews"
            @keypress="showResult == false"
          ></v-text-field>
        </v-container>

        <!-- Result Search Berita -->
        <v-container grid-list-xs v-if="showResult">
          <p class="msg-not-found" v-if="resultNews.length === 0">
            Berita tidak ditemukan
          </p>
          <v-card
            v-for="berita in resultNews"
            :key="berita.title"
            class="my-10"
            v-else
          >
            <v-img :src="berita.urlToImage" height="300" />
            <v-card-title
              ><h3>{{ berita.title }}</h3></v-card-title
            >
            <v-card-text>
              <p class="card-text text-muted">
                {{
                  berita.author === null ? "Author tidak ada" : berita.author
                }}
              </p>
            </v-card-text>
            <v-card-text>
              {{ berita.description }}
            </v-card-text>
            <v-container class="d-flex justify-space-between">
              <v-chip color="black" dark>{{ berita.source.name }}</v-chip>
              <v-item-group>
                <v-container>
                  <v-row>
                    <v-col
                      v-for="iconShare in shareOpt"
                      :key="iconShare.iconName"
                    >
                      <v-item
                        ><v-icon :color="iconShare.color">{{
                          iconShare.iconName
                        }}</v-icon>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-container>
              </v-item-group>
              <v-btn color="primary" @click="readMore(`/${berita.title}`)"
                >Read More</v-btn
              >
            </v-container>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- Dialog Details -->
    <!-- <v-dialog v-model="dialog2" fullscreen transition="dialog-transition">
  
      <router-view></router-view>
    </v-dialog> -->
  </v-row>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      shareOpt: [
        {
          iconName: "mdi-reddit",
          color: "red",
        },
        {
          iconName: "mdi-twitter",
          color: "cyan",
        },
        {
          iconName: "mdi-facebook",
          color: "blue",
        },
        {
          iconName: "mdi-google-plus",
          color: "red",
        },
        {
          iconName: "mdi-linkedin",
          color: "blue",
        },
      ],
      dialog: false,
      resultNews: {},
      searchField: "",
      showResult: false,
    };
  },
  computed: {
    listNews() {
      return this.$store.state.news.berita.articles;
    },
  },
  methods: {
    fetchNews() {
      this.$store.dispatch("berita/fetchNews");
    },
    searchNews() {
      console.log(this.searchField);
      console.log(this.listNews);
      let resSearch = this.listNews.filter((news) => {
        if (news && news.title) {
          if (
            news.title.toLowerCase().indexOf(this.searchField) !== -1 ||
            news.title.indexOf(this.searchField) !== -1 ||
            news.title.toUpperCase().indexOf(this.searchField) !== -1
          ) {
            return news;
          }
        }
        return false;
      });
      console.log(resSearch);
      this.resultNews = resSearch;
      this.showResult = true;
      console.log(this.resultNews);
    },
    readMore(path) {
      this.dialog = false;
      this.$router.push(path);
    },
  },
  mounted() {
    this.fetchNews();
  },
};
</script>

<style scoped>
h2,
.msg-not-found {
  text-align: center;
}
</style>