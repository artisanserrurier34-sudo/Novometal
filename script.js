const menu=document.querySelector('.menu');
const nav=document.querySelector('#navigation');
if(menu&&nav){
  menu.addEventListener('click',()=>nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

// Zoom des photos de la galerie
const galleryItems=document.querySelectorAll('.gallery-item');
if(galleryItems.length){
  const modal=document.createElement('div');
  modal.className='photo-modal';
  modal.innerHTML='<button class="photo-close" aria-label="Fermer">×</button><img alt=""><div class="photo-title"></div>';
  document.body.appendChild(modal);

  const modalImg=modal.querySelector('img');
  const title=modal.querySelector('.photo-title');
  const close=()=>{
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    modalImg.removeAttribute('src');
  };

  galleryItems.forEach(item=>{
    item.addEventListener('click',()=>{
      const img=item.querySelector('img');
      if(!img)return;
      modalImg.src=img.currentSrc||img.src;
      modalImg.alt=img.alt;
      title.textContent=img.alt;
      modal.classList.add('open');
      document.body.classList.add('modal-open');
    });
  });

  close.addEventListener('click',close);
  modal.addEventListener('click',event=>{
    if(event.target===modal)close();
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&modal.classList.contains('open'))close();
  });
}
