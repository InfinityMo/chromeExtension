// let interceptor = {
//   urls: [],
//   originalXHR: window.XMLHttpRequest,
//   myXHR: function () {
//     let isScriptDispatched = false
//     const modifyResponse = () => {
//       if (!isScriptDispatched) {
//         let matchUrls = interceptor.urls.filter(url => xhr.responseURL.indexOf(url) > -1)
//         let match = matchUrls.length > 0
//         if (match) {
//           let data;
//           if (!xhr.responseType || xhr.responseType === "text") {
//             data = xhr.responseText;
//           } else if (xhr.responseType === "document") {
//             data = xhr.responseXML;
//           } else {
//             data = xhr.response;
//           }
//           this.responseText = this.response = data
//           let detail = { url: xhr.responseURL, data }
//           window.dispatchEvent(new CustomEvent("injectScript", { detail }));
//           isScriptDispatched = true
//         }
//       }
//     }
//     const xhr = new interceptor.originalXHR
//     for (let attr in xhr) {
//       if (attr === 'onreadystatechange') {
//         xhr.onreadystatechange = (...args) => {
//           if (this.readyState === 4) {
//             modifyResponse()
//           }
//           this.onreadystatechange && this.onreadystatechange.apply(this, args)
//         }
//         continue
//       } else if (attr === 'onload') {
//         xhr.onload = (...args) => {
//           modifyResponse()
//           this.onload && this.onload.apply(this, args)
//         }
//         continue
//       }

//       if (typeof xhr[attr] === 'function') {
//         this[attr] = xhr[attr].bind(xhr);
//       } else {
//         // responseText和response不是writeable的，但拦截时需要修改它，所以修改就存储在this[`_${attr}`]上
//         if (attr === 'responseText' || attr === 'response') {
//           Object.defineProperty(this, attr, {
//             get: () => this[`_${attr}`] == undefined ? xhr[attr] : this[`_${attr}`],
//             set: (val) => this[`_${attr}`] = val,
//             enumerable: true
//           });
//         } else {
//           Object.defineProperty(this, attr, {
//             get: () => xhr[attr],
//             set: (val) => xhr[attr] = val,
//             enumerable: true
//           });
//         }
//       }
//     }
//   }
// }


// window.XMLHttpRequest = interceptor.myXHR

let insertContent =
  ` <script>
            (function () {
                console.log("执行了ijected.js");
                var XHR = XMLHttpRequest.prototype;
            // Remember references to original methods
                var open = XHR.open;
                var send = XHR.send;
            
            // Overwrite native methods
            // Collect data:
                XHR.open = function(method, url) {
                    this._method = method;
                    this._url = url;
                    return open.apply(this, arguments);
                };
            
            // Implement "ajaxSuccess" functionality
                XHR.send = function(postData) {
                    this.addEventListener('load', function() {
                        //这里是监听获取以后的操作
                        console.log("xhrRrl:  "+this._url);           
                        if (this._url.toString().indexOf("https://")!==(-1)){
                            console.log(this._url)
                            window.postMessage({"responseText":this.responseText,"url":this._url},"*");
                        }
            
                        // /* Request y  */ postData
                    });
                    return send.apply(this, arguments);
                };
            })();
            </script>
            `;
$('html').prepend(insertContent);
// window.addEventListener("message", e => {
//   //输出返回的值 也可以是其他的处理操作
//   console.log(e.data.text);
// })