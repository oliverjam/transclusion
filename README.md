# transclusion

A JavaScript library for adding dynamic interactivity to server-rendered apps. Inspired by HTMX, but designed for a more limited progressive enhancement feature-set.

## Usage

### Installation

Include the transclusion script in your HTML document:

```html
<script src="transclusion.js" defer></script>
```

### Enhance links

Add `data-boost` to an anchor tag. By default transclusion will try to emulate existing browser navigation by fetching the URL in the link's `href`, then swapping the `<body>` from the response into the current page. Note that this assumes the contents of the `<head>` are unchanged.

```html
<a href="/posts/1" data-boost>Post 1</a>
```

> [!IMPORTANT]  
> I would not recommend boosting a link like this because it doesn't really improve user-experience, and can make things worse since navigating with JS will usually have more inconsistencies than a native navigation.
>
> Instead use this pattern when you want to update a smaller part of the page whilst maintaining state in the rest of the UI. You can target an element on the page by passing a selector to the `data-target` attribute:

```html
<a href="/posts/1" data-boost data-target="#post">Post 1</a>
```

By default transclusion will swap the response `<body>` into this element, which is usually not what you want. You can select an element from the response by passing a selector to the `data-select` attribute:

```html
<a href="/posts/1" data-boost data-target="#post" data-select="#post">Post 1</a>
```

### Enhance forms

Forms are a great target for enhancement since they often mutate some server-side data and change very little of the UI. Boosting forms works just like links. Here's an example of a counter that updates the result in-place without losing UI state like button focus:

```html
<form method="POST" data-boost data-select="output" data-target="output">
  <button name="diff" value="-1">-</button>
  <output>0</output>
  <button name="diff" value="+1">+</button>
</form>
```

See the `examples/` directory for more complex form examples.
