// document.title = '123修改百度页面标题'
window.onload = function () {
  setTimeout(() => {
    orientation()
  }, 2000)  //定位市场大盘时拉取数据
  // // var input = $('#kw')
  // // input.val('chrome插件开发文档官方')
  // // // console.log(input)
  // // $('#su').click()
  // console.log(1111)
}

// 获取市场大盘页面对象

function orientation () {
  $('.name').each((index, element) => {
    if (element.innerText === '市场大盘') {
      // console.log($('.oui-canary-btn'))
      $('.ant-btn').each((index2, element2) => {
        if (element2.innerText === '月') {
          element2.addEventListener('click', function () {
            console.log('保存')
          })
          // element2.on("click", function () {
          //   console.log('保存')
          // })
        }
      })
    }
  })
}
function saveMonthSCDP () {
  console.log('保存')
}