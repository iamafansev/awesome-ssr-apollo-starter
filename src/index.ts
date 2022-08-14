const express = require("express");

let app = require("./server").default;

if (module.hot) {
  module.hot.accept("./server", () => {
    console.log("🔁  HMR Reloading `./server`...");
    try {
      // eslint-disable-next-line global-require
      app = require("./server").default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default express()
  .use((req: Request, res: Response) => app.handle(req, res))
  .listen(port, () => {
    console.log(`> Started on port ${port}`);
  })
  .on("error", (err: Error) => {
    console.error(err);
  });
