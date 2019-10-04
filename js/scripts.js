// request json

var requestURL = 'https://jaumeizquierdo.com/bebop/js/test.json';
//var requestURL = '/js/test.json';
var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    var bebopTest = request.response;
    populateHeader(bebopTest);
    populateContent(bebopTest);
    populateFooter(bebopTest);
}

const header = document.querySelector('header');
const section = document.querySelector('section');
const footer = document.querySelector('footer');

// helpers

function hasProp (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

function createNode(node, attributes){
    const el = document.createElement(node);
    for(let key in attributes){
        el.setAttribute(key, attributes[key]);
    }
    return el;
}

// main functions

function populateHeader(jsonObj) {

    let img = new Image();
    let headerBg = document.createElement('div');
    let title = createNode('h1', {
        'data-aos': 'fade-down',
        'data-aos-duration': '2000',
        'data-aos-offset': '500'
    })
    let description = createNode('p', {
        'data-aos': 'fade',
        'data-aos-duration': '2000',
        'data-aos-offset': '0'
    })
    
    // background image
    if (hasProp(jsonObj, 'imgPath')) {
        img.src = jsonObj['imgPath'];
        headerBg.className = 'headerBg';
        headerBg.style.background = "url(" + img.src + ") no-repeat";
        header.appendChild(headerBg);
    }

    // title
    if (hasProp(jsonObj, 'title')) {
        title.textContent = jsonObj['title'];
        headerBg.appendChild(title);
    }
    
    // description
    if (hasProp(jsonObj, 'title')) {
        description.textContent = jsonObj['description'];
        header.appendChild(description);
    }
    
}

function populateContent(jsonObj) {

    let content = jsonObj['content'];

    for (var i = 0; i < content.length; i ++) {

        let article = document.createElement('article');
        //let contentWrapper = document.createElement('div');
        let contentWrapper = createNode('div', {
            'data-aos': 'fade',
            'data-aos-duration': '2000',
            'data-aos-offset': '0'
        })
        let title = document.createElement('h2');
        let description = document.createElement('p');
        let articleImg = new Image();

        // image
        if (hasProp(content[i], 'imgPath')) {
            articleImg.src = content[i].imgPath;
            article.appendChild(articleImg);
        }

        // title
        if (hasProp(content[i], 'title')) {
            title.textContent = content[i].title;
            contentWrapper.appendChild(title);
        }
        
        // description
        if (hasProp(content[i], 'description')) {
            description.textContent = content[i].description;
            contentWrapper.appendChild(description);
        }

        contentWrapper.className = 'contentWrapper';
        article.appendChild(contentWrapper);

        section.appendChild(article);

        // add styles to article
        article.addEventListener('mouseover', function() {
            articleImg.className = 'filter';
        })

        article.addEventListener('mouseout', function() {
            articleImg.classList.remove('filter');
        })

        contentWrapper.setAttribute('data-aos', 'fade');

    }
}

function populateFooter() {
    
    let logoUrl = 'https://www.bebopstudio.es/wp-content/uploads/2018/03/logo_2016-1-e1545035170202.png';
    let logo = createNode('div', {
        'data-aos': 'fade-right',
        'data-aos-duration': '2000',
        'data-aos-offset': '0'
    })
    logoImg = new Image();
    logoImg.src = logoUrl;
    logoImg.className = 'logo';
    logo.appendChild(logoImg);
    footer.appendChild(logo);

}

AOS.init();