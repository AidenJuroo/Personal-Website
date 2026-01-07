/* script.js - shared scripts for navbar, AOS, and page transitions */

/* Page transition: when clicking any internal link, fade out body then navigate */
(function(){
  // Add click handler to internal links
  document.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href');
    // only apply to same-folder html links (no external or anchors)
    if(href && href.endsWith('.html') && location.pathname !== href){
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(()=> { window.location.href = href; }, 360); // matches CSS fade
    }
  });
})();

/* Navbar fade on scroll (hide on scroll down, show on scroll up) */
(function(){
  let lastScroll = window.scrollY || 0;
  const header = document.querySelector('.header');
  if(!header) return;
  window.addEventListener('scroll', () => {
    const current = window.scrollY || 0;
    if(current > lastScroll + 10 && current > 60){
      header.classList.add('nav-hidden');
    } else {
      header.classList.remove('nav-hidden');
    }
    lastScroll = current;
  }, {passive:true});
})();

/* Initialize AOS (Animate On Scroll) if available */
(function(){
  function initAOS(){
    if(window.AOS){
      AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' });
    }
  }
  // load AOS script dynamically if not already present
  if(!window.AOS){
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
    document.head.appendChild(link);
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
    s.onload = initAOS;
    document.body.appendChild(s);
  } else {
    initAOS();
  }
})();
