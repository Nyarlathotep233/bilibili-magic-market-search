# bilibili-magic-market-search

一个脚本，用来在b站市集上爬取商品，并根据名称筛选，自用


## cookie.txt

需要将b站的 cookie 放在根目录的 cookie.txt 中，例如：

cookie.txt

``` text
i-wanna-go-back=-1; buvid4=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX; buvid_fp_plain=undefined; Hm_lvt_8d8d2f308d6e6dffaf586bd024670861=XXXXXXXX,XXXXXXXX; CURRENT_PID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX; hit-new-style-dyn=1; CURRENT_BLACKGAP=0; b_ut=5; FEED_LIVE_VERSION=V8; enable_web_push=DISABLE; CURRENT_FNVAL=4048; buvid3=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX; b_nut=XXXXXXXX; _uuid=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX; header_theme_version=CLOSE; hit-dyn-v2=1; home_feed_column=5; go-back-dyn=0; rpdid=|(J~R~lJR)Y)0J'u~|JkR|Y)k; bp_video_offset_2000696=XXXXXXXXXXXXXXXXX; DedeUserID=XXXXXXX; DedeUserID__ckMd5=XXXXXXXXXXXXXXXX; browser_resolution=1536-703; CURRENT_QUALITY=64; PVID=2; innersign=0; b_lsid=XXXXXXXXXXXXXXXXX; SE
```

## config.json 字段说明

示例：

``` json
{
  // 表示每 10 秒发送一次请求
  "interval": 10000,
  // 表示筛选价格在 30~50 元和100 以上的商品
  "priceFilters": [
    "3000-5000",
    "10000-0"
  ],
  // 表示筛选名字中有 "初音未来"  "毛绒玩偶" 的商品
  "name": [
    "初音未来",
    "毛绒玩偶"
  ],
  // 表示只请求手办，默认值:""
  /**
    2312 - 手办
    2066 - 模型
    2331 - 周边
    2273 - 3C 
    fudai_cate_id - 福袋
   */
  "categoryFilter": "2312"
}
```

### 1. interval

每次发送请求的间隔，单位为毫秒，建议取值不要太小，免得因为请求太频繁被b站禁止访问并且给b站服务带来压力

### 2. name

商品名的筛选条件，是一个字符串数组，只有名称中包含所有字符串的商品会被放到list.json中

### 3. priceFilters

价格区间，是一个由'-'分割的两个数组组成的字符串数组，单位为分，短横杠左侧表示最低价，右侧表示最高价；短横杠右侧为0时表示无上限;

具体的取值可以参考'/mall-magic-c/internet/c2c/v2/list'接口中的同名字段

### 4. categoryFilter

品类的筛选条件，是一个字符串，取值为对应的品类id;

具体的取值可以参考'/mall-magic-c/internet/c2c/v2/list'接口中的同名字段

目前知道的取值:

- 2312 - 手办
- 2066 - 模型
- 2331 - 周边
- 2273 - 3C
- fudai_cate_id - 福袋

## 开始爬取

```bash
npm run start
```

## 整理爬到的数据

```bash
npm run format
```

## 从头开始爬取

每次请求的时候，默认都会根据根目录中的 nextId.txt，从之前的位置开始爬取，如果希望从头开始搜索，可以在运行 npm run start 前手动删掉 nextId.txt

（！请不要用过高的频率爬取商品，请把这个脚本不要用于倒卖商品，因为是自用所以脚本很不稳定，由于不恰当的使用带来的一切纠纷由使用者承担）
