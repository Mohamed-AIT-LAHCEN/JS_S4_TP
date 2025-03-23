import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CreatePostView from '../views/CreatePostView.vue';
import PostDetailView from '../views/PostDetailView.vue';
import EditPostView from '../views/EditPostView.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/addPost', name: 'AddPost', component: CreatePostView },
  { path: '/post/:id', name: 'PostDetail', component: PostDetailView, props: route => ({ id: Number(route.params.id) }) },
  { path: '/editPost/:id', name: 'EditPost', component: EditPostView, props: route => ({ id: Number(route.params.id) }) },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
