import { reactive } from 'vue';

const postStore = reactive({
  posts: [
    {
      id: 1,
      title: 'Understanding Vue.js',
      body: 'Vue.js is a progressive JavaScript framework for building user interfaces...',
      tags: ['JavaScript', 'Vue', 'Frontend'],
    },
    {
      id: 2,
      title: 'Getting Started with Node.js',
      body: 'Node.js is a runtime environment that allows you to run JavaScript on the server...',
      tags: ['JavaScript', 'Node.js', 'Backend'],
    },
    {
      id: 3,
      title: 'CSS Grid vs Flexbox',
      body: 'CSS Grid and Flexbox are two powerful layout systems in CSS...',
      tags: ['CSS', 'Frontend', 'Design'],
    },
  ],
  addPost(post) {
    post.id = this.posts.length + 1; // Assign a new ID
    this.posts.push(post);
  },
  updatePost(updatedPost) {
    const index = this.posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = { ...updatedPost }; // Update the post in the store
    }
  },
});

export default postStore;
