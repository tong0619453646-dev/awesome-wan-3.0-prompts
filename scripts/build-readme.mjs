// Builds README.md, README_zh-CN.md, README_zh-TW.md and README_ko.md from data/.
// Usage: node scripts/build-readme.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const read = (path) => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const prompts = read('data/prompts.json');
const guide = read('data/guide.json');
// Result and input videos uploaded to GitHub (only github.com/user-attachments videos play inside a README).
const videos = existsSync(new URL('data/videos.json', root)) ? read('data/videos.json') : {};

const SITE = 'https://apiko.app';
const REPO = 'awesome-wan-3.0-prompts';
const HANDBOOK = 'https://alidocs.dingtalk.com/i/nodes/qnYMoO1rWxrkmoj2IjExdZLBJ47Z3je9';
const CATEGORY_ORDER = ['text-to-video', 'image-reference', 'video-reference', 'audio-reference', 'video-edit', 'video-extend', 'first-last-frame'];
const EMOJI = { 'text-to-video': '🎬', 'image-reference': '🖼️', 'video-reference': '🎥', 'audio-reference': '🎵', 'video-edit': '✂️', 'video-extend': '⏩', 'first-last-frame': '🎞️' };

const utm = (medium, content) => `utm_source=github&utm_medium=${medium}&utm_campaign=${REPO}${content ? `&utm_content=${content}` : ''}`;
const fileName = (url) => url.slice(url.lastIndexOf('/') + 1);

