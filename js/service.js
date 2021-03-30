// // document.title = '123修改百度页面标题'
// window.onload = function () {
//   setTimeout(() => {
//     orientation()
//   }, 2000)  //定位市场大盘时拉取数据
//   // // var input = $('#kw')
//   // // input.val('chrome插件开发文档官方')
//   // // // console.log(input)
//   // // $('#su').click()
//   // console.log(1111)
// }
// $.ajax({
//   url: "",
//   type: 'get',
//   contentType: 'application/json;charset=utf-8',
//   dataType: 'json',
//   async: false, // 同步
//   success: function (result) {
//     var resObj = JSON.parse(result);
//     chrome.storage.sync.set({ 'Interface': resObj.data });
//   },
//   error: function (result) {
//     alert("获取接口拦截数据失败")
//   }
// });

// // 获取市场大盘页面对象

// function orientation () {
//   $('.name').each((index, element) => {
//     if (element.innerText === '市场大盘') {
//       // console.log($('.oui-canary-btn'))
//       $('.ant-btn').each((index2, element2) => {
//         if (element2.innerText === '月') {
//           element2.addEventListener('click', () => {
//             console.log('保存')
//           })
//           // element2.on("click", function () {
//           //   console.log('保存')
//           // })
//         }
//       })
//     }
//   })
// }
// function saveMonthSCDP () {
//   console.log('保存')
// }

// let insertContent = `
//             <script>
//             (function () {
//                 console.log("执行了ijected.js");
//                 var XHR = XMLHttpRequest.prototype;
//             // Remember references to original methods
//                 var open = XHR.open;
//                 var send = XHR.send;

//             // Overwrite native methods
//             // Collect data:
//                 XHR.open = function(method, url) {
//                     this._method = method;
//                     this._url = url;
//                     return open.apply(this, arguments);
//                 };

//             // Implement "ajaxSuccess" functionality
//                 XHR.send = function(postData) {
//                     this.addEventListener('load', function() {
//                         //这里是监听获取以后的操作
//                         console.log("xhrRrl:  "+this._url);           
//                         if (this._url.toString().indexOf("https://")!==(-1)){
//                             console.log(this._url)
//                             window.postMessage({"responseText":this.responseText,"url":this._url},"*");
//                         }

//                         // /* Request y  */ postData
//                     });
//                     return send.apply(this, arguments);
//                 };
//             })();
//             </script>
//             `;
// $('html').prepend(insertContent);
// window.addEventListener("message", e => {
//   //输出返回的值 也可以是其他的处理操作
//   // console.log(e);
// });

// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     if (request.requestBody && request.requestBody.formData) {
//       request.body = "";
//       for (key in request.requestBody.formData) {
//         request.body += key + "=" + request.requestBody.formData[key] + "&";
//       }
//       request.body = request.body.substr(0, request.body.length - 1);
//     }
//     request.credentials = "include";
//     if (request.headers == undefined) {
//       request.headers = {};
//     }
//     request.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
//     // console.log("request");
//     // console.log(request);
//     console.log(typeof (request.url))
//     console.log(request.url.indexOf('dateType=month'))
//     if (request.url.indexOf('dateType=month') >= 0) {

//       fetch(url, request).then(function (response) {
//         return response.text();
//       }).then(function (responseData) {
//         // console.log("request监控器->" + request.listener + ":" + url);
//         // console.log(responseData);
//         sendResponse(responseData);
//       });
//     }
//     return true;
//   }
// );

chrome.runtime.onMessage.addListener(
  function (request, sender) {
    if (request.requestBody && request.requestBody.formData) {
      request.body = "";
      for (key in request.requestBody.formData) {
        request.body += key + "=" + request.requestBody.formData[key] + "&";
      }
      request.body = request.body.substr(0, request.body.length - 1);
    }
    request.credentials = "include";
    if (request.headers == undefined) {
      request.headers = {};
    }
    request.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
    url = request.url + "#c_url";
    // $.ajax({
    //   type: 'GET',
    //   url: url,
    //   contentType: 'application/json;charset=utf-8',
    //   dataType: 'json',
    //   success: function (result) {
    //     // debugger
    //     console.log(result)
    //     // sendResponse(result);
    //   }
    // })
    // console.log(url)
    fetch(url, request)
      .then(function (response) {
        return response.text();
      })
      .then(function (responseData) {
        console.log(new Date())
        console.log(responseData)
      });
    return true;
  }
);
// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     debugger
//     // 重新发起的请求要做标记，避免无限循环
//     // var settings = {
//     //   url: request.url,
//     //   method: request.method,
//     //   dataType: "json"
//     // };
//     // if (request.requestBody && request.requestBody.formData) {
//     //   settings.data = request.requestBody.formData;
//     // }
//     // console.log(settings)
//     // $.ajax(settings).done(function (data) {
//     //   debugger
//     //   console.log(data)
//     //   if (data) {
//     //     sendResponse(data)
//     //   }
//     // });
//     // 由于 sendResponse 是异步调用的，需要返回 true
//     return true;
//   }
// );

// var file = chrome.extension.getURL('js/main.js')
// var s = document.createElement('script')
// s.type = 'text/javascript'
// s.src = file
// document.documentElement.appendChild(s)

// script.addEventListener('load', () => {
//   chrome.storage.local.get(['ajaxInterceptor_switchOn', 'ajaxInterceptor_rules'], (result) => {
//     if (result.hasOwnProperty('ajaxInterceptor_switchOn')) {
//       postMessage({type: 'ajaxInterceptor', to: 'pageScript', key: 'ajaxInterceptor_switchOn', value: result.ajaxInterceptor_switchOn});
//     }
//     if (result.ajaxInterceptor_rules) {
//       postMessage({type: 'ajaxInterceptor', to: 'pageScript', key: 'ajaxInterceptor_rules', value: result.ajaxInterceptor_rules});
//     }
//   });
// });

// window.addEventListener("message", e => {
//   //输出返回的值 也可以是其他的处理操作
//   console.log(e.data.text);
// });
// chrome.runtime.onMessage.addListener(function (obj) {
//   console.log(obj)
// })
