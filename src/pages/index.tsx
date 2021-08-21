import { useState } from "react";

const Page = () => {
  const [values, setValues] = useState<(string | number)[]>([]);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const index = values.length;
    setValues([...values, "実行中"]);
    //web-workerの呼び出し
    const worker = new Worker(new URL("../libs/sums", import.meta.url));
    worker.addEventListener("message", ({ data: { value } }) => {
      setValues((values) => values.map((v, i) => (i === index ? value : v)));
    });
    worker.postMessage({ count: parseInt(e.currentTarget["count"].value) });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="count" defaultValue="1000000" />
        <button>実行</button>
      </form>
      {values.map((v, index) => (
        <div key={index}>{v}</div>
      ))}
    </div>
  );
};

export default Page;
