const button=document.querySelector('.menu');
const nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');button.setAttribute('aria-expanded','false');}
button.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();button.focus();}});
window.matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)closeMenu();});

/* Keep anchor targets clear of the sticky header (fallback for browsers that ignore scroll-padding) */
(function(){
  const header=document.querySelector('header');
  function offset(){return header.getBoundingClientRect().height+12;}
  function go(id,push){
    const t=document.getElementById(id);if(!t)return;
    const y=t.getBoundingClientRect().top+window.scrollY-(id==='home'?0:offset());
    window.scrollTo({top:Math.max(0,y)});
    if(push)history.pushState(null,'','#'+id);
  }
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    const id=a.getAttribute('href').slice(1);
    if(!id)return;
    a.addEventListener('click',e=>{e.preventDefault();go(id,true);});
  });
  window.addEventListener('load',()=>{if(location.hash)go(location.hash.slice(1),false);});
})();
