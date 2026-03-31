---
name: blog-post-from-project
description: Use when creating a blog post AND a portfolio project entry for the asra3.com website from a project, case study, or portfolio piece. Generates bilingual (EN/AR) blog content, a linked project card with all required fields, cinema-grade image prompts, and all sections ready to paste into the admin panel with zero rewriting.
---

# Blog Post + Project Entry — v3

> **Goal**: One run → one file → zero rewriting. Produces a **complete, publish-ready blog post** AND a **complete project card** linked together. The user pastes sections directly into the admin panel.

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
| Project URL / live link | optional | https://leadhunter.io |

> **Speed rule**: If the user gives you a project directory or codebase, scan it yourself — don't ask for what you can read.

---

## 2 · Output Sections (All Required)

Produce these **9 sections** in order, clearly separated:

```
§1  BLOG METADATA
§2  CONTENT — ENGLISH
§3  CONTENT — ARABIC
§4  COVER IMAGE PROMPT
§5  BLOG TAGS
§6  SCREENSHOTS LIST
§7  GENERATED IMAGES LIST
§8  PROJECT ENTRY
§9  PROJECT IMAGE PROMPT
```

---

### §1 · BLOG METADATA

```yaml
SLUG:           kebab-case-slug-max-60-chars
TITLE_EN:       "Compelling, curiosity-gap title (max 70 chars)"
TITLE_AR:       "عنوان عربي طبيعي وليس ترجمة حرفية (max 70 chars)"
EXCERPT_EN:     "1-2 sentence hook with a concrete promise, max 160 chars — doubles as meta description"
EXCERPT_AR:     "نسخة عربية طبيعية للملخص (max 160 chars)"
COVER_IMAGE:    see §4
TAGS:           see §5
LINKED_PROJECT: "Project Name"  ← must match §8 title_en exactly
PUBLISHED:      true
```

---

### §2 · CONTENT — ENGLISH (Markdown)

Write the full blog body at the level of **a principal engineer at a top-tier tech company** writing for smart technical decision-makers. Every sentence must earn its place.

#### Required Structure:

```markdown
## The Problem

[2-3 paragraphs. Show the pain with specificity — numbers, scenarios, frustrations. 
Make the reader feel seen. No generic "businesses struggle with X" nonsense.
E.g., "Every Monday, our client's sales team spent 4 hours manually cross-referencing 
LinkedIn exports with a CRM that hadn't been updated in three weeks."
Use a real, textured story if possible.]

![project-name-pain-scenario](GENERATE: [see §7 for full prompt rules])

## The Solution: [Project Name]

[2-3 paragraphs. What we built, WHY this architecture, what makes this approach better 
than existing tools. Be opinionated. Reference real technical trade-offs.]

![project-name-dashboard-overview](SCREENSHOT: Main dashboard view, full viewport, dark mode, no scrolling needed)

## Key Features

### ⚡ [Feature 1 — Name it powerfully]

[1-2 sharp paragraphs. What it does, why it matters, how it was technically achieved. 
Include an implementation insight that only someone who built this could know.]

![project-name-feature-1](SCREENSHOT: Close-up of [feature] in action — show the result, not just the UI)

### 🔄 [Feature 2]

[1-2 paragraphs]

### 📊 [Feature 3]

[1-2 paragraphs]

### 🔐 [Feature 4 — if applicable]

[1-2 paragraphs]

> 💡 **Engineering insight**: [A non-obvious lesson from building this feature that 
> the reader can steal for their own projects]

![project-name-features-grid](SCREENSHOT: Side-by-side or grid showing 2-3 feature screens)

## Architecture & Tech Stack

[1-2 paragraphs. Not a list of technologies — EXPLAIN the architecture decisions. 
Why Next.js over Remix? Why Supabase over Planetscale? What trade-offs did you accept?]

| Layer | Technology | Why We Chose It |
|:------|:-----------|:----------------|
| Frontend | Next.js 16 + React 19 | Server Components cut TTFB by 60%; edge-ready |
| Backend | [Tech] | [Specific, non-generic reason] |
| Database | [Tech] | [Specific technical trade-off explanation] |
| AI/ML | [Tech] | [What it unlocks that alternatives couldn't] |
| Automation | [Tech] | [Why n8n/Zapier/custom — be direct] |
| Infra / Deploy | [Tech] | [Cost, scale, or dev-experience reason] |

![project-name-architecture|1000x500](GENERATE: [see §7 for full prompt rules])

## Results & Impact

[2-3 paragraphs with HARD NUMBERS. Before/after. Time saved. Revenue impacted. 
Conversion rate delta. Don't hedge. If you measured it, say it plainly.]

> **"[The most powerful client quote or metric. Make it a jaw-dropper.]"**

![project-name-metrics-infographic](GENERATE: [see §7 for full prompt rules])

## What I'd Do Differently

[This section sets you apart from generic case studies. 3-4 points of genuine, 
honest reflection. Non-obvious lessons. Technical debt you'd avoid. 
Architecture you'd change. This is what builds trust with senior engineers.]

1. **[Lesson 1]** — [Concrete, specific explanation. Not "plan better" — tell us WHAT to plan.]
2. **[Lesson 2]** — [Explanation]
3. **[Lesson 3]** — [Explanation]

---

*Built by [asra3.com](https://asra3.com) — Turning ideas into high-performance digital products.*
```

