
//Checks an element, returns true if Element has class
function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
//adds class to specificed element
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls
}

//removes class from specifiec element
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}

function selectAll(el) {
  return document.querySelectorAll(el)
}

//The actual fuction
function toggleMenu() {
    var ele = document.getElementsByTagName('nav')[0]
    var icon = document.getElementById('hamburger')

    if (!hasClass(ele, "open")) {
        addClass(ele, "open")
        removeClass(icon, "fa-bars")
        addClass(icon, "fa-times")
    } else {
        removeClass(ele, "open")
        removeClass(icon, "fa-times")
        addClass(icon, "fa-bars")
    }
}

function createModal(event, portfolio) {
    var project = portfolio[event.target.getAttribute('data-project')]
    var content, header, imgProj, description, techlist, repoBtn, demoBtn

    content = document.createElement('div')

    header = document.createElement('h2')
    header.innerHTML = project.title
    content.appendChild(header)

    var contentDiv = document.createElement("div")

    imgProj = document.createElement('img')
    imgProj.setAttribute('src', project.imgURL)
    contentDiv.appendChild(imgProj)

    techlist = document.createElement("ul")
    project.technologies.map(function (ele) {
        var item = document.createElement("li")
        item.innerHTML = ele
        techlist.appendChild(item)
    })
    contentDiv.appendChild(techlist)

    content.appendChild(contentDiv)

    description = document.createElement("P")
    description.innerHTML = project.description
    content.appendChild(description)

    repoBtn = document.createElement("a")
    repoBtn.innerHTML = "See the Code <i class='fa fa- github' id='github' aria-hidden='true'></i>"
    repoBtn.setAttribute('href', project.repoURL)
    repoBtn.setAttribute('target', '_blank')
    content.appendChild(repoBtn) 
    
    if (project.demoURL) {
        demoBtn = document.createElement('a')
        demoBtn.innerHTML = 'See the Demo'
        demoBtn.setAttribute('href', project.demoURL)
        demoBtn.setAttribute('target', '_blank')
        content.appendChild(demoBtn) 
    }

    console.log(content)
    var portfolio = new Modal({ content })
    portfolio.open();
}

//Prevent the function to run before the document is loaded
document.addEventListener('readystatechange', function() {
    if (document.readyState === "complete") {
        //
        document.getElementById("hamburger").addEventListener("click", toggleMenu)

        var navList = selectAll('.nav-link')
        for( var i = 0; i < navList.length; i++) {
          navList[i].addEventListener('click',toggleMenu);
        }

        var projectList = selectAll('.example')
        for(var i = 0; i < projectList.length; i++) {
            projectList[i].addEventListener('click', function (e) { createModal(e,portfolio)})
        }
    }
})
