<script setup>
import { usePosts } from "./composables/usePosts";
const { posts, recentPosts, loading, error } = usePosts();
</script>

<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h2>
          <span
            v-if="recentPosts.some((rp) => rp.id === post.id)"
            style="color: red; font-weight: bold"
            >Recent</span
          >
          {{ post.title }}
        </h2>
        <p>{{ post.body }}</p>
      </li>
    </ul>
    <p v-if="loading">Loading...</p>
    <p v-if="error" style="color: red">Error: {{ error }}</p>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

ul li {
  background: #f9f9f9;

  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 250px;
  overflow: scroll;
}
</style>