const LOCALES = {
  en: {
    file: 'README.md', prefix: '', docsPrefix: '', badge: ['🇺🇸 English', 'Default'],
    title: 'Awesome Wan 3.0 Prompts',
    intro: (n) => `**${n} prompts from Alibaba's official Wan 3.0 creator handbook, each with the video it produced.**`,
    introMore: 'They are grouped by what they do, from plain text to video through image, video and audio references to editing and extending a clip. Find one close to your shot, copy it, and change only what you need. Every result and source video plays right here on GitHub.',
    browse: 'Search and filter them on',
    note: "The Chinese prompts are the handbook's original text. The English, Traditional Chinese and Korean versions are translations; every case keeps the original under *Original prompt (Chinese)*.",
    h: { intro: 'Introduction', quick: 'Quick start', write: 'How to write a Wan 3.0 prompt', menu: 'Menu', faq: 'FAQ', related: 'Related', license: 'License and credits' },
    quickBrowser: (link) => `**In the browser:** every case has a **Run on APIKO** link. It opens the example on ${link}; press **Use** there to load the prompt and its reference files into the Wan 3.0 playground.`,
    quickApi: (key) => `**With the API:** create an ${key}, then create a task and poll it until the video is ready. Reference images, videos and audio go in the request body; see [the FAQ](#faq).`,
    apiKey: 'APIKO API key',
    endpoints: 'Endpoints',
    create: 'create a task', poll: 'read the status and `video_url`',
    cases: (n) => `${n} cases`,
    run: 'Run on APIKO', source: 'Handbook', original: 'Original prompt (Chinese)', output: 'Output', prompt: 'Prompt',
    input: { image: 'Image', video: 'Video', audio: 'Audio' },
    sec: 's',
    related: [
      ['Wan 3.0 prompt library on APIKO', '/wan-3-0-prompts'],
      ['Wan 3.0 text to video', '/models/wan3.0-text-to-video'],
      ['Wan 3.0 image to video', '/models/wan3.0-image-to-video'],
      ['Wan 3.0 reference to video', '/models/wan3.0-reference-video'],
      ['Wan 3.0 API docs', '/docs/api-manual/video-series/wan3.0/wan3.0-overview', true],
      ['Wan 3.0 API price comparison', '/compare/wan-api-pricing'],
    ],
    examples: 'Code examples for the APIKO API',
    license: (h) => `The prompts and example videos come from Alibaba's [Wan 3.0 creator handbook](${h}) and belong to Alibaba; they are shared here for reference with the source credited. Translations, descriptions and the build scripts are released under [CC BY 4.0](LICENSE).`,
    star: 'If this list saves you time, a ⭐ helps others find it.',
  },
  zh: {
    file: 'README_zh-CN.md', prefix: '/zh', docsPrefix: '/zh', badge: ['🇨🇳 简体中文', '查看'],
    title: 'Awesome Wan 3.0 提示词',
    intro: (n) => `**${n} 条提示词，全部来自阿里通义万相官方《Wan3.0 视频创作者手册》，每条附成片视频。**`,
    introMore: '按用途分类：从纯文字生成视频，到图片、视频、音频参考，再到编辑和延长已有视频。找一条接近你想要的镜头，复制后只改需要改的部分。所有成片和原视频都能在 GitHub 页面上直接播放。',
    browse: '在线搜索和筛选：',
    note: '中文提示词是手册原文，英文、繁体中文和韩文版本是翻译。',
    h: { intro: '简介', quick: '快速开始', write: 'Wan 3.0 提示词怎么写', menu: '目录', faq: '常见问题', related: '相关链接', license: '许可与出处' },
    quickBrowser: (link) => `**网页上用：** 每条都有「在 APIKO 运行」链接，会在 ${link} 打开这条示例；点「使用」，提示词和参考素材就会填进 Wan 3.0 试用台。`,
    quickApi: (key) => `**用 API：** 先创建 ${key}，再创建任务并轮询，直到视频生成完成。参考图、视频和音频写在请求体里，见[常见问题](#faq)。`,
    apiKey: 'APIKO API Key',
    endpoints: '接口',
    create: '创建任务', poll: '查询状态并读取 `video_url`',
    cases: (n) => `${n} 条`,
    run: '在 APIKO 运行', source: '手册原文', original: '', output: '成片', prompt: '提示词',
    input: { image: '图', video: '视频', audio: '音频' },
    sec: ' 秒',
    related: [
      ['APIKO 上的 Wan 3.0 提示词库', '/wan-3-0-prompts'],
      ['Wan 3.0 文生视频', '/models/wan3.0-text-to-video'],
      ['Wan 3.0 图生视频', '/models/wan3.0-image-to-video'],
      ['Wan 3.0 参考生视频', '/models/wan3.0-reference-video'],
      ['Wan 3.0 API 文档', '/docs/api-manual/video-series/wan3.0/wan3.0-overview', true],
      ['Wan 3.0 API 价格对比', '/compare/wan-api-pricing'],
    ],
    examples: 'APIKO API 代码示例',
    license: (h) => `提示词和示例视频来自阿里[《Wan3.0 视频创作者手册》](${h})，版权归阿里所有，这里注明出处、仅作参考。译文、简介和生成脚本采用 [CC BY 4.0](LICENSE) 许可。`,
    star: '如果这份合集帮你省了时间，点个 ⭐ 能让更多人看到。',
  },
  'zh-TW': {
    file: 'README_zh-TW.md', prefix: '/zh-tw', docsPrefix: '/zh-tw', badge: ['🇹🇼 繁體中文', '查看'],
    title: 'Awesome Wan 3.0 提示詞',
    intro: (n) => `**${n} 則提示詞，全部來自阿里通義萬相官方《Wan3.0 影片創作者手冊》，每則附成品影片。**`,
    introMore: '依用途分類：從純文字生成影片，到圖片、影片、音訊參考，再到編輯與延長既有影片。找一則接近你想要的鏡頭，複製後只改需要改的部分。所有成品與原始影片都能在 GitHub 頁面上直接播放。',
    browse: '線上搜尋與篩選：',
    note: '繁體中文提示詞由手冊的簡體原文轉換而來，英文與韓文版本是翻譯。',
    h: { intro: '簡介', quick: '快速開始', write: 'Wan 3.0 提示詞怎麼寫', menu: '目錄', faq: '常見問題', related: '相關連結', license: '授權與出處' },
    quickBrowser: (link) => `**網頁上用：** 每則都有「在 APIKO 執行」連結，會在 ${link} 開啟這則範例；點「使用」，提示詞與參考素材就會填進 Wan 3.0 試用台。`,
    quickApi: (key) => `**用 API：** 先建立 ${key}，再建立任務並輪詢，直到影片生成完成。參考圖、影片與音訊寫在請求內容裡，見[常見問題](#faq)。`,
    apiKey: 'APIKO API 金鑰',
    endpoints: '介面',
    create: '建立任務', poll: '查詢狀態並讀取 `video_url`',
    cases: (n) => `${n} 則`,
    run: '在 APIKO 執行', source: '手冊原文', original: '', output: '成品', prompt: '提示詞',
    input: { image: '圖', video: '影片', audio: '音訊' },
    sec: ' 秒',
    related: [
      ['APIKO 上的 Wan 3.0 提示詞庫', '/wan-3-0-prompts'],
      ['Wan 3.0 文生影片', '/models/wan3.0-text-to-video'],
      ['Wan 3.0 圖生影片', '/models/wan3.0-image-to-video'],
      ['Wan 3.0 參考生影片', '/models/wan3.0-reference-video'],
      ['Wan 3.0 API 文件', '/docs/api-manual/video-series/wan3.0/wan3.0-overview', true],
      ['Wan 3.0 API 價格比較', '/compare/wan-api-pricing'],
    ],
    examples: 'APIKO API 程式碼範例',
    license: (h) => `提示詞與範例影片來自阿里[《Wan3.0 影片創作者手冊》](${h})，版權歸阿里所有，這裡註明出處、僅供參考。譯文、簡介與生成腳本採用 [CC BY 4.0](LICENSE) 授權。`,
    star: '如果這份合集幫你省了時間，按個 ⭐ 能讓更多人看到。',
  },
  ko: {
    file: 'README_ko.md', prefix: '/ko', docsPrefix: '', badge: ['🇰🇷 한국어', '보기'],
    title: 'Awesome Wan 3.0 프롬프트',
    intro: (n) => `**알리바바 공식 Wan 3.0 크리에이터 핸드북에 실린 프롬프트 ${n}개와 각 프롬프트로 만든 영상입니다.**`,
    introMore: '텍스트만으로 만드는 영상부터 이미지·영상·오디오 참조, 기존 영상 편집과 연장까지 용도별로 나눴습니다. 원하는 장면과 비슷한 예시를 찾아 복사한 뒤 필요한 부분만 바꾸면 됩니다. 결과 영상과 원본 영상은 모두 GitHub에서 바로 재생됩니다.',
    browse: '검색과 필터는',
    note: '중국어 프롬프트가 핸드북 원문이고, 영어·번체 중국어·한국어는 번역입니다. 각 예시의 *원문 프롬프트(중국어)* 에 원문을 함께 실었습니다.',
    h: { intro: '소개', quick: '빠른 시작', write: 'Wan 3.0 프롬프트 작성법', menu: '목차', faq: '자주 묻는 질문', related: '관련 링크', license: '라이선스와 출처' },
    quickBrowser: (link) => `**브라우저에서:** 모든 예시에 **APIKO에서 실행** 링크가 있습니다. ${link}에서 해당 예시가 열리며, **사용**을 누르면 프롬프트와 참조 파일이 Wan 3.0 플레이그라운드에 채워집니다.`,
    quickApi: (key) => `**API로:** ${key}를 만든 뒤 작업을 생성하고, 영상이 완성될 때까지 상태를 조회합니다. 참조 이미지·영상·오디오는 요청 본문에 넣습니다. [자주 묻는 질문](#faq)을 참고하세요.`,
    apiKey: 'APIKO API 키',
    endpoints: '엔드포인트',
    create: '작업 생성', poll: '상태 조회 및 `video_url` 확인',
    cases: (n) => `${n}개`,
    run: 'APIKO에서 실행', source: '핸드북 원문', original: '원문 프롬프트(중국어)', output: '결과', prompt: '프롬프트',
    input: { image: '이미지', video: '영상', audio: '오디오' },
    sec: '초',
    related: [
      ['APIKO Wan 3.0 프롬프트 라이브러리', '/wan-3-0-prompts'],
      ['Wan 3.0 텍스트 투 비디오', '/models/wan3.0-text-to-video'],
      ['Wan 3.0 이미지 투 비디오', '/models/wan3.0-image-to-video'],
      ['Wan 3.0 레퍼런스 투 비디오', '/models/wan3.0-reference-video'],
      ['Wan 3.0 API 문서(영어)', '/docs/api-manual/video-series/wan3.0/wan3.0-overview', true],
      ['Wan 3.0 API 가격 비교', '/compare/wan-api-pricing'],
    ],
    examples: 'APIKO API 코드 예시',
    license: (h) => `프롬프트와 예시 영상의 출처는 알리바바의 [Wan 3.0 크리에이터 핸드북](${h})이며 저작권은 알리바바에 있습니다. 출처를 밝히고 참고용으로 공유합니다. 번역, 설명, 빌드 스크립트는 [CC BY 4.0](LICENSE)으로 배포합니다.`,
    star: '이 목록이 도움이 됐다면 ⭐ 를 눌러 다른 사람도 찾을 수 있게 해 주세요.',
  },
};
const ORDER = ['en', 'zh', 'zh-TW', 'ko'];

