import fetch from "node-fetch";

// header
import { headers } from "./headers.js";

console.log("headers: ", headers);

export default (params) =>
  fetch("https://mall.bilibili.com/mall-magic-c/internet/c2c/v2/list", {
    headers,
    body: JSON.stringify(params),
    method: "POST",
  });
