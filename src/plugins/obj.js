const objPlugins = {
  install(app, options) {
    console.log('objPlugins app', app);
    console.log('objPlugins options', options);
  },
};
export default objPlugins;

// app.component() 전역속성
// app.config.globalProperties 전역 애플리케이션 인스턴스에 속성 추가
// app.directive 커스텀 디렉티브 설정
// app.provide() 리소스
