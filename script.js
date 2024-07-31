//menu
const nav = document.querySelector('nav');
function hundleMenu () {
    
    if(nav.style.display === 'none'){
        nav.style.display = 'flex';
    }else{
        nav.style.display = 'none';
    }   
}
function resizeHundle (){

window.addEventListener('resize' , () => {
    if(window.innerWidth > 800){
        nav.style.display = 'flex';
    }
    if(window.innerWidth < 800){
        nav.style.display = 'none';
    }
});
}

const shortenLink = document.getElementById('link');
const shortenBtn = document.getElementById('shortn-btn');
const errorText = document.getElementById('error');
const apiUrl = 'https://cleanuri.com/api/v1/shorten';
//li class link-elemnt
//span class input-link
//div class copy-link
//span class shortn-link
//copy button class copy-btn signup-btn
async function fetchData(){
    const url = shortenLink.value;
    const domain = 'sty.ink';
    const key = 'evwxFnusa78xs0UUQRFm5bVkVywh3Rfw2Uza53ZPoZL5g0otwIcazXtVh0gI4ZbK';
    const body = new URLSearchParams();
    body.append('url', url);
    body.append('domain', domain);
    body.append('domain_id', 3);
    const response = await fetch('https://shortiny.com/api/v1/links', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${key}`,
        },
        body : body
    });
    if(response.ok){
        const data = await response.json();
        console.log(data.data.short_url);
        appendUrl(url,data.data.short_url);
        shortenLink.value = '';
        saveLinks(url,data.data.short_url);
    }else{
        alert('Invalid Link!');
    }  
}
function appendUrl (inputUrl,shortnUrl){
    const linkList = document.getElementById('links-input');

    const li = document.createElement('li');
    li.classList.add('link-elemnt');

    const inputLink = document.createElement('span');
    inputLink.classList.add('input-link');
    inputLink.textContent = inputUrl;
    li.appendChild(inputLink);

    const div = document.createElement('div');
    div.classList.add('copy-link');

    const shortnLink = document.createElement('span');
    shortnLink.classList.add('shrtn-link');
    shortnLink.textContent = shortnUrl;
    
    const copyBtn = document.createElement('button');
    copyBtn.classList.add('signup-btn');
    copyBtn.classList.add('copy-btn');
    copyBtn.textContent = 'Copy';

    copyBtn.addEventListener('click', () => {

    const text = shortnLink.textContent;

    navigator.clipboard.writeText(text)
        .then(() => {
            
            copyBtn.style.backgroundColor = 'var(--dark-violet)';
            copyBtn.style.color = 'white';
            copyBtn.textContent = 'Copied!'
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
    } );

    div.appendChild(shortnLink);
    div.appendChild(copyBtn);

    li.appendChild(div);

    linkList.insertBefore(li, linkList.firstChild);

}

function saveLinks(originalUrl, shortUrl) {
    
    let links = JSON.parse(localStorage.getItem('shortenedLinks')) || [];
    links.unshift({ originalUrl, shortUrl });

    if (links.length > 3) {
        links.pop();
    }

    localStorage.setItem('shortenedLinks', JSON.stringify(links));
}
function storedLinks() {
    
    let links = JSON.parse(localStorage.getItem('shortenedLinks')) || [];

    if (links.length > 0) {
        links.forEach(link => {
            appendUrl(link.originalUrl,link.shortUrl)
        });
    } else {
        console.log('No links stored.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    storedLinks();

    document.getElementById('menu-icon').addEventListener('click', hundleMenu);
    resizeHundle();

    shortenBtn.addEventListener('click',() => {
        if(shortenLink.value){
            fetchData();
            errorText.style.display='none';
            document.querySelector('#shorten-form input').style.border = '0';
        }else{
            errorText.style.display='block';
            shortenLink.classList.add('input-error');
            document.querySelector('#shorten-form input').style.border = '2px solid var(--red)';
        }
    });

    document.getElementById('shorten-form').addEventListener('submit',(e) => {

        e.preventDefault();
        
    });
})
