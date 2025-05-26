export const withRequestStatus = async <T>(
  fn: () => Promise<T>,
): Promise<T | null | undefined> => {
  const requestStatusStore = useRequestStatusStore();

  let timerId: NodeJS.Timeout | null = null;

  try {
    requestStatusStore.setStatus('loading');
    const result = await fn();
    requestStatusStore.setStatus('success');

    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      requestStatusStore.setStatus('idle');
      timerId = null;
    }, 1500);

    return result;
  } catch (err) {
    requestStatusStore.setStatus('error');

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      requestStatusStore.setStatus('idle');
      timerId = null;
    }, 2500);

    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};
