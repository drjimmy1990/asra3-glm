---
name: blog-post-from-project
description: Use when creating a blog post for the asra3.com website from a project, case study, or portfolio piece. Generates bilingual (EN/AR) blog content with markdown formatting, image placeholders, SEO tags, cover image ideas, and all fields ready to paste into the admin panel.
---

# Blog Post From Project — v2

> **Goal**: Produce a complete, publish-ready blog post in a SINGLE output. The user copies sections directly into the admin panel with zero rewriting.

---

## 1 · Gather Input (Ask If Missing)

| Input | Required? | Example |
|-------|:---------:|---------|
| **Project Name** | ✅ | LeadHunter SaaS |
| **1-line summary** | ✅ | AI-powered lead gen for B2B sales |
| **Problem solved** | ✅ | Manual prospecting wastes 20+ hrs/week |
| **Key features** (3-6) | ✅ | Real-time scraping, AI scoring, CRM sync |
| **Tech stack** | ✅ | Next.js, Supabase, OpenAI, Stripe, n8n |
| **Results / metrics** | ✅ | 3× faster qualification, 80% less manual work |
| **Target audience** | ✅ | SaaS founders, B2B teams |
| **Screenshots available?** | ✅ | Yes — dashboard, onboarding, mobile view |
| Timeline | optional | 4 weeks |
| Client quote | optional | "Saved us 15 hours a week" |

> **Speed rule**: If the user gives you a project directory or codebase, scan it yourself — don't ask for what you can read.

---

## 2 · Output Sections (All Required)

Produce these **7 sections** in order:

```
§1  METADATA
§2  CONTENT — ENGLISH
§3  CONTENT — ARABIC
§4  COVER IMAGE PROMPT
§5  TAGS
§6  SCREENSHOTS LIST (from the project)
§7  GENERATED IMAGES LIST (AI-created)
```

---

### §1 · METADATA

```yaml
SLUG:           kebab-case-slug-max-60-chars
TITLE_EN:       "Compelling, SEO-rich title (max 70 chars)"
TITLE_AR:       "عنوان عربي طبيعي وليس ترجمة حرفية (max 70 chars)"
EXCERPT_EN:     "1-2 sentence hook, max 160 chars — doubles as meta description"
EXCERPT_AR:     "نسخة عربية طبيعية للملخص (max 160 chars)"
COVER_IMAGE:    see §4
TAGS:           ["tag1", "tag2", "tag3", "tag4", "tag5"]
LINKED_PROJECT: "Project Name" or "None"
PUBLISHED:      true
```

---

### §2 · CONTENT — ENGLISH (Markdown)

Write the full blog body. Use **ALL** the markdown features our renderer supports (see §8 reference).

#### Required Structure:

```markdown
## The Problem

[2-3 paragraphs — specific, relatable pain. Use real scenarios.]

![stressed-entrepreneur-manual-data](GENERATE: A stressed entrepreneur surrounded by paper invoices and spreadsheets, blue-grey moody lighting, modern flat illustration, 16:9)

## The Solution: [Project Name]

[2-3 paragraphs — what we built, why this approach, high-level architecture.]

![project-name-dashboard-overview](SCREENSHOT: Main dashboard view showing the key value proposition)

## Key Features

### ⚡ [Feature 1]

[1-2 paragraphs on what it does and why it matters]

![project-name-feature-1-detail](SCREENSHOT: Close-up of [feature] in action)

### 🔄 [Feature 2]

[1-2 paragraphs]

### 📊 [Feature 3]

[1-2 paragraphs]

> 💡 **Pro tip**: [A useful insight the reader can apply immediately]

![project-name-features-grid](SCREENSHOT: Side-by-side of 2-3 feature screens)

## Tech Stack & Architecture

[1-2 paragraphs explaining technical decisions]

| Layer | Technology | Why |
|:------|:-----------|:----|
| Frontend | Next.js 16 + React 19 | Server Components, edge-ready |
| Backend | [Tech] | [Brief reason] |
| Database | [Tech] | [Brief reason] |
| AI/ML | [Tech] | [Brief reason] |
| Automation | [Tech] | [Brief reason] |
| Deployment | [Tech] | [Brief reason] |

![project-name-architecture-diagram](GENERATE: Clean system architecture diagram, dark background #0a0a0a, data flow boxes connected by emerald green #10b981 lines, white labels, minimal style)

## Results & Impact

[2-3 paragraphs with hard numbers]

> **"[Key metric or client quote as a blockquote]"**

![project-name-results-infographic](GENERATE: Dark theme infographic showing before/after metrics with emerald green #10b981 accents: 'X hrs → Y hrs', '3× improvement', circular progress indicators, clean modern style)

## Lessons Learned

1. **[Lesson 1]** — [Explanation]
2. **[Lesson 2]** — [Explanation]
3. **[Lesson 3]** — [Explanation]

---

*Built by [asra3.com](https://asra3.com) — Turning ideas into high-performance digital products.*
```

---

### §3 · CONTENT — ARABIC (Markdown)

