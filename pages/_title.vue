<template>
  <v-container>
    <v-img height="400" :src="detailNews.urlToImage" alt="" />
    <h2>{{ $route.params.title.replace(/=/gi, " ") }}</h2>
    <p>{{ detailNews.author }}</p>
    <p>{{ detailNews.content }}</p>
    <p>
      Lanjut baca sini....
      <a :href="detailNews.url" target="_blank">Berita Selengkapnya</a>
    </p>
    <v-btn color="primary" outlined @click="backBefore"
      ><v-icon left>mdi-arrow-left</v-icon>Kembali</v-btn
    >
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      detailNews: {},
    };
  },
  computed: {
    fetchNews() {
      return this.$store.state.news.berita.articles;
    },
  },
  mounted() {
    this.filterNews();
  },
  methods: {
    filterNews() {
      let title = this.$route.params.title.replaceAll("=", " ");
      // console.log("===Fetch News===");
      // console.log(this.fetchNews);
      let berita = this.fetchNews.filter((dataNews) => {
        return dataNews.title == title;
      });
      // console.log("===Berita===");
      console.log(berita);
      this.detailNews = berita[0];
    },
    backBefore() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>