import fs from "fs/promises";

import fetchList from "./node-fetch.js";

// let nextId = null;
// 把 nextId 存储到文件中

let intervalInstance = null;

const stopFetch = async () => {
  await fs.writeFile("./nextId.txt", "empty");
  // 停止定时器，这是最后一批数据
  clearInterval(intervalInstance);
  console.log(
    "请求不到更多商品了,可以尝试删除 nextId.txt 文件，重新开始；或者修改 config.json 中的参数。"
  );

  console.log("----------------- fetch end ---------------------------");
};

const getList = async (name, fileName = "./list.json", params = {}) => {
  console.log("----------------- new fetch ---------------------------");
  // 判断 nextId.txt 是否存在
  try {
    await fs.access("./nextId.txt");
  } catch (error) {
    // 文件不存在
    await fs.writeFile("./nextId.txt", "");
  }
  // 读取 nextId，如果没有就是 null
  const nextId = (await fs.readFile("./nextId.txt", "utf-8")) || null;

  if (nextId === "empty") {
    stopFetch();
    return;
  }

  // 获取数据
  console.log("fetch nextId: ", nextId);
  console.log("fetch params: ", params);
  const response = await fetchList({
    nextId,
    ...params,
  });
  const data = await response.json();
  console.log("data: ", data);

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

  // 获取 newNextId
  const newNextId = data?.data?.nextId;
  console.log("newNextId: ", newNextId);
  // 把 newNextId 写入文件
  if (newNextId !== null) {
    await fs.writeFile("./nextId.txt", newNextId);
  } else {
    stopFetch();
    return;
  }

  console.log("----------------- fetch end ---------------------------");

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
  const params = {
    priceFilters,
    categoryFilter,
  };

  await getList(name, "./list.json", params);
  intervalInstance = setInterval(async () => {
    await getList(name, "./list.json", params);
  }, interval);
};

main();