**Complete Arabic rewrite** — not a translation. Rules:

- Write in Modern Standard Arabic (فصحى معاصرة)
- Keep tech terms in English: API, SaaS, Next.js, CI/CD, UI/UX
- Use the **exact same image references** (same `![alt](...)` lines)
- Match the heading hierarchy
- First-person plural: بنينا، طوّرنا، صممنا
- Arabic paragraphs tend to be slightly shorter — that's fine

---

### §4 · COVER IMAGE PROMPT

```
FILENAME: project-name-cover.png
PROMPT: "[50-100 word prompt. Include: subject, visual style (modern, minimal, tech),
color palette (emerald green #10b981 accent on dark #0a0a0a background),
composition, mood. 16:9 aspect ratio.]"
```

---

### §5 · TAGS

```json
["Tag1", "Tag2", "Tag3", "Tag4", "Tag5", "تطوير ويب"]
```

Rules:
- 5-8 tags total
- Mix broad (SaaS, Automation) + specific (Next.js, Supabase)
- Include project category (e-commerce, fintech)
- 1-2 Arabic tags for Arabic audience reach

---

### §6 · SCREENSHOTS LIST

These are **real screenshots from the project** that the user must take/provide. List every screenshot referenced in the content.

| # | Alt Text (= Filename) | What to Capture | Used In |
|:-:|:----------------------|:----------------|:--------|
| 1 | `project-name-dashboard-overview` | Main dashboard, full viewport, dark mode | §2 "The Solution" |
| 2 | `project-name-feature-1-detail` | Close-up of [feature], showing [interaction] | §2 Feature 1 |
| 3 | `project-name-features-grid` | Side-by-side of 2-3 feature screens | §2 Features section |
| 4 | `project-name-mobile-view` | Mobile responsive view of main screen | §2 (if applicable) |

> **Upload workflow**: Take screenshot → save as `alt-text.png` → upload via admin panel "Upload Image to Content" button → markdown auto-inserted.

---

### §7 · GENERATED IMAGES LIST

These are **AI-generated images** the user creates with an image generation tool.

| # | Alt Text (= Filename) | Generation Prompt | Used In |
|:-:|:----------------------|:------------------|:--------|
| 1 | `project-name-cover` | [Full prompt from §4] | Cover Image |
| 2 | `stressed-entrepreneur-manual-data` | [Full prompt] | §2 "The Problem" |
| 3 | `project-name-architecture-diagram` | [Full prompt] | §2 Tech Stack |
| 4 | `project-name-results-infographic` | [Full prompt] | §2 Results |

> **Workflow**: Copy prompt → generate image → save as `alt-text.png` → upload → paste URL.

---

## 3 · Image Rules (Critical)

### Two Image Types

| Type | Prefix | Meaning | Example |
|:-----|:-------|:--------|:--------|
| **Screenshot** | `SCREENSHOT:` | Real project screenshot the user must capture | `![app-dashboard](SCREENSHOT: Full dashboard view in dark mode)` |
| **Generated** | `GENERATE:` | AI-generated image with a prompt | `![data-flow-diagram](GENERATE: Clean architecture diagram, dark bg, green lines)` |

### Alt Text = Filename Convention

The `alt` text in every image **IS** the filename. This lets the user:
1. See the alt text
2. Save their image as `alt-text.png`
3. Upload via the admin panel
4. The markdown `![alt-text](/uploads/alt-text.png)` matches automatically

**Rules for alt text:**
- Use `kebab-case` only
- Start with project name: `leadhunter-dashboard-overview`
- Be descriptive: `leadhunter-ai-scoring-panel` not `screenshot-3`
- Max 50 characters
- No special characters except hyphens

### Custom Image Sizes

Our renderer supports custom dimensions:

```markdown
![alt-text|800x450](/uploads/image.png)
```

Use this for:
- Architecture diagrams: `|1000x500`
- Inline icons or small images: `|300x200`
- Full-width heroes: omit the size suffix (uses auto-width)

### Image Captions

The alt text is **automatically displayed as a caption** below the image. Write it to be readable:

```markdown
![LeadHunter AI scoring panel showing real-time lead analysis](/uploads/leadhunter-scoring.png)
```

Renders as image + caption: *"LeadHunter AI scoring panel showing real-time lead analysis"*

---

## 4 · Markdown Features Reference

Our blog renderer (ReactMarkdown + remark-gfm + rehype-raw) supports all of these. **Use them freely**:

### Text Formatting

```markdown
**Bold text** for emphasis
*Italic text* for subtle emphasis
~~Strikethrough~~ for corrections
`inline code` for technical terms
[Link text](https://url.com) for references
```

### Headings (Use These Levels)

```markdown
## Section Title          ← Main sections
### Subsection            ← Features, sub-points
#### Minor heading        ← Rarely needed
```

> ⚠️ Never use `#` (h1) — the blog title is already h1.

### Lists

```markdown
- Bullet point
- Another point
  - Nested point

1. Ordered step
2. Next step
3. Final step
```

