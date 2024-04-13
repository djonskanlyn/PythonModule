// General script

// add logo to header
function addLogoImage(image, alt_text, size) {

    let img = document.createElement('img');

    img.src = image;
    img.alt = alt_text;
    img.style.height = size;

    document.querySelector('#logoContainer').appendChild(img);
}

addLogoImage('img/logoImage.png', 'Website Logo', '50px');

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

menu.appendChild(createNavigationLink('Home',"index.html"));
menu.appendChild(createNavigationLink('Gallery',"gallery.html"));
menu.appendChild(createNavigationLink('FAQs',"faqs.html"));
menu.appendChild(createNavigationLink('Meals',"meals.html"));
