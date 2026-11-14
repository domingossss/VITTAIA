(() => {
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const track=document.querySelector('#review-cards');
  const dots=[...document.querySelectorAll('[data-review]')];
  track.tabIndex=0;
  track.setAttribute('role','region');
  track.setAttribute('aria-roledescription','carrossel');
  track.setAttribute('aria-label','Depoimentos. Arraste para os lados ou use as setas do teclado.');
  const hint=document.createElement('span');
  hint.className='review-hint';hint.textContent='Arraste para os lados →';
  document.querySelector('.review-title').append(hint);
  let dragging=null;
  const maximum=()=>Math.max(0,track.scrollWidth-track.clientWidth);
  function update(){
    const max=maximum();
    const index=max>0?Math.round(Math.max(0,Math.min(1,track.scrollLeft/max))*(dots.length-1)):0;
    dots.forEach((dot,i)=>{dot.classList.toggle('active',i===index);dot.setAttribute('aria-pressed',String(i===index));dot.disabled=max<=1});
  }
  function go(index){track.scrollTo({left:maximum()*index/(dots.length-1),behavior:preference.matches?'instant':'smooth'})}
  dots.forEach((dot,i)=>{dot.onclick=()=>go(i);dot.setAttribute('aria-label',`Posição ${i+1} de ${dots.length} nos depoimentos`);dot.setAttribute('aria-controls','review-cards')});
  track.addEventListener('scroll',update,{passive:true});
  track.addEventListener('pointerdown',e=>{
    if(e.pointerType==='touch'||e.button!==0||e.isPrimary===false||e.target.closest('a,button,input,select,textarea'))return;
    dragging={id:e.pointerId,x:e.clientX,left:track.scrollLeft};
    track.setPointerCapture(e.pointerId);track.classList.add('is-dragging');e.preventDefault();
  });
  track.addEventListener('pointermove',e=>{
    if(!dragging||e.pointerId!==dragging.id)return;
    track.scrollLeft=Math.max(0,Math.min(maximum(),dragging.left+dragging.x-e.clientX));
    e.preventDefault();update();
  });
  function finish(e){if(!dragging||e.pointerId!==dragging.id)return;dragging=null;track.classList.remove('is-dragging');if(track.hasPointerCapture(e.pointerId))track.releasePointerCapture(e.pointerId);update()}
  track.addEventListener('pointerup',finish);track.addEventListener('pointercancel',finish);track.addEventListener('lostpointercapture',finish);
  track.addEventListener('keydown',e=>{
    if(e.target!==track)return;
    const step=Math.max(200,track.clientWidth*.8);
    const positions={ArrowRight:Math.min(maximum(),track.scrollLeft+step),ArrowLeft:Math.max(0,track.scrollLeft-step),Home:0,End:maximum()};
    if(Object.hasOwn(positions,e.key)){e.preventDefault();track.scrollTo({left:positions[e.key],behavior:preference.matches?'instant':'smooth'})}
  });
  new ResizeObserver(update).observe(track);update();

  // Cada elemento aparece uma única vez; sem esconder conteúdo se JavaScript falhar.
  if(!('IntersectionObserver' in window)||!Element.prototype.animate)return;
  const animations=new Set();
  const observer=new IntersectionObserver(entries=>{
    const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
    visible.forEach((entry,i)=>{
      observer.unobserve(entry.target);
      if(preference.matches)return;
      const animation=entry.target.animate([
        {opacity:0,transform:'translateY(22px)'},
        {opacity:1,transform:'translateY(0)'}
      ],{duration:720,delay:Math.min(i*90,360),easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
      animations.add(animation);animation.onfinish=()=>animations.delete(animation);animation.oncancel=()=>animations.delete(animation);
    });
  },{threshold:.12,rootMargin:'0px 0px -28px 0px'});
  const selectors=[
    '.hero-content > *','.fruit-photo','.about-copy > h2','.about-copy > h3','.about-copy > p','.benefits article','.about-copy > small',
    '.pack-visual','.product-grid > div:last-child > h2','.product-grid > div:last-child > p','.features article','.product .text-link',
    '.club > h2','.club > p','.steps article','.club > button','.comparison > h2','.comparison > p','.table-wrap',
    '.find > h2','.find > p','.stores > div','.find-bottom','.review-title','.review-cards article',
    '.buy-heading > *','.order-image','.order-info','.order-actions'
  ];
  document.querySelectorAll(selectors.join(',')).forEach(el=>observer.observe(el));
  preference.addEventListener('change',()=>{if(preference.matches){animations.forEach(animation=>animation.finish());animations.clear()}});
})();
