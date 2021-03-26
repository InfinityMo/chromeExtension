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
    // console.log(details)
    chrome.tabs.sendMessage(details.tabId, details, function (response) {
      // alert(response)
      // 此处可以修改response...
      // redirectUrl = "data:application/json;charset=UTF-8;base64,"
      // console.log("request监控器->" + details.listener + ":" + details.url);
      // console.log(response);
      // try {
      //   toList(response, listener[details.listener][2], details.listener);
      // } catch (err) {
      //   console.log(err);
      //   console.log("request监控器->" + details.listener + " listener:" + listener[details.listener][2]);
      // }

    });
  },
  { urls: ["*://*.sycm.taobao.com/*", "*://*.bdstatic.com/*"] },
  ["blocking"]
)