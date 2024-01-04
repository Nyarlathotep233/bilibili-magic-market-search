# bilibili-magic-market-search

一个脚本，用来在b站市集上爬取商品，并根据名称筛选，自用

## cookie.txt
需要将b站的 cookie 放在根目录的 cookie.txt 中，例如：

cookie.txt
```
i-wanna-go-back=-1; buvid4=A81229A5-A4AC-AD1D-3550-86F65E9872E377715-022102001-G684QF5of63vC5kBOSSKvQ%3D%3D; buvid_fp_plain=undefined; Hm_lvt_8d8d2f308d6e6dffaf586bd024670861=1678200605,1679832705; CURRENT_PID=f953d0b0-cd79-11ed-94bc-d18f52a5a2a5; hit-new-style-dyn=1; CURRENT_BLACKGAP=0; b_ut=5; FEED_LIVE_VERSION=V8; enable_web_push=DISABLE; CURRENT_FNVAL=4048; buvid3=7B96C139-9CE9-55C8-755B-DB44482374B762815infoc; b_nut=1697804662; _uuid=3A2E557B-A5FC-3ECB-A18E-F5F3E4F81FA561703infoc; header_theme_version=CLOSE; hit-dyn-v2=1; home_feed_column=5; go-back-dyn=0; rpdid=|(J~R~lJR)Y)0J'u~|JkR|Y)k; bp_video_offset_2000696=878327306026745881; DedeUserID=2279394; DedeUserID__ckMd5=af0e5d2ce90e0c38; browser_resolution=1536-703; CURRENT_QUALITY=64; PVID=2; innersign=0; b_lsid=81943410F_18CCEA1E860; SESSDATA=065d2628%2C1719825769%2C9004b%2A12CjB14cjND0TI4uMvXuPJf84rh5kLwJW2x1iOq8u-fW0Jdp4HZ1tBc4bcFuFfPT8aohkSVkRGZ1ZUM2RRSlhBTWpqcEtHZzVvUzQwazBjY1dNSHZNeXNqV3BlR1YwclRiZDVObUFiZV9NaFdrODZQUjRkOWIwTW5BczgxWU9wbFhmdzMycWxnSHhBIIEC; bili_jct=2993c39cfa03f88f2682af4c6cb2f5b1; sid=5yejzvfi; bp_video_offset_2279394=882336619603951635; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDQ1MzI5NzIsImlhdCI6MTcwNDI3MzcxMiwicGx0IjotMX0.wcG2QHL0lJ0NJYzWvG_GnQPwKDOt6-3CBQ531wPMfY4; bili_ticket_expires=1704532912; fingerprint=8d444c33b4052ce6df9c3a4fe4313126; buvid_fp=7B96C139-9CE9-55C8-755B-DB44482374B762815infoc
```

## 开始爬取

```bash
npm run start
```

## 整理爬到的数据

```bash
npm run format
```
