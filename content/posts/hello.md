---
title: 开始写博客
date: 2026-09-08
summary: 之后只需要写 Markdown、提交到 GitHub，站点会自动发布。
---

这是第一篇文章。发布流程只有两步：写文件，然后 `git push`。

## 写新文章

在 `content/posts/` 下新建一个 Markdown 文件，文件名会变成网址里的 slug：

```bash
hugo new content posts/my-article.md
```

也可以直接新建 `content/posts/my-article.md`，开头写成：

```markdown
---
title: 文章标题
date: 2026-09-08
summary: 显示在首页的一两句话。
---

正文从这里开始。
```

`summary` 会出现在首页列表里。不写的话，首页会截取正文前一段。

## 发布

```bash
git add content/posts/my-article.md
git commit -m "发布：文章标题"
git push
```

GitHub Actions 会自动构建并发布到 GitHub Pages。一两分钟后就能在线上看到。

## 改站点信息

打开根目录的 `hugo.toml`：

- `title`：站点名，显示在首页大标题
- `params.description`：首页那句介绍
- `params.twitter`：填了会在页脚显示 X 账号

关于页在 `content/about.md`。
