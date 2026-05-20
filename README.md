# Bootcamp-FE

## vh  -> Viewport Height

Represents the height of the visible window (viewport).

- 1vh = 1% of the screen height
- 100vh = 100% of the screen height

Problem

On mobile devices, this can cause problems because it includes parts of the browser (URL bar, browser buttons), making the size larger than what's visible.


## dvh → Dynamic Viewport Height

DVH is a more modern and accurate version of VH.

- 1 DVH = 1% of the actual visible height
- 100 DVH = actual visible screen height

Difference with vh

On mobile devices:

* 100vh may be incorrect because it takes the browser toolbar into account.
* 100dvh dynamically adapts when the browser toolbar appears or disappears.

## fr → Fraction Unit

fr is used only in CSS Grid.
It represents a fraction of the available space.

Example:
```
display: grid;
grid-template-columns: 1fr 1fr;
```

This divides the width into 2 equal parts.

|------50%------|------50%------|


Other example:
```
grid-template-columns: 1fr 2fr;
```

|----33%----|---------66%---------|

The second one takes up twice the space of the first one.

## rem → Root EM

rem uses the font size of the root element (html) as a reference.

By default, browsers use:

```
html {
    font-size: 16px;
}
```

* 1rem = 16px
* 2rem = 32px
* 0.5rem = 8px

## em → relativo al padre

em It uses the font-size of the parent element as a reference.

For example:

```
<div class="parent">
    <p class="child">Hola</p>
</div>

.parent {
    font-size: 20px;
}

.child {
    font-size: 2em;
}
```

Result:

* 2 × 20px = 40px

Because .child looks at the size of .parent.