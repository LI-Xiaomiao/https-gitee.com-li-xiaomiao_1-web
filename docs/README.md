# 嵌入式开发者作品集

纯 HTML + CSS 驱动的个人作品集，无需 JavaScript。
编辑 `index.html` 中的对应区块即可更新网站内容。

## 项目结构

```
my-portfolio/
  index.html              # 主页面（所有内容内嵌于此）
  style.css               # 样式表（纯 CSS 导航切换）
  data/                   # 参考备份文件（同步 index.html 即可）
    personal.md
    experience.md
    skills.md
    portfolio.md
  portfolio/              # 作品集图片（放入实物照片覆盖占位图）
    gateway.jpg           #   智能家居网关
    daq.jpg               #   手持数据采集仪
    motor_driver.jpg      #   电机控制驱动器
    riscv_board.jpg       #   RISC-V 开发板
  .github/workflows/      # GitHub Pages 自动部署
```

## 如何更新内容

打开 `index.html`，找到对应板块的 `<section>` 标签，直接修改 HTML 即可：

| 板块 | 搜索关键词 |
|------|-----------|
| 个人信息 | `<section id="personal">` |
| 项目经验 | `<section id="experience">` |
| 技术栈 | `<section id="skills">` |
| 作品集 | `<section id="portfolio">` |

**修改作品集图片：** 将实物照片放入 `portfolio/` 文件夹，覆盖同名文件即可。
占位图为 SVG 格式，替换为 JPG / PNG 后自动显示。

> `data/` 目录下的 `.md` 文件为内容备份，如需使用需手动同步到 `index.html`。

## 技术特点

- **纯 CSS 导航：** 使用隐藏 radio 按钮 + `~` 兄弟选择器切换板块，无一行 JavaScript
- **响应式布局：** 移动端自动折叠侧边栏，checkbox 控制展开/收起
- **暗色主题：** 嵌入式开发者风格配色（青/绿色点缀）
- **自动部署：** 推送 `main` 分支 → GitHub Actions 自动部署到 GitHub Pages

## 本地预览

需要本地服务器（浏览器限制 `file://` 协议下无法加载图片等资源）：

```bash
# 方式一：Node.js
npx serve . -p 8080

# 方式二：Python
python -m http.server 8080

# 方式三：VS Code
# 安装 Live Server 插件，右键 index.html → Open with Live Server
```

打开 `http://localhost:8080` 即可预览。

## 部署到 GitHub Pages

1. 在 GitHub 创建仓库（如 `my-portfolio`）
2. 将本地代码推送到 `main` 分支
3. GitHub Actions 会自动部署（配置已就位）
4. 访问 `https://<用户名>.github.io/my-portfolio/`
