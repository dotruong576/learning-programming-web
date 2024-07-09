let timer = undefined;

addEventListener('message', (event) => {
  if (event.data.name === 'count') {
    timer = setInterval(() => {
      postMessage({ name: 'tick' });
    }, 1000);
  } else if (event.data.name === 'stop-count') {
    clearInterval(timer);
  }
});
