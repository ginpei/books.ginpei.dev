---
layout: base.njk
title: Drag elements by JavaScript
date: 2023-04-11
---

- [Demo](./demo/)

```js
const elTargets = document.querySelectorAll('.box');
for (const el of elTargets) {
  el.addEventListener('pointerdown', onPointerDown);
}

/**
 * @param {PointerEvent} event
 */
function onPointerDown(event) {
  if (!(event.currentTarget instanceof HTMLElement)) {
    throw new Error('No current target');
  }
  const el = event.currentTarget;

  const offsetX = event.clientX - el.offsetLeft;
  const offsetY = event.clientY - el.offsetTop;

  el.setPointerCapture(event.pointerId);
  el.addEventListener('pointermove', _onPointerMove);
  el.addEventListener('pointerup', _onPointerUp);
  el.addEventListener('pointercancel', _onPointerUp);

  /**
   * @param {PointerEvent} event
   */
  function _onPointerMove(event) {
    const { clientX, clientY } = event;
    el.style.left = `${clientX - offsetX}px`;
    el.style.top = `${clientY - offsetY}px`;
  };

  /**
   * @param {PointerEvent} event
   */
  function _onPointerUp(event) {
    el.releasePointerCapture(event.pointerId);
    el.removeEventListener('pointermove', _onPointerMove);
    el.removeEventListener('pointerup', _onPointerUp);
    el.removeEventListener('pointercancel', _onPointerUp);
  };
}
```
