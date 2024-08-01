import { posts } from '.';

export function getPosts(params) {
  return posts.get('/', { params });
}

export function getPostById(id) {
  return posts.get(id);
}

export function createPost(data) {
  return posts.post('', data);
}
// put과 path의 용도가 다름, patch를 사용하면 등록일은 수정되지 않음
export function updatePost(id, data) {
  // return posts.put(id, data);
  return posts.patch(id, data);
}

export function deletePost(id) {
  return posts.delete(`/${id}`);
}
