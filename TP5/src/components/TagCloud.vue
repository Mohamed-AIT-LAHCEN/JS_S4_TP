<template>
  <div>
    <h4>Tags</h4>
    <ul>
      <li v-for="tag in tags" :key="tag">
        <router-link :to="`/tags/${tag}`">{{ tag }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
};
</script>
