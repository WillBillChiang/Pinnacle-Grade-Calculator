chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs){
    var url = String(tabs[0].url)
    if (url.includes("://gb.browardschools.com/Pinnacle/Gradebook/InternetViewer/StudentAssignments")){
        chrome.storage.local.get(['category'], function(result) {
            if (result.cat) {
                
            } else {

            }
        })
    }
})