
//监听所有请求
chrome.webRequest.onBeforeRequest.addListener(

  function (details) {

    chrome.tabs.query({ active: true }, function (tab) {
      // 当前页面的url
      var pageUrl = tab[0].url;
      // 在这可以写判断逻辑，将请求cancel掉，或者将请求打印出来
      console.log("current url -> " + pageUrl);
      return { requestHeaders: details.requestHeaders }
    });

  },

  { urls: ["<all_urls>"] },  //监听页面请求,你也可以通过*来匹配。
  ["blocking"]
);