// shields.io static badge: "-" and "_" must be doubled, spaces become "_".
const shield = (label, message, color) => `https://img.shields.io/badge/${[label, message].map((s) => encodeURIComponent(s.replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_'))).join('-')}-${color}`;

const CURL = `export APIKO_API_KEY="your_key_here"

TASK_ID=$(curl https://api.apiko.app/v1/videos \\
  -H "Authorization: Bearer $APIKO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
  "model": "wan3.0-text-to-video",
  "duration": 5,
  "resolution": "720p",
  "aspect_ratio": "16:9",
  "prompt": "A paper boat drifting across a calm lake at sunrise, slow cinematic camera move."
}' | python3 -c 'import json,sys; print(json.load(sys.stdin)["id"])')

while :; do
  TASK=$(curl -s https://api.apiko.app/v1/videos/$TASK_ID \\
    -H "Authorization: Bearer $APIKO_API_KEY")
  printf '%s\\n' "$TASK"
  printf '%s' "$TASK" | grep -qE '"status": *"(completed|failed)"|"error": *\\{' && break
  sleep 5
done`;

function fence(text) {
  const longest = Math.max(2, ...[...text.matchAll(/`+/g)].map((m) => m[0].length));
  const f = '`'.repeat(longest + 1);
  return `${f}text\n${text}\n${f}`;
}

function media(url, poster, width, alt, link) {
  const video = videos[fileName(url)];
  if (video) return `<video src="${video}" width="${width}" controls muted playsinline></video>`;
  return `<a href="${link}"><img src="${poster}" width="${width}" alt="${alt}"></a>`;
}

function build(locale) {
  const L = LOCALES[locale];
  const g = guide[locale];
  const site = (path, medium, content) => `${SITE}${L.prefix}${path}?${utm(medium, content)}`;
  const library = (medium, content, hash) => `${site('/wan-3-0-prompts', medium, content)}${hash ? `#${hash}` : ''}`;
  const out = [];
  const push = (...lines) => out.push(...lines);

  // Header: banner, badges, language switch.
  push('<div align="center">', '');
  push(`<a href="${library('banner')}"><img src="assets/banner.jpg" alt="${L.title}" width="100%"></a>`, '');
  push(
    `[![License: CC BY 4.0](${shield('License', 'CC BY 4.0', 'lightgrey')})](LICENSE)`,
    `[![Prompts](${shield('Prompts', `${prompts.length} official cases`, '111111')})](#menu)`,
    `[![Try Wan 3.0 on APIKO](${shield('Try Wan 3.0', 'on APIKO', '4F46E5')})](${site('/models/wan3.0-text-to-video', 'badge', 'model_try')})`,
    `[![Wan 3.0 API docs](${shield('Wan 3.0', 'API docs', '111111')})](${SITE}${L.docsPrefix}/docs/api-manual/video-series/wan3.0/wan3.0-overview?${utm('badge', 'docs')})`,
    ''
  );
  push(ORDER.map((l) => `[![${LOCALES[l].badge[0]}](${shield(LOCALES[l].badge[0], l === locale ? 'Current' : LOCALES[l].badge[1], l === locale ? '111111' : '4F46E5')})](${LOCALES[l].file})`).join('\n'), '');
  push('</div>', '');

  push(`# ${L.title}`, '');

  // Introduction
  push(`<a id="introduction"></a>`, `## 🌟 ${L.h.intro}`, '');
  push(L.intro(prompts.length), '', L.introMore, '');
  push(`${L.browse} [apiko.app/wan-3-0-prompts](${library('readme', 'intro')}).`, '');
  push('> [!NOTE]', `> ${L.note}`, '');

  // Quick start
  push(`<a id="quick-start"></a>`, `## 🚀 ${L.h.quick}`, '');
  push(L.quickBrowser(`[apiko.app](${library('quickstart', 'browser')})`), '');
  push(L.quickApi(`[${L.apiKey}](${SITE}${L.prefix}/dashboard/apikeys?${utm('quickstart', 'api_key')})`), '');
  push('```bash', CURL, '```', '');
  push(`${L.endpoints}: \`POST https://api.apiko.app/v1/videos\` (${L.create}) · \`GET https://api.apiko.app/v1/videos/{id}\` (${L.poll})`, '');

  // How to write
  push(`<a id="how-to-write"></a>`, `## ✍️ ${L.h.write}`, '');
  push(g.formulas.intro, '');
  for (const item of g.formulas.items) push(`- **${item.h}** · \`${item.formula}\` — ${item.t}`);
  push('', `**${g.tips.title}**`, '');
  for (const item of g.tips.items) push(`- **${item.h}** ${item.t}`);
  push('');

  // Menu
  const byCategory = CATEGORY_ORDER.map((c) => [c, prompts.filter((p) => p.category === c)]);
  push(`<a id="menu"></a>`, `## 📑 ${L.h.menu}`, '');
  for (const [c, list] of byCategory) {
    push(`- [${EMOJI[c]} ${g.categories[c].name}](#${c}) (${list.length})`);
    for (const p of list) push(`  - [${p.text[locale].title}](#${p.id})`);
  }
  push(`- [❓ ${L.h.faq}](#faq)`, `- [🔗 ${L.h.related}](#related)`, '');

  // Cases
  let n = 0;
  for (const [c, list] of byCategory) {
    push(`<a id="${c}"></a>`, `## ${EMOJI[c]} ${g.categories[c].name}`, '');
    push(`> ${g.categories[c].intro} · ${L.cases(list.length)}`, '');
    for (const p of list) {
      n += 1;
      const t = p.text[locale];
      push(`<a id="${p.id}"></a>`, `### ${n}. ${t.title}`, '');
      push(`\`${p.model}\` · ${p.seconds}${L.sec} · ${p.ratio} · **[▶ ${L.run}](${library('case', p.id, p.id)})** · [${L.source}](${HANDBOOK})`, '');
      push(t.summary, '');

      const counter = { image: 0, video: 0, audio: 0 };
      const cells = p.inputs.map((i) => {
        counter[i.type] += 1;
        const label = i.role === 'reference' ? `${L.input[i.type]}${counter[i.type]}` : g.roles[i.role];
        if (i.type === 'audio') return [label, `<a href="${i.url}">🎵 ${label}</a>${i.trimmedTo ? `<br><sub>${g.trimmed}</sub>` : ''}`];
        const width = p.inputs.length > 3 ? 150 : 220;
        return [label, i.type === 'video' ? media(i.url, i.poster, width, label, library('case', p.id, p.id)) : `<img src="${i.url}" width="${width}" alt="${label}">`];
      });
      const output = [L.output, media(p.result.url, p.result.poster, p.inputs.length ? 360 : 640, t.title, library('case', p.id, p.id))];
      const all = [...cells, output];
      push('<table>', `<tr>${all.map(([h]) => `<th>${h}</th>`).join('')}</tr>`, `<tr>${all.map(([, body]) => `<td align="center">${body}</td>`).join('')}</tr>`, '</table>', '');

      push(`**${L.prompt}:**`, '', fence(t.prompt), '');
      if (L.original) push('<details>', `<summary>${L.original}</summary>`, '', fence(p.text.zh.prompt), '', '</details>', '');
    }
  }

  // FAQ: the page's FAQ minus the item about the site's Use button (covered in Quick start).
  push(`<a id="faq"></a>`, `## ❓ ${L.h.faq}`, '');
  g.faq.items.forEach((item, i) => {
    if (i === 3) return;
    push(`<details>`, `<summary><b>${item.question}</b></summary>`, '', item.answer, '', '</details>', '');
  });

  // Related
  push(`<a id="related"></a>`, `## 🔗 ${L.h.related}`, '');
  for (const [label, path, docs] of L.related) push(`- [${label}](${SITE}${docs ? L.docsPrefix : L.prefix}${path}?${utm('related')})`);
  push(`- [${L.examples}](https://github.com/tong0619453646-dev/apiko-ai-api-examples)`, '');

  push(`<a id="license"></a>`, `## 📄 ${L.h.license}`, '', L.license(HANDBOOK), '', L.star, '');
  return out.join('\n');
}

for (const locale of ORDER) {
  writeFileSync(new URL(LOCALES[locale].file, root), build(locale));
  console.log(LOCALES[locale].file);
}
