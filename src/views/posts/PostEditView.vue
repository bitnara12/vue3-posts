<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm
      @submit.prevent="edit"
      v-model:title="form.title"
      v-model:content="form.content"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
  </div>
  <!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" /> -->
  <AppAlert :items="alerts"></AppAlert>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById, updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const form = ref({
  title: null,
  content: null,
});

// 게시글 가져오기
const fetchPost = async () => {
  try {
    const { data } = await getPostById(id);
    setForm(data);
  } catch (error) {
    console.error(error);
    vAlert(error.message);
  }
};
const setForm = ({ title, content }) => {
  form.value.title = title;
  form.value.content = content;
};
fetchPost();

// 수정
const edit = async () => {
  try {
    await updatePost(id, { ...form.value });
    vAlert('수정이 완료되었습니다!', 'success');
    router.push({ name: 'PostDetail', params: { id } });
  } catch (error) {
    console.error(error);
    vAlert(error.message);
  }
};

// 페이지 이동
const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });

// alert (Transition)
// const showAlert = ref(false);
// const alertMessage = ref('');
// const alertType = ref('');
// const vAlert = (message, type = 'error') => {
//   showAlert.value = true;
//   alertMessage.value = message;
//   alertType.value = type;
//   setTimeout(() => {
//     showAlert.value = false;
//   }, 2000);
// };

// alert (Transition Group)
const alerts = ref([]);
const vAlert = (message, type = 'error') => {
  alerts.value.push({ message, type });
  setTimeout(() => {
    alerts.value.shift();
  }, 2000);
};
</script>

<style lang="scss" scoped></style>
