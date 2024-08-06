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
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const { vAlert, vSuccess } = useAlert();
const props = defineProps({
  id: [String, Number],
});

const router = useRouter();
// const route = useRoute();
// const id = route.params.id;

// 게시글 가져오기
const { data: post, error, loading } = useAxios(`/posts/${props.id}`);

// 페이지 삭제
const {
  error: removeError,
  loading: removeLoading,
  excute,
} = useAxios(
  `/posts/${props.id}`,
  {
    method: 'delete',
  },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('삭제가 완료되었습니다!');
      router.push({ name: 'PostList' });
    },
    onError: err => {
      vAlert(err.message);
    },
  },
);

const remove = async () => {
  if (confirm('삭제하시겠습니까?') === false) {
    return;
  }
  excute();
};

// 페이지 이동
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
  router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
