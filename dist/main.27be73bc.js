// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last");
var x = localStorage.getItem("x"); //获取存储在localStorage里的x

var xObject = JSON.parse(x); //将字符串转为对象

var hashMap = xObject || [//如果xObject不为null，则hashMap===xObject
//第一次进入是xObject===null，所以haspMap会等于后面的那个数组对象
//之后 hashMap===xObject
//即使页面上的原有的三个logo都删完了，hashMap依旧取值xObject，因为那时xObject=[]，不是falsy值
{
  logo: "G",
  url: "https://github.com"
}, {
  logo: "I",
  url: "https://www.iconfont.cn"
}, {
  logo: "B",
  url: "https://bilibili.com"
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, ""); //正则表达式，删除/开头的内容
};

var render = function render() {
  $siteList.find("li:not(.last)").remove(); //在添加或删除logo后，清空之前存在的logo，再将新的hashMap加载到HTML中去

  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n          <div class=\"site\">\n              <div class=\"logo\">".concat(node.logo, "</div>\n              <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n              <div class=\"close\">\n              <svg class=\"icon\">\n              <use xlink:href=\"#icon-close\"></use>\n          </svg></div>\n          </div>\n  </li>")).insertBefore($lastLi); //同级别插入

    $li.on("click", function () {
      window.open(node.url);
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render(); //删除logo后重新渲染页面
    });
  });
};

render();
$(".addButton").on("click", function () {
  var url = window.prompt("请输入要添加的网址");

  if (url.indexOf("https") !== 0) {
    url = "https://" + url;
  }

  hashMap.push({
    //将添加的网址加入hashMap
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url
  });
  render(); //添加新logo后重新渲染页面
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap); //将数组对象转为字符串

  localStorage.setItem("x", string); //将页面关闭时hashMap的string信息传给x接收
};

$(document).on("keypress", function (e) {
  while (!e.target.matches("input")) {
    var key = e.key;

    for (var i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLocaleLowerCase() === key) {
        window.open(hashMap[i].url);
      }
    }

    break;
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.27be73bc.js.map