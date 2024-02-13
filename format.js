import fs from "fs/promises";

const discount = 1;

const discountFilter = (list, discount) => {
  return list.filter((item) => item.discount <= discount);
};

// 判断文件是否存在
try {
  await fs.access("./list.json");
} catch (error) {
  // 文件不存在
  await fs.writeFile("./list.json", JSON.stringify([]));
}
// 为 list.json 里的数组做一下去重
const listJSON = await fs.readFile("./list.json", "utf-8");
const list = JSON.parse(listJSON);
let newList = [];
const newList2 = [];
list.forEach((item) => {
  if (!newList2.includes(item.c2cItemsId)) {
    newList2.push(item.c2cItemsId);
    newList.push(item);
  }
});

// 为每个商品加上链接 格式: https://mall.bilibili.com/neul-next/index.html?page=magic-market_detail&noTitleBar=1&itemsId=21370808233&from=market_index
newList.forEach((item) => {
  item.link = `https://mall.bilibili.com/neul-next/index.html?page=magic-market_detail&noTitleBar=1&itemsId=${item.c2cItemsId}&from=market_index`;
});

// 为每个商品计算折扣
newList.forEach((item) => {
  item.discount = (item.price / (item.showMarketPrice * 100)).toFixed(2);
});

// 过滤掉折扣大于 discount 的商品
newList = discountFilter(newList, discount);

// 让 newList 按照 折扣 从小到大排序
newList.sort((a, b) => a.discount - b.discount);

await fs.writeFile("./list-format.json", JSON.stringify(newList));
