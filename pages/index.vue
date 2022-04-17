<template>
  <v-container grid-list-xs>
    <NewsItemNews
      v-for="(list, index) in listNews"
      :key="index"
      :berita="list"
    />
    <v-btn class="d-block m-auto my-5" color="primary" @click="fetchNewsMore">
      More News
    </v-btn>
  </v-container>
</template>


<script>
export default {
  computed: {
    listNews() {
      return this.$store.state.news.berita.articles;
    },
  },
  methods: {
    fetchNews() {
      this.$store.dispatch("news/fetchNews");
    },
    fetchNewsMore() {
      this.$store.dispatch("news/fetchNewsMore");
    },
  },
  mounted() {
    this.fetchNews();
  },
};
</script>