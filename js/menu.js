
//Checks an element, returns true if Element has class
function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
//adds class to specificed element
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

//removes class from specifiec element
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

//Event Listeners on both the the Menu Icon and Menu Items
  var navList = document.getElementsByClassName("nav-link")

function init() {
    document.getElementById("hamburger").addEventListener("click", toggleMenu);

    for( var i = 0; i < navList.length; i++) {
      navList[i].addEventListener('click',toggleMenu);
    }
}

//The actual fuction
function toggleMenu() {
    var ele = document.getElementsByTagName('nav')[0];
    var icon = document.getElementById('hamburger');

    console.log(ele);
    if (!hasClass(ele, "open")) {
        addClass(ele, "open");
        removeClass(icon, "fa-bars");
        addClass(icon, "fa-times")
    } else {
        removeClass(ele, "open");
        removeClass(icon, "fa-times");
        addClass(icon, "fa-bars")
    }
}

//Prevent the function to run before the document is loaded
document.addEventListener('readystatechange', function() {
    if (document.readyState === "complete") {
        init();
        console.log(document.getElementById('hamburger'));
    }
});
