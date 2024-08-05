<template>
  <div>
    <h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message" />
    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">
          목록
        </button>
        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>저장</template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';

const { vAlert, vSuccess } = useAlert();

const router = useRouter();
const form = ref({
  title: null,
  content: null,
});

const loading = ref(false);
const error = ref(null);

// 저장
const save = async () => {
  try {
    loading.value = true;
    await createPost({
      ...form.value,
      createdAt: Date.now(),
    });
    vSuccess('등록이 완료되었습니다!');
    router.push({ name: 'PostList' });
  } catch (err) {
    error.value = err;
    vAlert('네트워크 오류');
  } finally {
    loading.value = false;
  }
};

// 페이지 이동
const goListPage = () => router.push({ name: 'PostList' });
const visibleForm = ref(true);
</script>

<style lang="scss" scoped></style>
