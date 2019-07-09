chrome.browserAction.onClicked.addListener(function(activeTab){
    var newURL = "https://gb.browardschools.com/Pinnacle/Gradebook/Default.aspx";
    chrome.tabs.create({ url: newURL });
  });