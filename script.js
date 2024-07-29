//menu
const nav = document.querySelector('nav');
function hundleMenu () {
    
    if(nav.style.display === 'none'){
        nav.style.display = 'flex';
    }else{
        nav.style.display = 'none';
    }
    
}
document.getElementById('menu-icon').addEventListener('click', hundleMenu);
window.addEventListener('resize' , () => {
    if(window.innerWidth > 800){
        nav.style.display = 'flex';
    }
})