<template>
  <v-container class="my-10">
    <v-card class="my-10">
      <v-img :src="berita.urlToImage" height="300" />
      <v-card-title
        ><h3>{{ berita.title }}</h3></v-card-title
      >
      <v-card-text>
        <p class="card-text text-muted">
          {{ berita.author === null ? "Author tidak ada" : berita.author }}
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
              <v-col v-for="iconShare in shareOpt" :key="iconShare.iconName">
                <v-item
                  ><v-icon :color="iconShare.color">{{
                    iconShare.iconName
                  }}</v-icon>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
        <v-btn
          color="primary"
          router
          :to="`${berita.title.replaceAll(' ', '=')}`"
          >Read More</v-btn
        >
      </v-container>
    </v-card>
  </v-container>
</template>


<script>
export default {
  props: ["berita"],
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
    };
  },
};
</script>