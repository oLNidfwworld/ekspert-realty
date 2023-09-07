import { useRouter } from "nuxt/app"

export default defineNuxtPlugin(  app    => {
    const router = useRouter();
    if (process.env.NODE_ENV !== 'production') return;
  
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
 
    ym(5096872, "init", {
         clickmap:true,
         trackLinks:true,
         accurateTrackBounce:true,
         webvisor:true
    });
 
    router.afterEach((to, from) => {
        ym(5096872, 'hit', to.fullPath);
      })
    console.log(app.vueApp)
    console.log(app)
  }) 