---

### §3 · CONTENT — ARABIC (Markdown)

**An Arabic original** — not a translation. Rules:

- Write in Modern Standard Arabic (فصحى معاصرة), not dialect
- Keep tech terms in English: API, SaaS, Next.js, CI/CD, UI/UX, dashboard, backend
- Use **exact same image references** (same `![alt](...)` lines) — images are shared
- Match the heading hierarchy of the English version exactly
- Voice: First-person plural: بنينا، طوّرنا، صممنا، اخترنا
- Arabic paras are naturally ~10% shorter — that's fine, don't pad
- The "What I'd Do Differently" section → "ما الذي كنت سأغيّره"
- Metrics, code, stack names stay in English — don't transliterate

---

### §4 · COVER IMAGE PROMPT

```
FILENAME: [project-name]-cover.png (kebab-case)

PROMPT: "[A 60-100 word, cinema-grade image direction. See § IMAGE PROMPT SYSTEM below 
for the exact formula and standards.]"
```

---

### §5 · BLOG TAGS

```json
["Tag1", "Tag2", "Tag3", "Tag4", "Tag5", "تطوير ويب"]
```

Rules:
- 5-8 tags total
- Mix: broad category (SaaS, Automation) + specific tech (Next.js, Supabase) + domain (FinTech, HR Tech)
- 1-2 Arabic tags: تطوير ويب، أتمتة، SaaS
- Tags used in the project card (§8) should overlap here

---

### §6 · SCREENSHOTS LIST

Every `SCREENSHOT:` reference in §2 and §3 must appear here — the user needs to know exactly what to capture.

| # | Filename (= Alt Text) | What to Capture | Used In |
|:-:|:----------------------|:----------------|:--------|
| 1 | `[project-name]-dashboard-overview` | Full dashboard, dark mode, 1440px viewport, no browser chrome | §2 "The Solution" |
| 2 | `[project-name]-feature-1` | [Specific interaction shown — what state, what action] | §2 Feature 1 |
| 3 | `[project-name]-features-grid` | [What screens, what layout] | §2 Features section |
| 4 | `[project-name]-mobile-view` | Mobile 375px, key screen, Responsively or DevTools | Always |

> **Upload workflow**: Screenshot → save as `filename.png` → Admin panel → "Upload Image" button → paste the returned `/uploads/filename.png` URL into the markdown image tag.

---

### §7 · GENERATED IMAGES LIST

Every `GENERATE:` reference in §2 and §3 must appear here with a complete, standalone prompt. Never reference "the prompt above."

| # | Filename | Full Prompt | Used In |
|:-:|:---------|:------------|:--------|
| 1 | `[project-name]-cover` | [Full §4 prompt repeated verbatim] | Cover image |
| 2 | `[project-name]-pain-scenario` | [Full prompt — see IMAGE PROMPT SYSTEM] | §2 "The Problem" |
| 3 | `[project-name]-architecture` | [Full prompt] | §2 Tech Stack |
| 4 | `[project-name]-metrics-infographic` | [Full prompt] | §2 Results |

> **Workflow**: Copy prompt → generate in Midjourney / DALL·E / Firefly → save as `filename.png` → upload → paste URL.

---

### §8 · PROJECT ENTRY

This is a **complete, paste-ready project card** for the admin Projects panel. 

