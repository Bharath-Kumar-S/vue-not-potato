import { ref, onMounted, computed } from "vue";
import { useDelay } from "./useDelay";

export const usePosts = () => {
  const loading = ref(false);
  const error = ref(null);
  const posts = ref([]);

  const fetchPosts = async () => {
    try {
      loading.value = true;
      await useDelay();
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      posts.value = await response.json();
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching posts:", err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchPosts);

  const recentPosts = computed(() => posts.value.slice(0, 5));

  return { posts, recentPosts, loading, error };
};
