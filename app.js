import fs from "fs/promises";

import fetchList from "./node-fetch.js";

// let nextId = null;
// 把 nextId 存储到文件中

const getList = async (name, fileName = "./list.json", params = {}) => {
  // 判断 nextId.txt 是否存在
  try {
    await fs.access("./nextId.txt");
  } catch (error) {
    // 文件不存在
    await fs.writeFile("./nextId.txt", "");
  }
  // 读取 nextId，如果没有就是 null
  const nextId = (await fs.readFile("./nextId.txt", "utf-8")) || null;
  console.log("nextId: ", nextId);

  // 获取数据
  const response = await fetchList({
    categoryFilter: "2312",
    nextId,
    ...params,
  });
  const data = await response.json();
  console.log("data: ", data);

  // 获取 newNextId
  const newNextId = data?.data?.nextId;
  console.log("newNextId: ", newNextId);
  // 把 newNextId 写入文件
  await fs.writeFile("./nextId.txt", newNextId);

  // 获取 list
  let list = data?.data?.data;
  console.log("list: ", list);

  // 根据 name 过滤 list，name 是个字符串数组，需要满足所有的 name
  // 对于字母，不区分大小写
  // name: ['a','b']
  if (name?.length) {
    list = list.filter(({ c2cItemsName }) => {
      return name.every((item) => {
        return c2cItemsName.toLowerCase().includes(item.toLowerCase());
      });
    });
  }

  // 把 list 写入文件,不要覆盖原来的内容
  // 判断文件是否存在
  try {
    await fs.access(fileName);
  } catch (error) {
    // 文件不存在
    await fs.writeFile(fileName, JSON.stringify([]));
  }
  const oldList = await fs.readFile(fileName, "utf-8");
  const oldListJson = JSON.parse(oldList);
  const newListJson = [...oldListJson, ...list];
  await fs.writeFile(fileName, JSON.stringify(newListJson));

  return list;
};

// 间隔的时长，单位毫秒，从 config.json 中读取

const getConfig = async () => {
  const configJSON = await fs.readFile("./config.json", "utf-8");
  const config = JSON.parse(configJSON);

  return config;
};

const main = async () => {
  const { interval, priceFilters, name, categoryFilter } = await getConfig();
  console.log("interval: ", interval);

  // 如果 interval 小于 1000，就不执行
  if (!interval || interval < 1000) {
    return;
  }

  // // 清空 list.json
  // await fs.writeFile("./list.json", JSON.stringify([]));

  // 每间隔一段时间执行一次,把数据写入 list.json
  // 在最开始的时候，先执行一次
  await getList(name, "./list.json", {
    priceFilters,
    categoryFilter,
  });
  setInterval(async () => {
    await getList(name, "./list.json", {
      priceFilters,
    });
  }, interval);
};

main();
