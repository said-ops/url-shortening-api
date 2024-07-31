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
        return data.data.short_url;
    }   
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('menu-icon').addEventListener('click', hundleMenu);
    resizeHundle();
    document.getElementById('shorten-form').addEventListener('submit',(e) => {

        e.preventDefault();
        shortenBtn.addEventListener('click',fetchData);
    });
})
