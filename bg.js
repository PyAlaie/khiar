var a = document.createElement('div');
a.setAttribute('style', "height: 10px; width: 10px; position: absolute; background-color: red;left:0; top:0; z-index: 100")
a.innerHTML = "hellp";

document.body.appendChild(a);
// console.log('asdads')

var el = document.getElementsByTagName('input')
// document.addEventListener('load', function(){
    document.addEventListener('click' ,function(){
        var active = document.activeElement
        divs = document.querySelectorAll('.password-div')
            divs.forEach(d => {
                d.remove()
            })
        
        if (active.tagName == 'INPUT')
        {
            var position = active.parentElement.parentElement.getBoundingClientRect()
            var main_div = document.createElement('div')
            main_div.setAttribute('class', 'password-div')
            main_div.setAttribute('style', 'position: absolute;padding:12px; background-color: white; z-index: 100; border-radius: 0 0 6px 6px;  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),0 3px 1px -2px rgba(0, 0, 0, 0.12),0 1px 5px 0 rgba(0, 0, 0, 0.3); ')
            main_div.innerHTML = 'adas'
            main_div.style.top = position.bottom + 'px'
            main_div.style.left = position.left + 'px'
            main_div.style.width = position.width + 'px '
            document.body.appendChild(main_div);

            var item = document.createElement('div')
            item.setAttribute('class', 'inner-div')
        }
    })
// })
add_password('http://192.168.166.111:5000', 'khiar', 'khiar')