```yaml
# ─── TITLES ──────────────────────────────────────────────────────────────
TITLE_EN:        "Project Name (max 60 chars)"
TITLE_AR:        "اسم المشروع (max 60 chars)"

# ─── CATEGORY ────────────────────────────────────────────────────────────
CATEGORY_EN:     "SaaS"           ← one of: SaaS / Web App / Automation / E-commerce / AI / Mobile / Other
CATEGORY_AR:     "تطبيق SaaS"

# ─── DESCRIPTION (2-3 sharp sentences. Show ROI, not features.) ──────────
DESCRIPTION_EN:  "Built an AI-powered lead qualification engine for B2B sales teams 
                  that cut manual prospecting from 20 hours to under 4 hours per week. 
                  The system scores leads in real-time using a custom-trained model 
                  and syncs directly with HubSpot, Salesforce, and Pipedrive."
DESCRIPTION_AR:  "منصة ذكاء اصطناعي لتأهيل العملاء المحتملين، تقلّص ساعات العمل اليدوي 
                  من 20 ساعة إلى أقل من 4 ساعات أسبوعيًا. تقيّم الأداة العملاءَ لحظيًا 
                  وتُزامن البيانات تلقائيًا مع أبرز أنظمة CRM."

# ─── IMAGE ───────────────────────────────────────────────────────────────
IMAGE_URL:       "/uploads/[project-name]-cover.png"   ← same file as the blog cover

# ─── TAGS (shared with blog tags, tech-focused) ──────────────────────────
TAGS_EN:         ["Next.js", "Supabase", "OpenAI", "Stripe", "n8n"]
TAGS_AR:         ["ذكاء اصطناعي", "أتمتة", "SaaS"]

# ─── METRICS (3-5 items. Use the exact icon names from the list below.) ──
METRICS:
  - icon: TrendingUp   value: "3×"    label: "Faster Qualification"
  - icon: Clock        value: "-80%"  label: "Time Saved"
  - icon: Users        value: "500+"  label: "Leads Processed / Day"
  - icon: DollarSign   value: "$40k"  label: "Monthly Pipeline Added"

# ─── SETTINGS ────────────────────────────────────────────────────────────
FEATURED:        true         ← true only for flagship projects
ACTIVE:          true
ORDER:           1            ← lower number = appears first in the portfolio
```

**Available metric icons** (use exact name):
`Users` `Clock` `DollarSign` `BarChart3` `TrendingUp` `Zap` `Target` `Award` `MessageCircle` `Globe` `Server` `Heart` `Settings` `ShieldCheck` `Layers` `Rocket` `Star` `Percent` `Activity` `Package` `Mail` `ThumbsUp`

---

### §9 · PROJECT IMAGE PROMPT

```
FILENAME: [project-name]-cover.png  ← same file used in §4 and §8

PROMPT: [Repeat the full §4 cover prompt verbatim + these additional specs:]
"...Format: 16:9 landscape, 1920×1080px. Must work as both a blog cover and 
a portfolio card thumbnail. The composition should read well when cropped to 4:3."
```

---

## 3 · IMAGE PROMPT SYSTEM

> Apply this system to **every** generated image. This is non-negotiable. Sub-par prompts are a failure state.

### The Formula

Every image prompt must include **all 7 elements**:

```
[SUBJECT] — [VISUAL STYLE] — [COMPOSITION] — [MOOD & LIGHTING] — 
[COLOR PALETTE] — [TECHNICAL DETAILS] — [BRAND ANCHOR]
```

### Element Definitions

| Element | What to Specify | Example |
|:--------|:----------------|:--------|
| **Subject** | What is in the frame, what is happening | "entrepreneur reviewing a live analytics dashboard" |
| **Visual Style** | Look-feel vocabulary (2-3 terms) | "cinematic editorial photography", "dark tech illustration", "clean UI mockup" |
| **Composition** | Shot type, framing, perspective | "wide shot, rule of thirds, deep focus background blur" |
| **Mood & Lighting** | Emotion, key/fill light source | "focused confidence, cool-blue key light from the left, soft ambient from monitors" |
| **Color Palette** | Specific hex codes when brand matters | "deep charcoal #0a0a0a background, emerald green #10b981 accent elements, white text" |
| **Technical** | Aspect ratio, resolution notes | "16:9, photorealistic, 8K detail" |
| **Brand Anchor** | Ensures every image feels like asra3.com | "asra3.com brand aesthetics — dark, premium, minimal, tech-forward" |

