<template>
  <div>
    <h3>{{ post.title }}</h3>
    <p>Tags: {{ post.tags.join(', ') }}</p>
    <p>{{ snippet }}</p>
    <router-link :to="`/post/${post.id}`">Read More</router-link> |
    <router-link :to="`/editPost/${post.id}`">Edit</router-link>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    snippet() {
      return this.post.body.substring(0, 50);
    },
  },
};
</script>
