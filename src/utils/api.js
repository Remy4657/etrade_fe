import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


export function fetchMarkdownFile(fileName, postsPath) {
  const postFilePath = path.join(postsPath, `${fileName}.md`)
  const fileContents = fs.readFileSync(postFilePath, 'utf8')
  const { data, content } = matter(fileContents)
  return {
    data,
    content
  }
}

