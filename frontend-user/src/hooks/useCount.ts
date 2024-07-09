import { useEffect } from 'react';

export const useCount = ({
  countable,
  handleCountDown,
  stop,
}: {
  countable: boolean;
  handleCountDown: (_: MessageEvent) => void;
  stop: boolean;
}) => {
  useEffect(() => {
    if (stop) {
      window.postMessage('end-timer');
    }
    const webWorker = countable && !stop ? new Worker(new URL('../../worker.js', import.meta.url)) : undefined;

    if (countable && !stop) {
      webWorker?.postMessage({ name: 'count' });
      webWorker?.addEventListener('message', handleCountDown);
    }
    return () => {
      webWorker?.postMessage({ name: 'stop-count' });
      webWorker?.removeEventListener('message', handleCountDown);
      webWorker?.terminate();
    };
  }, [handleCountDown, stop, countable]);
};

export const useRecevieStopCountTime = (cb: () => void) => {
  useEffect(() => {
    const handleReceiveMessage = (e: MessageEvent) => {
      if (e.origin === window.location.origin) {
        cb();
      }
    };
    window.addEventListener('message', handleReceiveMessage);
    return () => {
      window.removeEventListener('message', handleReceiveMessage);
    };
  });
};
