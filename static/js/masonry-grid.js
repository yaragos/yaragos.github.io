(() => {
  const resizeGrid = (grid) => {
    grid.classList.add('is-masonry');

    const styles = getComputedStyle(grid);
    const rowHeight = parseFloat(styles.getPropertyValue('grid-auto-rows'));
    const masonryGap = parseFloat(styles.getPropertyValue('--masonry-gap')) || 0;

    if (!rowHeight) return;

    grid.querySelectorAll('.entry-card').forEach((item) => {
      item.style.gridRowEnd = 'span 1';
      const itemHeight = item.getBoundingClientRect().height;
      item.style.gridRowEnd = `span ${Math.ceil((itemHeight + masonryGap) / rowHeight)}`;
    });
  };

  const resizeAllGrids = () => {
    document.querySelectorAll('[data-masonry-grid]').forEach(resizeGrid);
  };

  let resizeFrame;
  const scheduleResize = () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(resizeAllGrids);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleResize, { once: true });
  } else {
    scheduleResize();
  }

  window.addEventListener('load', scheduleResize);
  window.addEventListener('resize', scheduleResize);

  if (document.fonts) {
    document.fonts.ready.then(scheduleResize);
  }
})();
