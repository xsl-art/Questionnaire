# 问卷星低代码平台 - B端管理系统

基于 React + TypeScript + Vite 构建的问卷编辑与管理后台。

## 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Ant Design 6
- **状态管理**: Redux Toolkit + React Redux
- **路由**: React Router DOM 7
- **拖拽**: @dnd-kit (core, sortable, utilities)
- **图表**: Recharts
- **代码编辑器**: Monaco Editor
- **样式**: Styled Components + SCSS
- **HTTP 客户端**: Axios
- **工具库**: ahooks, lodash.clonedeep, nanoid
- **撤销重做**: redux-undo

## 项目结构

```
src/
├── components/           # 组件目录
│   ├── QuestionComponents/   # 问卷组件库
│   │   ├── QuestionInput/        # 输入框组件
│   │   ├── QuestionTextarea/     # 文本域组件
│   │   ├── QuestionRadio/        # 单选组件
│   │   ├── QuestionCheckbox/     # 多选组件
│   │   ├── QuestionTitle/        # 标题组件
│   │   ├── QuestionParagraph/    # 段落组件
│   │   ├── QuestionInfo/         # 问卷信息组件
│   │   ├── QuestionImage/        # 图片展示组件
│   │   └── QuestionImageUpload/  # 图片上传组件
│   ├── DragSortable/       # 拖拽排序组件
│   └── UserInfo/           # 用户信息组件
├── pages/                # 页面目录
│   ├── Home/               # 首页
│   ├── Login/              # 登录页
│   ├── Register/           # 注册页
│   ├── Manage/             # 问卷管理
│   │   ├── List/               # 问卷列表
│   │   ├── Star/               # 标星问卷
│   │   └── Trash/              # 回收站
│   ├── Question/           # 问卷编辑
│   │   ├── Edit/               # 编辑页面
│   │   │   ├── LeftPanel/          # 左侧组件库
│   │   │   ├── Canvas/             # 画布区域
│   │   │   └── RightPanel/         # 右侧属性面板
│   │   └── Stat/               # 统计页面
│   └── NotFound/           # 404页面
├── hooks/                # 自定义 Hooks
├── store/                # Redux Store
├── router/               # 路由配置
├── services/             # API 服务
├── utils/                # 工具函数
├── layouts/              # 布局组件
└── constant/             # 常量定义
```

## 核心功能

### 问卷编辑

- 可视化拖拽编辑问卷页面
- 丰富的组件库（输入框、单选、多选、标题、段落、图片等）
- 组件属性配置面板
- 撤销/重做功能
- 问卷分页设置
- 自定义 CSS/JS

### 条件显示规则

- 支持单选、多选等组件的条件判断
- 运算符支持：等于、不等于、包含等
- 多条件组合（且/或）

### 问卷统计

- 答卷数量统计
- 单选题饼图分析
- 多选题柱状图分析
- 文本题列表展示

### 问卷管理

- 问卷列表（分页、搜索、排序）
- 标星收藏
- 回收站恢复
- 复制、删除问卷

## 开发脚本

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产环境
pnpm build

# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 预览生产构建
pnpm preview
```

## 环境要求

- Node.js >= 18
- pnpm >= 8

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90
