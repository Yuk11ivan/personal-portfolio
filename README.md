# 王明宇个人展示页

一个简约专业的个人展示网页，基于智能经济专业背景制作。

## 📋 项目特点

- ✨ 简约专业的视觉设计
- 🎨 科技蓝 + 白色主题配色
- 📱 完全响应式设计，适配多设备
- 🎯 流畅的页面滚动和动画效果
- 📊 数据可视化特效
- 🚀 现代化的交互体验

## 🚀 快速开始

### 1. 准备图片

将您的个人照片放置到 `images/` 目录下，命名为 `profile.jpg`

```bash
# 如果您的图片在其他位置，可以这样复制：
# Windows PowerShell
Copy-Item "tmp/211602429442_docxword_media_image1.jpeg" "images/profile.jpg"

# 或者直接重命名并移动文件
```

### 2. 打开网页

直接在浏览器中打开 `index.html` 文件即可查看。

或者使用本地服务器（推荐）：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (需要安装 http-server)
npx http-server

# 使用 PHP
php -S localhost:8000
```

然后在浏览器中访问：`http://localhost:8000`

## 📁 项目结构

```
个人网页/
├── index.html          # 主页面文件
├── styles.css          # 样式文件
├── script.js           # JavaScript 交互文件
├── images/             # 图片目录
│   ├── profile.jpg     # 个人照片（需要添加）
│   └── README.md       # 图片说明
├── README.md           # 项目说明（本文件）
└── 环境准备指南.md      # 环境准备说明
```

## 🎨 功能模块

### 1. 顶部导航栏
- 6个主要栏目导航
- 平滑滚动跳转
- 移动端响应式菜单

### 2. 首页横幅
- 个人照片展示
- 姓名和副标题
- GPA 和排名数据展示（带动画）
- 数据可视化背景特效

### 3. 基本信息区
- 9个信息卡片
- 包含联系方式、性格特点等
- 抖音账号特殊展示卡片

### 4. 教育背景区
- 时间轴样式展示
- 大学和高中教育经历
- 课程列表和成绩信息

### 5. 专业技能区
- 4个技能分类
- 图标 + 文字展示
- 悬停动画效果

### 6. 兴趣方向区
- 研究方向和个人爱好
- 图标化展示
- 卡片式布局

### 7. 自我评价区
- 引用样式设计
- 个人介绍文字

## 🔧 自定义配置

### 修改颜色主题

在 `styles.css` 文件中的 `:root` 部分修改颜色变量：

```css
:root {
    --primary-blue: #0066ff;    /* 主蓝色 */
    --dark-blue: #0044cc;        /* 深蓝色 */
    --light-blue: #3399ff;       /* 浅蓝色 */
    --bg-white: #ffffff;         /* 背景白色 */
    /* ... 其他颜色 */
}
```

### 修改内容

直接编辑 `index.html` 文件中的相应内容即可。

### 修改抖音链接

在 `index.html` 中找到抖音相关链接，修改为您的实际抖音主页链接：

```html
<a href="https://www.douyin.com/user/your-username" target="_blank" class="douyin-link">
```

## 📱 浏览器兼容性

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE 11+ (部分功能可能不支持)

## 🎯 技术栈

- HTML5
- CSS3 (Flexbox, Grid, 动画)
- JavaScript (ES6+)
- Font Awesome 图标库
- Canvas API (数据可视化)

## 📝 注意事项

1. **图片路径**：确保个人照片正确放置在 `images/profile.jpg`
2. **抖音链接**：记得更新为您的实际抖音主页链接
3. **联系方式**：检查所有联系信息是否正确
4. **响应式测试**：在不同设备上测试显示效果

## 🚀 部署到 Vercel

1. 将项目推送到 GitHub
2. 在 Vercel 中导入 GitHub 仓库
3. Vercel 会自动检测并部署

或者使用 Vercel CLI：

```bash
npm i -g vercel
vercel
```

## 📄 许可证

个人使用项目。

## 👤 作者

王明宇 - 2024级智能经济专业

---

**个人展示页・基于智能经济专业背景制作**

