<template>
  <div>
    <h2>게시글 목록</h2>
    <!-- search -->
    <hr class="my-4" />
    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    />
    <!-- 게시글 내용 (PostItem) -->
    <hr class="my-4" />
    <AppLoading v-if="loading" />
    <AppError v-else-if="error" :message="error.message" />
    <template v-else>
      <AppGrid :items="posts">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
          />
        </template>
      </AppGrid>
      <!-- Pagination -->
      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="page => (params._page = page)"
      />
    </template>

    <!-- 모달 -->
    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :created-at="modalCreatedAt"
      />
    </Teleport>

    <!-- 게시글 내용 미리보기 (AppCard) -->
    <hr class="my-5" />
    <AppCard>
      <PostDetailView :id="'1'"></PostDetailView>
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';

import { computed, ref, watchEffect } from 'vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';

// pagination
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
  content_like: '',
});

const totalCount = ref(0);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit),
);

// 로딩, 에러
const error = ref(null);
const loading = ref(false);

// 게시글 가져오기
const posts = ref([]);
const fetchPosts = async () => {
  try {
    loading.value = true;
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers['x-total-count'];
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};
// 반응형 상태가 변경되었을 때 해당 콜백함수를 다시 호출
// fetchPosts();
watchEffect(fetchPosts);

// 페이지 이동
const router = useRouter();
const goPage = id => {
  router.push({
    name: 'PostDetail',
    params: { id },
  });
};

// 모달
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const openModal = ({ title, content, createdAt }) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
