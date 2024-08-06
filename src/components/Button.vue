<template>
  <button
    :style="{
      fontSize: computedFontSize,
      backgroundColor: backgroundColor,
      color: textColor,
      width: width + 'px',
    }"
    class="custom-button"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    fontSize: {
      type: String,
      default: '18pt',
    },
    backgroundColor: {
      type: String,
      default: '#ffb317', // 기본 배경색
    },
    textColor: {
      type: String,
      default: '#FBFBFB', // 기본 글씨 색
    },
    width: {
      type: Number,
      default: 330, // 기본 가로 크기
    },
  },
  computed: {
    computedFontSize() {
      return this.fontSize;
    },
  },
};
</script>

<style scoped>
.custom-button {
  font-family: 'Pretendard', sans-serif;
  border: none;
  border-radius: 2em;
  padding: 0.5em 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  opacity: 0.9;
}

.custom-button:active {
  opacity: 0.8;
}

.custom-button:focus {
  outline: none;
}
</style>
