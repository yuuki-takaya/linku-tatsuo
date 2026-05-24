import { articles } from "../src/lib/data/articles";
import { ArticleSection } from "../src/types";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = path.join(process.cwd(), "content/articles");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function sectionToMarkdown(section: ArticleSection): string {
  switch (section.type) {
    case "heading":
      return `## ${section.content}`;
    case "quote":
      return `> ${section.content}`;
    case "image":
      return `![${section.caption ?? ""}](${section.content})`;
    case "paragraph":
      return section.content;
  }
}

for (const article of articles) {
  const tagsYaml = article.tags
    .map((t) => `  - id: ${t.id}\n    label: ${t.label}`)
    .join("\n");

  const frontmatter = [
    `---`,
    `title: "${article.title.replace(/"/g, '\\"')}"`,
    `excerpt: "${article.excerpt.replace(/"/g, '\\"')}"`,
    `personId: ${article.personId}`,
    `publishedAt: "${article.publishedAt}"`,
    `thumbnailUrl: ${article.thumbnailUrl}`,
    `tags:`,
    tagsYaml,
    `isFeatured: ${article.isFeatured}`,
    `readingTimeMin: ${article.readingTimeMin}`,
    `---`,
  ].join("\n");

  const body = article.body
    .map(sectionToMarkdown)
    .join("\n\n");

  const content = `${frontmatter}\n\n${body}\n`;
  const filePath = path.join(OUTPUT_DIR, `${article.slug}.md`);
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✓ ${article.slug}.md`);
}

console.log(`\n合計 ${articles.length} 件のMarkdownファイルを生成しました`);
