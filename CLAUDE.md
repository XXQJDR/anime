# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。

## 常用命令

```bash
npm run serve    # 开发服务器，端口 80，/api 代理到 http://localhost:8080
npm run build    # 生产构建
npm run lint     # ESLint 检查（vue.config.js 中 lintOnSave 已关闭）
```

项目未配置测试框架。

## 架构

基于 Vue CLI 5 构建的 **Vue 2.6** SPA，用于动漫追踪管理与社区讨论。

### 技术栈

- **UI**: Element UI（通过 `babel-plugin-component` 按需引入）、SCSS、Animate.css
- **状态管理**: Vuex 3 — token 和 userInfo 持久化到 localStorage，以及 UI 标识（侧边栏、遮罩、浏览器身份、内容类型）
- **路由**: Vue Router 3（history 模式），所有页面组件均懒加载
- **HTTP**: Axios，实例封装在 `src/api/myAxios.js`
- **图表**: ECharts 5（按需引入，目前仅 PieChart）
- **图标**: 通过 `svg-sprite-loader` 生成 SVG sprite，自动注册 `src/icons/svg/` 下的文件，使用 `<SvgIcon icon="name"/>` 调用
- **AI 流式**: `@microsoft/fetch-event-source` 用于 SSE 对话

### 目录结构

```
src/
  main.js           # 入口 — 注册 Element UI 组件、VueLazyLoad、router、store
  App.vue           # 根组件 — keep-alive 包裹、全局遮罩、响应式断点（768px）
  router/index.js   # 路由定义 + 权限守卫（需 token：/home、/animeDetail）
  store/index.js    # Vuex — 仅有 mutations（无 actions）；token/userInfo 存于 localStorage
  api/
    myAxios.js      # Axios 实例 — baseURL 来自 VUE_APP_BASE_URL，Bearer token，402/403 处理
    index.js        # 所有 API 函数（auth、动漫 CRUD、帖子、评论、点赞、关注、上传）
  icons/index.js    # 通过 require.context 自动导入 icons/svg/ 下所有 SVG
  echarts/index.js  # ECharts 按需配置（PieChart、CanvasRenderer）
  components/       # 共享组件：SvgIcon、MobileTopbar、UserProfile、ContentType、scrollAnimation、endHr
  pages/            # 路由级页面组件
    home/           # /home 下的嵌套路由（侧边栏布局）
      index.vue     # 侧边栏 + router-view — 菜单映射到子路由
      animeList, animeRandom, addAnime, viewingHistory, dustbin, community
      personal/     # panel（仪表盘）、info（个人信息）、post（帖子）
      ai/           # search（AI 识别）、chat（AI 对话）
    login, register, resetPassword, welcome, animeDetail, postDetail, publishPost, 404, test
  style/
    normalize.css   # CSS 重置
    _common.scss    # 共享 mixin：box-style、input-style、content-min-height
    _element.scss   # Element UI 样式覆盖（popover、message、empty、tooltip、message-box、form）
```

### 关键模式

- **`@/` 别名**映射到 `src/`（在 `jsconfig.json` 中配置，IDE 可识别）
- **权限认证**: Token 存储在 Vuex 和 localStorage 中。Axios 请求拦截器对所有非 `/auth/` 请求自动附加 `Bearer` token。响应遇到 402/403 时，取消所有进行中的请求，清除状态，跳转到 `/login`。
- **响应式布局**: `window.innerWidth <= 768` 判定移动端/PC 端，结果存入 Vuex `browserIdentity`。移动端默认隐藏侧边栏并缩小字号。
- **主页 contentType**: 侧边栏菜单选择由 Vuex 中的 `homeContentType` 驱动，通过 `/home` 路由的 `beforeEnter` 守卫与路由路径同步。
- **API 响应**: Axios 响应拦截器直接返回 `res.data`，因此所有 API 调用方拿到的都是已解包的响应体。
- **内容展示**: 页面统一使用 `box-style` mixin 实现卡片外观，使用 `content-min-height` 计算最小高度。
