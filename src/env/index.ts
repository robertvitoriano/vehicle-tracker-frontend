export const env =
  process.env.NODE_ENV === "test"
    ? require("./env.node").env
    : require("./env.vite").env;
