chrome.runtime.sendMessage(
  'getData',
  function (data) {
    // listenerData = data[itemName]
    console.log(data);
  }
);