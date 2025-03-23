<template>
  <div v-if="post">
    <h2>Edit Post</h2>
    <form @submit.prevent="updatePost">
      <input v-model="post.title" placeholder="Title" required />
      <textarea v-model="post.body" placeholder="Body" required></textarea>
      <input v-model="tags" placeholder="Tags (comma-separated)" />
      <button type="submit">Update</button>
    </form>
  </div>
  <div v-else>
    <p>Post not found.</p>
  </div>
</template>

<script>
import postStore from '../store/postStore';
import getPost from '../composables/getPost';

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      post: null,
      tags: '',
    };
  },
  created() {
    this.post = getPost(this.id); // Fetch the post using the route parameter
    if (this.post) {
      this.tags = this.post.tags.join(', '); // Initialize tags as a comma-separated string
    }
  },
  methods: {
    updatePost() {
      if (this.post) {
        this.post.tags = this.tags.split(',').map(tag => tag.trim()); // Update tags
        postStore.updatePost(this.post); // Update the post in the store
        this.$router.push('/'); // Redirect to Home
      }
    },
  },
};
</script>
