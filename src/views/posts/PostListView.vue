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
    <!-- 모달 -->
    <AppModal :show="show" title="게시글" @close="closeModal">
      <template #default>
        <div class="row g-3">
          <div class="col-3 text-muted">제목</div>
          <div class="col-9">{{ modalTitle }}</div>
          <div class="col-3 text-muted">내용</div>
          <div class="col-9">{{ modalContent }}</div>
          <div class="col-3 text-muted">등록일</div>
          <div class="col-9">{{ modalCreatedAt }}</div>
        </div>
      </template>
      <template #actions>
        <button type="button" class="btn btn-secondary" @click="closeModal">
          닫기
        </button>
      </template>
    </AppModal>
    <!-- 게시글 내용 미리보기 (AppCard) -->
    <hr class="my-5" />
    <AppCard>
      <PostDetailView :id="'1'"></PostDetailView>
    </AppCard>
  </div>
</template>

<script setup>
import AppGrid from '@/components/AppGrid.vue';
import AppCard from '@/components/AppCard.vue';
import AppPagination from '@/components/AppPagination.vue';
import AppModal from '@/components/AppModal.vue';

import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';

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

// 게시글 가져오기
const posts = ref([]);
const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers['x-total-count'];
  } catch (error) {
    console.error(error);
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
const closeModal = () => {
  show.value = false;
};
</script>

<style lang="scss" scoped></style>
