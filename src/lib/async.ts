export const delay = (time = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(1), time);
  });