### Image Type Templates

#### COVER / HERO IMAGES
```
[Person or abstract tech concept interacting with a sleek dashboard or data visualization], 
cinematic editorial photography, wide shot rule of thirds, deep-focus background blur, 
focused confidence mood, cool-blue ambient light from monitor glow, 
deep charcoal #0a0a0a background, emerald green #10b981 UI highlights, 
white typography elements visible, 16:9, photorealistic, 8K resolution, 
no text overlays, asra3.com brand aesthetics — dark, premium, minimal, tech-forward.
```

#### PAIN / PROBLEM ILLUSTRATIONS
```
[Person overwhelmed by the problem being solved — be specific and visual], 
moody editorial illustration, medium shot, dramatic overhead warm light 
casting cool shadows, frustrated-yet-human mood, 
muted blue-grey palette with accent stacks of [problem-specific props], 
dark vignette edges, 16:9, high-detail flat illustration or photography hybrid, 
asra3.com brand aesthetics.
```

#### ARCHITECTURE DIAGRAMS
```
Clean system architecture diagram on a deep charcoal #0a0a0a background. 
[List the 4-7 components/services in the architecture].
Components shown as rounded rectangles in dark #1a1a1a with white labels. 
Data flow shown as emerald green #10b981 directional arrows with subtle glow.
Section labels in muted grey #888888. No clipart icons — purely geometric shapes.
16:9 format, vector-clean style, minimal, no gradients on boxes.
```

#### METRICS / RESULTS INFOGRAPHICS
```
Dark-theme before/after metrics infographic on #0a0a0a background. 
Left column shows BEFORE state: [specific bad numbers in muted red #ef4444].
Right column shows AFTER state: [specific good numbers in emerald green #10b981]. 
Center divider arrow or transformation symbol. 
[2-3 Additional circular progress indicators or bar charts for secondary metrics].
White labels, Space Grotesk or Inter-style typography, 
clean modern dashboard aesthetic, 16:9, asra3.com brand identity.
```

#### FEATURE SCREENSHOTS (for illustration replacements)
```
Professional UI mockup of a [specific feature] interface displayed on a frameless 
dark laptop or floating browser window. 
[Describe what the interface shows — 3-4 specific UI elements].
Dark mode UI with #0a0a0a background, emerald green #10b981 primary actions,
subtle card shadows in #1a1a1a. 
Three-quarter angle view, 4K detail, professional product photography style,
soft studio lighting from above-right, asra3.com brand aesthetics.
```

### Anti-Patterns (Never Do This)

❌ `"An image of a person using a computer"` — Too vague. No mood, no style, no palette.  
❌ `"Dark background with green"` — Incomplete. No subject, no composition, no story.  
❌ `"Professional architecture diagram"` — Tells the AI nothing. Define every element.  
❌ Any prompt under 40 words — Not enough signal for professional output.  
✅ Every prompt must be **50-120 words minimum**. Long prompts win.

---

## 4 · Admin Panel Paste Map

### Blog Post
| Output | Admin Field | Notes |
|:-------|:------------|:------|
| `SLUG` | Slug input | No caps, no spaces |
| `TITLE_EN` | Title → English tab | ≤ 70 chars |
| `TITLE_AR` | Title → Arabic tab | ≤ 70 chars |
| `EXCERPT_EN` | Excerpt → English tab | ≤ 160 chars |
| `EXCERPT_AR` | Excerpt → Arabic tab | ≤ 160 chars |
| `§2` | Content → English tab | Paste in Markdown mode |
| `§3` | Content → Arabic tab | Paste in Markdown mode |
| Cover image | Cover Image | Upload → paste returned URL |
| `§5` tags | Tags input | Add each tag individually |
| `LINKED_PROJECT` | Project dropdown | Select matching project name |
| Published | Toggle | Switch ON |

