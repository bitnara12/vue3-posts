<template>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <div class="text-muted">
      {{ $dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
    </div>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message" />
    <div class="row">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button
          @click="remove"
          class="btn btn-outline-danger"
          :disabled="removeLoading"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>삭제</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { getPostById, deletePost } from '@/api/posts';
import { ref } from 'vue';
import { useAlert } from '@/composables/alert';

const { vAlert } = useAlert();
const props = defineProps({
  id: [String, Number],
});

const router = useRouter();
// const route = useRoute();
// const id = route.params.id;
const post = ref({});

// 로딩, 에러
const error = ref(null);
const loading = ref(false);

// 게시글 가져오기
const fetchPost = async () => {
  try {
    loading.value = true;
    const { data } = await getPostById(props.id);
    setPost(data);
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};
const setPost = ({ title, content, createdAt }) => {
  post.value.title = title;
  post.value.content = content;
  post.value.createdAt = createdAt;
};
fetchPost();

// 페이지 삭제
const removeError = ref(null);
const removeLoading = ref(false);
const remove = async () => {
  try {
    if (confirm('삭제하시겠습니까?') === false) {
      return;
    }
    removeLoading.value = true;
    await deletePost(props.id);
    router.push({ name: 'PostList' });
  } catch (err) {
    vAlert(err.message);
    removeError.value = err;
  } finally {
    removeLoading.value = false;
  }
};

// 페이지 이동
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
  router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
