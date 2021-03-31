//监听所有请求
// chrome.webRequest.onBeforeRequest.addListener(
//   function (details) {
//     chrome.tabs.query({ active: true }, function (tab) {
//       // 当前页面的url
//       var pageUrl = tab[0].url;
//       // 在这可以写判断逻辑，将请求cancel掉，或者将请求打印出来
//       console.log("current url -> " + pageUrl);
//       return { requestHeaders: details.requestHeaders }
//     });

//   },
//   { urls: ["<all_urls>"] },  //监听页面请求,你也可以通过*来匹配。
//   ["blocking"]
// )
// chrome.webRequest.onBeforeRequest.addListener(
//   function (details) {
//     chrome.tabs.query({ active: true }, function (tab) {
//       // 当前页面的url
//       var pageUrl = tab[0].url;
//       // 在这可以写判断逻辑，将请求cancel掉，或者将请求打印出来
//       console.log("current url -> " + pageUrl);
//       return { requestHeaders: details.requestHeaders }
//     });
//   },
//   {
//     "urls": [
//       "<all_urls>"
//     ],
//     "types": [
//       "main_frame",
//       "sub_frame",
//       "stylesheet",
//       "script",
//       "image",
//       "object",
//       "xmlhttprequest",
//       "other"
//     ]
//   },
//   ["blocking"]
// )
// chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
//   console.log(details)
//   details.requestHeaders.push({
//     name: "xxx",
//     value: "xxxx"
//   });
//   return {
//     requestHeaders: details.requestHeaders
//   };
// },
//   {
//     urls: ["<all_urls>"]
//   },
//   ["blocking", "requestHeaders", "extraHeaders"]
// );
var interceptArr = []
chrome.storage.sync.get('intercept', function (res) {
  interceptArr = res['intercept']
  // console.log(interceptArr)
})
// 动态页面加载当前插件
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          // pageUrl: { urlContains: 'sycm.taobao.com' }
          pageUrl: { urlContains: 'baidu.com' }
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }])
  })
})

// chrome.storage.sync.get("Interface", function (data) {

//   intercept = data["Interface"];
// });

// chrome.storage.onChanged.addListener(function (data, areaName) {
//   try {
//     intercept = data["Interface"]["newValue"];
//   }
//   catch (err) {

//   }
// });

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (details.type !== 'xmlhttprequest') {
      return {}
    }
    if (details.url.endsWith("#c_url")) {
      details.url.substr(0, details.url.indexOf('c_url') - 1)
      // return { cancel: true }
      return {}
    }
    interceptArr.forEach(i => {
      if (details.url.startsWith(i)) {
        // console.log(details)
        chrome.tabs.sendMessage(details.tabId, details);
        // return { cancel: true }
      }
    })

    // chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
    //   var dirUrl = tabs[0].url;
    // });
    // return { redirectUrl: dirUrl || '' }
    return {}
  },
  { urls: ["*://*.sycm.taobao.com/*"] },
  // { urls: ["*://*.baidu.com/*"] },
  ["blocking"]
)