### Blockquotes (Styled with emerald border + muted bg)

```markdown
> Single line quote

> **"Highlighted metric or client testimonial"**

> 💡 **Pro tip**: Useful insight the reader can apply immediately
```

### Tables (Fully styled with hover, borders, header bg)

```markdown
| Column 1 | Column 2 | Column 3 |
|:---------|:--------:|----------:|
| Left     | Center   | Right     |
| aligned  | aligned  | aligned   |
```

Alignment: `:---` left, `:---:` center, `---:` right.

### Code Blocks (Styled with muted bg + border)

````markdown
```javascript
const result = await fetch('/api/data');
const json = await result.json();
```
````

### Horizontal Rules (Section dividers)

```markdown
---
```

### Images

```markdown
![alt-text](/uploads/image.png)              ← auto-width
![alt-text|800x450](/uploads/image.png)      ← custom size
```

### Videos (Raw HTML supported via rehype-raw)

```markdown
<video src="/uploads/demo.mp4" controls width="100%"></video>
```

### YouTube Embeds

```markdown
<iframe src="https://www.youtube.com/embed/VIDEO_ID" width="100%" height="400" frameborder="0" allowfullscreen></iframe>
```

### Raw HTML (for advanced layouts)

```markdown
<div style="display: flex; gap: 1rem;">
  <img src="/uploads/img1.png" style="width: 50%;" />
  <img src="/uploads/img2.png" style="width: 50%;" />
</div>
```

---

## 5 · Writing Style

### English
- **Tone**: Senior developer explaining to a CTO — professional, confident, specific
- **Voice**: First-person plural: "We built…", "Our approach…"
- **Length**: 1,200–2,000 words (7-10 min read)
- **SEO**: Weave project name + key tech into headings naturally
- **No fluff**: Every paragraph delivers information or insight
- **Use emojis in headings**: ⚡ 🔄 📊 🎨 🔐 — they render great in our theme

### Arabic
- **Tone**: Same confidence, adapted for Arabic tech audience
- **Voice**: First-person plural: بنينا، نهجنا، طوّرنا
- **Tech terms**: Keep in English when industry-standard (API, SaaS, CI/CD)
- **Length**: Match English depth — Arabic naturally reads ~10% shorter
- **Not machine-translated**: Rethink the phrasing, don't translate word-by-word

---

## 6 · Quality Checklist

Before delivering, verify ALL of these:

**Structure:**
- [ ] All 7 sections present (Metadata, EN, AR, Cover, Tags, Screenshots, Generated)
- [ ] Slug is kebab-case, ≤60 chars
- [ ] Both titles ≤ 70 characters
- [ ] Both excerpts ≤ 160 characters

**Content Quality:**
- [ ] English ≥ 1,200 words
- [ ] Results section has ≥ 2 concrete metrics with numbers
- [ ] Tech stack table complete with "Why" column
- [ ] No lorem ipsum, no generic filler, no placeholder text
- [ ] Footer CTA links to asra3.com

**Images:**
- [ ] Every image has `SCREENSHOT:` or `GENERATE:` prefix
- [ ] Alt texts are `kebab-case`, start with project name, ≤ 50 chars
- [ ] Screenshots list tells user EXACTLY what to capture
- [ ] Generated images have full, detailed prompts
- [ ] All generated image prompts reference asra3 brand colors (#10b981 on #0a0a0a)

**Arabic:**
- [ ] Arabic content matches English structure
- [ ] Same image references used
- [ ] Reads naturally (not translated)

**Markdown:**
- [ ] Uses `##` for sections, `###` for subsections
- [ ] Tables have alignment markers
- [ ] At least one blockquote used
- [ ] At least one emphasized metric callout used
- [ ] Horizontal rule before footer CTA

---

## 7 · Admin Panel Quick-Paste Map

| Output | Admin Panel Field | How |
|:-------|:-----------------|:----|
| `SLUG` | Slug input | Paste directly |
| `TITLE_EN` | Title (English tab) | Paste directly |
| `TITLE_AR` | Title (Arabic tab) | Paste directly |
| `EXCERPT_EN` | Excerpt (English tab) | Paste directly |
| `EXCERPT_AR` | Excerpt (Arabic tab) | Paste directly |
| `§2 content` | Content (English tab) | Paste in Markdown mode |
| `§3 content` | Content (Arabic tab) | Paste in Markdown mode |
| Cover image | Cover Image field | Upload image → paste URL, or click ⬆️ button |
| Tags | Tags input | Add each tag individually |
| Linked Project | Project dropdown | Select from list |
| Published | Toggle | Switch ON |

---

## 8 · Quick Post Mode

For small automations / integrations (< 500 words):

1. **Problem** (1 paragraph)
2. **Solution** (1 paragraph)
3. **How It Works** (3 bullet points)
4. **Tech Used** (inline comma list, no table)
5. **Result** (1 key metric in a blockquote)

Still provide ALL §1 metadata + §5 tags + §6/§7 image lists.
