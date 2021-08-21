export default null; //TypeScript警告避け

const worker = self as unknown as Worker;
worker.addEventListener("message", ({ data: { count } }: MessageEvent<{ count: number }>) => {
  let a = 0;
  for (let j = 0; j < 1000; j++) {
    a = 0;
    for (let i = 1; i <= count; i++) {
      a += i;
    }
  }
  worker.postMessage({ value: a });
});
