document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
  
      chrome.tabs.getSelected(null, function(tab) {
        d = document;
  
        var f = d.createElement('form');
        f.style.csstext = "position: absolute;margin-top:100px"
        f.action = 'http://gtmetrix.com/analyze.html?bm';
        f.method = 'post';
        var i = d.createElement('input');
        i.type = 'hidden';
        i.name = 'url';
        i.value = tab.url;
        f.appendChild(i);
        d.body.appendChild(f);
        f.submit();
      });
    }, false);
  }, false);

  // document.querySelector('body').addEventListener('click', test)
  //     function test()
  //     {
  //       alert('asdasd')
  //     }

    //   func tion myAlert(){
    //     alert('hello world');
    // }
    
    // document.addEventListener('DOMContentLoaded', function () {
    //     document.querySelector('body').addEventListener('click', myAlert);
    // });