# backgrounds/ — 背景资源文件夹

将背景图片放入此文件夹，然后在 `style.css` 中设置：

```css
body {
  --bg-image: url("backgrounds/你的图片.jpg");
  --bg-opacity: 0.15; /* 透明度，0~1 */
}
```

支持 JPG / PNG / WebP 格式。建议尺寸 ≥ 1920×1080。
纯色背景无需此文件夹，直接编辑 CSS 的 `--bg-primary` 即可。
