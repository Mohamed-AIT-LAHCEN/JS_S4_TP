<template>
  <div>
    <PostList :posts="postStore.posts" />
    <TagCloud :tags="tags" />
  </div>
</template>

<script>
import PostList from '../components/PostList.vue';
import TagCloud from '../components/TagCloud.vue';
import postStore from '../store/postStore';

export default {
  name: "Hom-e",
  components: {
    PostList,
    TagCloud,
  },
  computed: {
    postStore() {
      return postStore;
    },
    tags() {
      // Extract unique tags from posts
      return [...new Set(postStore.posts.flatMap(post => post.tags))];
    },
  },
};
</script>
