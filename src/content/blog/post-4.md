---
title: Markdown Style Guide Post
author: Markdown Tester
description: "A complete Markdown sample covering major elements for stylesheet testing."
pubDate: 2026-03-09
---

# H1 — Page Title

A short intro paragraph with **bold text**, *italic text*, ***bold + italic***, ~~strikethrough~~, `inline code`, and ==highlight-like text (if supported)==.

---

## H2 — Links and References

Inline link: [Astro Docs](https://docs.astro.build)

Autolink: <https://example.com>

Email autolink: <hello@example.com>

Reference-style link: [MDN Docs][mdn]

[mdn]: https://developer.mozilla.org "MDN Web Docs"

### H3 — Escaping and Special Characters

Use backslashes to escape Markdown: \*not italic\*, \# not a heading, \[not a link\].

Entities: &copy; &mdash; &rarr; &lt;div&gt;

---

## H2 — Paragraphs, Line Breaks, and Blockquotes

This is a paragraph.
It stays in the same paragraph because Markdown collapses single newlines.

This is another paragraph.
This line ends with two spaces for a forced line break.  
This appears on the next line.

> Blockquote level 1
>
> > Nested blockquote level 2
> >
> > - With a list item
> > - And another item
>
> Back to level 1.

---

## H2 — Lists

### Unordered List

- Item A
- Item B
  - Nested item B.1
  - Nested item B.2
    - Deep nested item
- Item C

### Ordered List

1. First step
2. Second step
   1. Sub-step 2.1
   2. Sub-step 2.2
3. Third step

### Mixed List

1. Ordered parent
   - Unordered child
   - Another child
2. Ordered parent two

### Task List (GFM)

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task with **formatting**

---

## H2 — Code

Inline code example: `const answer = 42;`

### Fenced Code Block (JavaScript)

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('Markdown');
```

### Fenced Code Block (CSS)

```css
.markdown-preview h1 {
  margin-block: 1.5rem 1rem;
  font-weight: 700;
}
```

### Fenced Code Block (HTML)

```html
<figure>
  <img src="/images/example.jpg" alt="Example image" />
  <figcaption>Example caption text</figcaption>
</figure>
```

### Indented Code Block

    This is an indented code block.
    It uses four leading spaces.

---

## H2 — Tables (GFM)

| Feature        | Syntax Example          | Notes                   |
| -------------- | ----------------------- | ----------------------- |
| Bold           | `**text**`              | Strong emphasis         |
| Italic         | `*text*`                | Emphasis                |
| Inline code    | `` `code` ``            | Monospace style         |
| Link           | `[label](https://...)`  | External or internal    |

### Alignment Table

| Left Align | Center Align | Right Align |
| :--------- | :----------: | ----------: |
| alpha      |    beta      |       gamma |
| one        |     two      |       three |

---

## H2 — Media

### Image

![Sample placeholder image](https://picsum.photos/800/300 "Optional title text")

### Linked Image

[![Linked image](https://picsum.photos/320/120)](https://example.com)

---

## H2 — Horizontal Rules

Above this line is content.

---

Below this line is more content.

***

Another separator style.

___

Third separator style.

---

## H2 — Footnotes (GFM)

A sentence with a footnote reference.[^1]

Another reference to a second footnote.[^long-note]

[^1]: This is a short footnote.
[^long-note]: This is a longer footnote with multiple paragraphs.

    You can indent to continue the same footnote block.

---

## H2 — Definition-style Content (HTML fallback)

<dl>
  <dt>Term One</dt>
  <dd>Definition for the first term.</dd>

  <dt>Term Two</dt>
  <dd>Definition for the second term, useful for testing spacing.</dd>
</dl>

---

## H2 — Collapsible Section (HTML)

<details>
  <summary>Click to expand</summary>
  This content is hidden by default and expanded on click.

  It can include **Markdown-style** text depending on renderer behavior.
</details>

---

## H2 — Keyboard and Inline Semantics (HTML)

Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open search.

Use <mark>highlighted text</mark>, <sub>subscript</sub>, and <sup>superscript</sup> if your renderer/styles support them.

---

## H2 — Final Checklist

- [x] Headings (H1–H3)
- [x] Paragraphs and line breaks
- [x] Emphasis and inline formatting
- [x] Blockquotes
- [x] Ordered and unordered lists
- [x] Task lists
- [x] Code blocks (fenced + indented)
- [x] Tables
- [x] Images and links
- [x] Horizontal rules
- [x] Footnotes
- [x] Raw HTML elements for advanced styling

That’s the full sample post. Use this page to verify typography, spacing, colors, and responsive behavior for your Markdown stylesheet.