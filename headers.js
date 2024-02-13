import fs from "fs/promises";

// cookie 从 cookie.txt 中读取
const cookie = (await fs.readFile("./cookie.txt", "utf-8")) || null;

export const headers = {
  accept: "application/json, text/plain, */*",
  "accept-language": "zh-CN,zh-HK;q=0.9,zh-TW;q=0.8,zh;q=0.7",
  "content-type": "application/json",
  "sec-ch-ua":
    '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "sec-ch-ua-mobile": "?1",
  "sec-ch-ua-platform": '"Android"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  cookie,
  Referer:
    "https://mall.bilibili.com/neul-next/index.html?page=magic-market_index",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};
