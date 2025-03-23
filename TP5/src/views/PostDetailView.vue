<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <TagCloud :tags="post.tags" />
  </div>
  <div v-else>
    <p>Post not found.</p>
  </div>
</template>

<script>
import TagCloud from '../components/TagCloud.vue';
import getPost from '../composables/getPost';

export default {
  components: {
    TagCloud,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      post: null,
    };
  },
  created() {
    this.post = getPost(this.id); // Fetch the post using the route parameter
  },
};
</script>
