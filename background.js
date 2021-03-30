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
    if (details.url.indexOf('https://sycm.taobao.com/mc/mq/supply/mkt/sea') >= 0) {
      // console.log(details)
      chrome.tabs.sendMessage(details.tabId, details);
      // return { cancel: true }
    }
    // chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
    //   var dirUrl = tabs[0].url;
    // });
    // return { redirectUrl: dirUrl || '' }
    return {}
  },
  { urls: ["*://*.sycm.taobao.com/*"] },
  ["blocking"]
)

