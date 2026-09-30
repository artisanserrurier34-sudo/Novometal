const menu=document.querySelector('.menu');
const nav=document.querySelector('#navigation');
if(menu&&nav){
  menu.addEventListener('click',()=>nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

// Galerie : ouverture de chaque photo en grand + zoom + / - + molette
const galleryItems=document.querySelectorAll('.gallery-item');
if(galleryItems.length){
  const modal=document.createElement('div');
  modal.className='photo-modal';
  modal.innerHTML=`
    <button class="photo-close" aria-label="Fermer">×</button>
    <div class="photo-title"></div>
    <div class="photo-stage"><img alt=""></div>
    <div class="photo-controls">
      <button type="button" class="zoom-out" aria-label="Réduire">−</button>
      <span class="zoom-level">100 %</span>
      <button type="button" class="zoom-in" aria-label="Agrandir">+</button>
      <button type="button" class="zoom-reset">Réinitialiser</button>
    </div>`;
  document.body.appendChild(modal);

  const modalImg=modal.querySelector('img');
  const title=modal.querySelector('.photo-title');
  const closeBtn=modal.querySelector('.photo-close');
  const zoomOut=modal.querySelector('.zoom-out');
  const zoomIn=modal.querySelector('.zoom-in');
  const zoomReset=modal.querySelector('.zoom-reset');
  const zoomLevel=modal.querySelector('.zoom-level');
  let zoom=1;

  const updateZoom=()=>{
    modalImg.style.transform=`scale(${zoom})`;
    zoomLevel.textContent=`${Math.round(zoom*100)} %`;
  };
  const close=()=>{
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    modalImg.removeAttribute('src');
    zoom=1;
    updateZoom();
  };
  const openPhoto=(item)=>{
    const img=item.querySelector('img');
    const link=item.querySelector('.photo-link');
    if(!img)return;
    modalImg.src=(link&&link.href)||img.src;
    modalImg.removeAttribute("style");
    modalImg.alt=img.alt;
    title.textContent=img.alt;
    zoom=1;
    updateZoom();
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  };

  galleryItems.forEach(item=>{
    const link=item.querySelector('.photo-link');
    if(link){
      link.addEventListener('click',event=>{
        event.preventDefault();
        openPhoto(item);
      });
    }else{
      item.addEventListener('click',()=>openPhoto(item));
    }
  });

  zoomIn.addEventListener('click',event=>{
    event.stopPropagation();
    zoom=Math.min(4,+(zoom+0.25).toFixed(2));
    updateZoom();
  });
  zoomOut.addEventListener('click',event=>{
    event.stopPropagation();
    zoom=Math.max(0.5,+(zoom-0.25).toFixed(2));
    updateZoom();
  });
  zoomReset.addEventListener('click',event=>{
    event.stopPropagation();
    zoom=1;
    updateZoom();
  });
  closeBtn.addEventListener('click',close);
  modal.addEventListener('click',event=>{
    if(event.target===modal)close();
  });
  modal.addEventListener('wheel',event=>{
    if(!modal.classList.contains('open'))return;
    event.preventDefault();
    zoom += event.deltaY<0 ? 0.15 : -0.15;
    zoom=Math.max(0.5,Math.min(4,+zoom.toFixed(2)));
    updateZoom();
  },{passive:false});
  document.addEventListener('keydown',event=>{
    if(!modal.classList.contains('open'))return;
    if(event.key==='Escape')close();
    if(event.key==='+'||event.key==='='){zoom=Math.min(4,+(zoom+0.25).toFixed(2));updateZoom();}
    if(event.key==='-'){zoom=Math.max(0.5,+(zoom-0.25).toFixed(2));updateZoom();}
    if(event.key==='0'){zoom=1;updateZoom();}
  });
}
