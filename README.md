# 博客

用 Hugo 生成、GitHub Pages 托管。写文章、`git push`，站点会自动更新。

线上地址：https://yanleijava.github.io/

## 日常怎么用

```bash
# 新建文章（文件名即网址 slug）
hugo new content posts/my-article.md

# 本地预览
hugo server
```

编辑 `content/posts/my-article.md`，然后：

```bash
git add content/posts/my-article.md
git commit -m "发布：文章标题"
git push
```

## 常改的文件

| 文件 | 用途 |
| --- | --- |
| `hugo.toml` | 站点名、介绍、X 账号 |
| `content/about.md` | 关于页 |
| `content/posts/*.md` | 文章 |
