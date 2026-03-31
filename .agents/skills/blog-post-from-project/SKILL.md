---
name: blog-post-from-project
description: Use when creating a blog post for the asra3.com website from a project, case study, or portfolio piece. Generates bilingual (EN/AR) blog content with markdown formatting, image placeholders, SEO tags, cover image ideas, and all fields ready to paste into the admin panel.
---

# Blog Post From Project

## Purpose

Generate a complete, publish-ready blog post for asra3.com from any project, case study, or client work. The output includes **every field** the admin panel requires so the user can copy-paste directly without any additional writing.

## When to Use

- After completing a project and wanting to showcase it on the blog
- When creating a case study or portfolio write-up
- When the user says: "write a blog post", "create blog content", "blog about this project"

---

## Required Input

Before writing, you MUST gather the following from the user (ask if not provided):

| Input | Description | Example |
|-------|-------------|---------|
| **Project Name** | The name of the project | "LeadHunter SaaS Platform" |
| **What it does** | 1-2 sentence summary | "AI-powered lead generation for B2B sales teams" |
| **Problem solved** | The pain point addressed | "Manual prospecting wastes 20+ hours/week" |
| **Key features** | 3-6 bullet points of main capabilities | Real-time scraping, AI scoring, CRM sync |
| **Tech stack** | Frameworks, tools, APIs used | Next.js, Supabase, OpenAI, Stripe, n8n |
| **Results/metrics** | Quantifiable outcomes (if available) | "3x faster lead qualification", "80% reduction in manual work" |
| **Target audience** | Who benefits from this project | "SaaS founders", "E-commerce businesses" |
| **Timeline** | How long the project took (optional) | "4 weeks" |

---

## Output Structure

You MUST produce ALL of the following sections in a single, organized response. Use the exact headers below so the user can navigate easily.

### 1. METADATA (Admin Panel Fields)

```
SLUG:           [kebab-case-slug]
TITLE (EN):     [English title — compelling, SEO-friendly, max 70 chars]
TITLE (AR):     [Arabic title — natural, not machine-translated]
EXCERPT (EN):   [1-2 sentence hook, max 160 chars — this is the meta description]
EXCERPT (AR):   [Arabic equivalent of the excerpt]
COVER IMAGE:    [Detailed description for generating the cover image — see §4]
TAGS:           ["tag1", "tag2", "tag3", "tag4", "tag5"]
LINKED PROJECT: [Project name to link in admin, or "None"]
PUBLISHED:      true
```

### 2. CONTENT — ENGLISH (Markdown)

Write the full blog post body in Markdown. Follow this structure:

```markdown
## The Problem

[2-3 paragraphs describing the pain point. Be specific and relatable.
Use real-world scenarios the target audience faces daily.]

![problem-illustration](PLACEHOLDER: Describe an image showing the frustration or inefficiency — e.g., "A stressed business owner drowning in spreadsheets and manual data entry, dark moody lighting, modern flat illustration style")

## The Solution: [Project Name]

[2-3 paragraphs introducing the project. Focus on the "what" and "why".
Explain the approach and architecture at a high level.]

![solution-overview](PLACEHOLDER: Describe a clean dashboard or product screenshot concept — e.g., "Modern SaaS dashboard with real-time analytics cards, dark theme, showing lead scores and conversion metrics, glassmorphism UI style")

## Key Features

### ⚡ [Feature 1 Name]

[1-2 paragraphs explaining this feature and its value to the user]

### 🔄 [Feature 2 Name]

[1-2 paragraphs]

### 📊 [Feature 3 Name]

[1-2 paragraphs]

![features-showcase](PLACEHOLDER: Describe a feature comparison or multi-panel screenshot concept — e.g., "Three side-by-side UI panels showing the automation workflow: input → processing → output, connected by animated arrows, clean minimal design")

## Tech Stack & Architecture

[1-2 paragraphs explaining the technical decisions and why each technology was chosen]

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js + React | [Brief reason] |
| Backend | [Tech] | [Brief reason] |
| Database | [Tech] | [Brief reason] |
| AI/ML | [Tech] | [Brief reason] |
| Automation | [Tech] | [Brief reason] |
| Deployment | [Tech] | [Brief reason] |

![architecture-diagram](PLACEHOLDER: Describe a clean system architecture diagram — e.g., "Minimal technical architecture diagram showing data flow: User → Next.js Frontend → API Routes → Supabase DB → n8n Automations → OpenAI, dark background with neon green connection lines")

## Results & Impact

[2-3 paragraphs with concrete metrics and outcomes. Use numbers.]

> **"[A compelling quote or key metric highlighted as a blockquote]"**

![results-metrics](PLACEHOLDER: Describe a results infographic — e.g., "Clean infographic showing before/after metrics: '20 hrs → 2 hrs manual work', '3x conversion rate', '80% cost reduction', modern dark theme with emerald green accent colors matching asra3 brand")

## Lessons Learned

[2-3 key takeaways from building this project. Be genuine and technical.]

1. **[Lesson 1 title]** — [Brief explanation]
2. **[Lesson 2 title]** — [Brief explanation]
3. **[Lesson 3 title]** — [Brief explanation]

---

*Built by [asra3.com](https://asra3.com) — Turning ideas into high-performance SaaS products and intelligent automation solutions.*
```

