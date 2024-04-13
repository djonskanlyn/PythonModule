// General script

// add logo to header
function addLogoImage(image, alt_text, size) {

    let img = document.createElement('img');

    img.src = image;
    img.alt = alt_text;
    img.style.height = size;

    document.querySelector('#logoContainer').appendChild(img);
}

addLogoImage('static/images/logoImage.png', 'Website Logo', '50px');

// add navigation menu to header
function createNavigationLink(name, url) {

    let pageName = document.createElement('li'); 
    let pageLink = document.createElement('a');  

    pageLink.textContent = name; 
    pageLink.href = url; 
    pageName.appendChild(pageLink); 

    return pageName;
}

const menu = document.querySelector('#navigation');

menu.appendChild(createNavigationLink('Home',"/home"));
menu.appendChild(createNavigationLink('Gallery',"/gallery"));
menu.appendChild(createNavigationLink('FAQs',"/faqs"));
menu.appendChild(createNavigationLink('Meals',"/meals"));
menu.appendChild(createNavigationLink('Fav',"/fav"));
menu.appendChild(createNavigationLink('Contact',"/contact"));

