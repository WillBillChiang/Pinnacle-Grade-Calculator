chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs){
    var url = String(tabs[0].url)
    console.log("test1")
    if (url.includes("://gb.browardschools.com/Pinnacle/Gradebook/InternetViewer/StudentAssignments")){
        chrome.storage.local.get(['category'], function(result) {
            if (result.category == true) {
                
                function calc(arr) {
                    let res = 0
                    for (let i = 0; i < arr.length; i++) {
                        res += (parseFloat(arr[i][0])/parseFloat(arr[i][1]))*(parseFloat(arr[i][2])/100)
                        console.log(res)
                    }
                    console.log(res)
                    return res
                }

                chrome.storage.local.get(['catInfo'], function(result) {
                    console.log(result.catInfo)
                    var displayGrade = calc(result.catInfo)
                    console.log(displayGrade)
                } )

            } else {

            }
        })
    } else {
        //GO TO PINNACLE GRADE PAGE
    }
})