### 3. CONTENT — ARABIC (Markdown)

Write the **complete Arabic version** of the blog post. It must NOT be a word-for-word translation. Instead:

- Rewrite naturally in Modern Standard Arabic (فصحى معاصرة)
- Keep technical terms in English where natural (Next.js, API, SaaS)
- Maintain the same structure and image placeholders
- Use right-to-left compatible markdown
- Match the same heading hierarchy as the English version

### 4. COVER IMAGE PROMPT

Provide a detailed, ready-to-use prompt for generating the cover image:

```
COVER IMAGE GENERATION PROMPT:
"[Highly detailed prompt — 50-100 words describing the ideal cover image.
Include: subject matter, visual style (modern, minimal, tech), color palette
(emerald green #10b981 as accent on dark #0a0a0a background to match asra3 brand),
composition, mood, and any text overlay requirements. The image should be 16:9 aspect ratio,
suitable for both blog cards and hero headers.]"
```

### 5. TAGS STRATEGY

Provide 5-8 tags following these rules:

- Mix of **broad** (SaaS, Automation) and **specific** (Next.js, Supabase)
- Include the **project category** (e-commerce, HR, fintech)
- Include **1-2 Arabic tags** if the project serves Arabic audiences
- Format as a JSON array: `["tag1", "tag2", "tag3"]`

### 6. IMAGE PLACEHOLDERS SUMMARY TABLE

Collect all image placeholders into a reference table:

| # | Location in Post | Placeholder Description | Suggested Generation Prompt |
|---|-----------------|------------------------|---------------------------|
| 1 | Cover | [brief] | [full prompt] |
| 2 | After "The Problem" | [brief] | [full prompt] |
| 3 | After "The Solution" | [brief] | [full prompt] |
| 4 | Features showcase | [brief] | [full prompt] |
| 5 | Architecture | [brief] | [full prompt] |
| 6 | Results | [brief] | [full prompt] |

---

## Writing Style Guide

### English
- **Tone**: Professional but approachable. Like a senior developer explaining to a CTO.
- **Voice**: First person plural ("We built...", "Our approach...")
- **Length**: 1,200 — 2,000 words (aim for 7-10 min read)
- **SEO**: Naturally weave the project name and key technologies into headings

### Arabic
- **Tone**: Same professional warmth, adapted for Arabic-speaking tech audience
- **Voice**: First person plural (بنينا... نهجنا...)
- **Technical terms**: Keep in English when they're industry-standard (API, SaaS, CI/CD)
- **Length**: Match the English version's depth

### Image Placeholders
Every image placeholder MUST follow this exact format in the markdown:

```markdown
![descriptive-alt-text](PLACEHOLDER: Detailed visual description for image generation, including style, colors, composition, and mood)
```

The `PLACEHOLDER:` prefix signals that this image needs to be generated. The description after it serves as both the generation prompt and the alt-text source.

---

## Quality Checklist

Before delivering, verify:

- [ ] All 6 output sections are present (Metadata, EN, AR, Cover, Tags, Images Table)
- [ ] Slug is kebab-case, unique, and URL-friendly
- [ ] Both titles are under 70 characters
- [ ] Both excerpts are under 160 characters
- [ ] English content has 5+ image placeholders with detailed descriptions
- [ ] Arabic content mirrors the same structure and image placeholders
- [ ] Tech stack table is complete with "Why" column
- [ ] Tags array has 5-8 items in valid JSON format
- [ ] Results section has at least 2 concrete metrics
- [ ] No lorem ipsum or generic filler text anywhere
- [ ] Cover image prompt references the asra3 brand colors (emerald green on dark)
- [ ] Footer CTA links to asra3.com
- [ ] Arabic reads naturally (not machine-translated)
- [ ] Headings use proper hierarchy (## for sections, ### for subsections)
- [ ] All markdown renders correctly (no broken syntax)

---

## Admin Panel Field Mapping

This maps each output to the exact admin panel field:

| Output | Admin Field | Notes |
|--------|------------|-------|
| `SLUG` | Slug | Auto-generates from title if empty |
| `TITLE (EN)` | Title (English tab) | |
| `TITLE (AR)` | Title (Arabic tab) | |
| `EXCERPT (EN)` | Excerpt (English tab) | Also used as meta description |
| `EXCERPT (AR)` | Excerpt (Arabic tab) | |
| `CONTENT (EN)` | Content (English tab) | Paste raw markdown. Supports visual + markdown editor modes |
| `CONTENT (AR)` | Content (Arabic tab) | Paste raw markdown |
| `COVER IMAGE` | Cover Image URL | Generate image first, upload, paste URL |
| `TAGS` | Tags | Use the tag input component — add each tag individually |
| `LINKED PROJECT` | Project dropdown | Select from existing projects |
| `PUBLISHED` | Published toggle | Set to true when ready |

---

## Example: Minimal Quick Post

If the user wants a shorter post (e.g., for a small automation), reduce to:

1. **The Problem** (1 paragraph)
2. **The Solution** (1 paragraph)
3. **How It Works** (3 bullet points)
4. **Tech Used** (inline list, no table)
5. **Result** (1 key metric)

Still provide ALL metadata fields even for short posts.