### Project Entry
| Output | Admin Field | Notes |
|:-------|:------------|:------|
| `TITLE_EN` | Title → English tab | — |
| `TITLE_AR` | Title → Arabic tab | — |
| `CATEGORY_EN` | Category → English tab | — |
| `CATEGORY_AR` | Category → Arabic tab | — |
| `DESCRIPTION_EN` | Description → English tab | — |
| `DESCRIPTION_AR` | Description → Arabic tab | — |
| `IMAGE_URL` | Image URL field | Upload cover first, paste URL |
| `TAGS_EN` | Tags → English tab | Type + Enter for each |
| `TAGS_AR` | Tags → Arabic tab | Type + Enter for each |
| `METRICS` | Metrics editor | Add each row: icon → value → label |
| `FEATURED` | Featured toggle | ON only for flagship projects |
| `ACTIVE` | Active toggle | Always ON |
| `ORDER` | Order input | Lower = shows first |

> **Critical linking step**: The blog post's `LINKED_PROJECT` dropdown and the project's `TITLE_EN` must be identical strings. Create the project first, then the blog post.

---

## 5 · Writing Standards

### English — Principal Engineer Voice
- **Tone**: Senior developer + CTO — professional, opinionated, specific. Not a press release.
- **Hedging**: Banned. "We chose Supabase because Postgres extensions gave us pg_trgm for full-text search" not "we chose Supabase for several reasons."
- **First-person plural**: "We built…", "Our approach…", "We discovered…"
- **Length**: 1,400–2,200 words. Quality > length. Every sentence adds signal.
- **SEO**: Project name + key technologies appear in first 2 headings naturally.
- **No filler phrases**: Never use "In conclusion", "As we know", "Needless to say", "In today's fast-paced world".
- **Emojis in headings**: ⚡ 🔄 📊 🎨 🔐 🚀 — they render well and improve scannability.

### Arabic — المقال الأصيل
- فصحى معاصرة — لا عامية، لا ترجمة حرفية
- صوت: متكلم جماعي: بنينا، طوّرنا، اخترنا، اكتشفنا
- المصطلحات التقنية: تبقى بالإنجليزية: API, dashboard, SaaS, CI/CD
- الطول: طبيعي أن يكون أقصر ~10% — لا حشو
- أسلوب: ثقة هادئة، تخصص حقيقي — ليس دعائيًا

---

## 6 · Quality Checklist

Run this before delivering. Every box must be checked.

**Structure:**
- [ ] All 9 sections present and labelled with §
- [ ] Slug is kebab-case, ≤ 60 chars
- [ ] Both blog titles ≤ 70 chars
- [ ] Both excerpts ≤ 160 chars
- [ ] `LINKED_PROJECT` in §1 matches `TITLE_EN` in §8 exactly

**Blog Content:**
- [ ] English ≥ 1,400 words
- [ ] "What I'd Do Differently" section present — not replaced with generic lessons
- [ ] Results section has ≥ 2 concrete metrics with real numbers
- [ ] Tech stack table has non-generic "Why We Chose It" column
- [ ] At least one blockquote used
- [ ] No lorem ipsum, no filler phrases banned above

**Images:**
- [ ] Every image has `SCREENSHOT:` or `GENERATE:` prefix in markdown
- [ ] Alt texts are `project-name-descriptive-noun`, kebab-case, ≤ 50 chars
- [ ] Every `GENERATE:` image has a standalone ≥ 50-word prompt in §7
- [ ] Every generated prompt follows the 7-element formula from §3
- [ ] Cover prompt (§4) repeated verbatim in §7 and §9
- [ ] All brand colors: emerald green `#10b981` on charcoal `#0a0a0a`

**Project Entry:**
- [ ] Metrics use only valid icon names from the list in §8
- [ ] Description is 2-3 sentences showing ROI, not features
- [ ] IMAGE_URL points to the same file as the blog cover
- [ ] TAGS_EN is tech-focused; TAGS_AR is audience-focused
- [ ] ORDER field assigned (not left at 0 unless it is the first project)

**Arabic:**
- [ ] Same image references as English
- [ ] Same heading structure
- [ ] Reads naturally — confirmed by re-reading without looking at English

---

## 7 · Quick Mode (Integrations / Small Projects < 500 words)

For quick automations or micro-case-studies:

**Blog**: Problem (1 para) → Solution (1 para) → How It Works (3 bullets) → Tech Used (inline) → Result (1 blockquote metric)

**Project entry**: Still required. Fill all §8 fields. Use 2 metrics minimum.

**Images**: Cover image only (§4 + §9). No in-body generated images. Screenshots only.

Still provide: §1 metadata, §5 tags, §6 screenshots list, §8 project entry.
