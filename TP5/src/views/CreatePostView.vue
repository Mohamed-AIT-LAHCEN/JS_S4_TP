<template>
  <div>
    <h2>Create a New Post</h2>
    <form @submit.prevent="submitPost">
      <input v-model="title" placeholder="Title" required />
      <textarea v-model="body" placeholder="Body" required></textarea>
      <input v-model="tags" placeholder="Tags (comma-separated)" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import postStore from '../store/postStore';

export default {
  data() {
    return {
      title: '',
      body: '',
      tags: '',
    };
  },
  methods: {
    submitPost() {
      const newPost = {
        title: this.title,
        body: this.body,
        tags: this.tags.split(',').map(tag => tag.trim()),
      };
      postStore.addPost(newPost); // Save the post to the store
      this.$router.push('/'); // Redirect to Home
    },
  },
};
</script>
