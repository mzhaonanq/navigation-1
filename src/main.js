const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x"); //获取存储在localStorage里的x
const xObject = JSON.parse(x); //将字符串转为对象
const hashMap = xObject || [
  //如果xObject不为null，则hashMap===xObject
  //第一次进入是xObject===null，所以haspMap会等于后面的那个数组对象
  //之后 hashMap===xObject
  //即使页面上的原有的三个logo都删完了，hashMap依旧取值xObject，因为那时xObject=[]，不是falsy值
  { logo: "G", url: "https://github.com" },
  { logo: "I", url: "https://www.iconfont.cn" },
  { logo: "B", url: "https://bilibili.com" },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //正则表达式，删除/开头的内容
};
const render = () => {
  $siteList.find("li:not(.last)").remove(); //在添加或删除logo后，清空之前存在的logo，再将新的hashMap加载到HTML中去
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
          <div class="site">
              <div class="logo">${node.logo}</div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close">
              <svg class="icon">
              <use xlink:href="#icon-close"></use>
          </svg></div>
          </div>
  </li>`).insertBefore($lastLi); //同级别插入
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render(); //删除logo后重新渲染页面
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址");
  if (url.indexOf("https") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    //将添加的网址加入hashMap
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });
  render(); //添加新logo后重新渲染页面
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap); //将数组对象转为字符串
  localStorage.setItem("x", string); //将页面关闭时hashMap的string信息传给x接收
};

$(document).on("keypress", (e) => {
  while (!e.target.matches("input")) {
    const { key } = e;
    for (let i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLocaleLowerCase() === key) {
        window.open(hashMap[i].url);
      }
    }
    break;
  }
});
