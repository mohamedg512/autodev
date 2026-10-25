/* AutoDev public-site bridge: Supabase is the source of truth for public content and contact settings. */
(function () {
  "use strict";
  const URL = "https://nuogzbgsxmtbcuwfglwg.supabase.co";
  const KEY = "sb_publishable_bu5SFuqs_jlnhJzcG8MbBg_eMQcsjF1";
  if (!window.supabase || !window.supabase.createClient) {
    console.error("AutoDev: Supabase SDK failed to load.");
    document.documentElement.dataset.supabaseStatus = "sdk-error";
    return;
  }
  const db = window.supabase.createClient(URL, KEY);
  const lang = () => { const x=localStorage.getItem("autodev-lang")||document.documentElement.lang||"ar"; return ["ar","fr","en"].includes(x)?x:"ar"; };
  const pick = v => v==null?"":(typeof v==="object"?String(v[lang()]??v.ar??v.en??v.fr??""):String(v));
  const esc = v => String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  let liveSettings = {};
  async function get(table, configure) {
    try { let q=db.from(table).select("*"); if(configure)q=configure(q); const {data,error}=await q; if(error) throw error; return data||[]; }
    catch(e){ console.error("AutoDev Supabase read failed ["+table+"]:",e.message||e); return null; }
  }
  const text = (selector, value) => { const el=document.querySelector(selector); if(el && value != null) el.textContent=String(value); return el; };
  const digits = v => String(v||"").replace(/[^0-9]/g,"");
  function replaceVisibleLiteral(oldValue,newValue){
    if(!oldValue) return;
    newValue=String(newValue??"");
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement&&!['SCRIPT','STYLE','NOSCRIPT'].includes(n.parentElement.tagName)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{ if(n.nodeValue.includes(oldValue)) n.nodeValue=n.nodeValue.split(oldValue).join(newValue); });
  }
  function applySettings(s){
    // Replace the previously applied values too, so subsequent edits from the dashboard
    // keep updating footer/legal/chat text without a page refresh.
    const previous={...liveSettings};
    const phone=String(s.phone||"").trim();
    const whatsapp=String(s.whatsapp||s.phone||"").trim();
    const email=String(s.email||"").trim();
    const location=String(s.location||"").trim();
    // Update literal text from the prior settings as well as the original defaults.
    if(previous.phone) replaceVisibleLiteral(previous.phone, phone);
    if(previous.email) replaceVisibleLiteral(previous.email, email);
    if(previous.location) replaceVisibleLiteral(previous.location, location);
    liveSettings={...s};
    // Main contact panel (explicit data attributes avoid brittle selectors).
    text("[data-site-setting='email']",email);
    text("[data-site-setting='phone']",phone);
    text("[data-site-setting='location']",location);
    // Existing and future contact/footer/legal references across the whole page.
    replaceVisibleLiteral("+213 664 41 51 39",phone);
    replaceVisibleLiteral("contact@autodev.agency",email);
    replaceVisibleLiteral("تيزي وزو، الجزائر",location);
    replaceVisibleLiteral("Tizi Ouzou, Algérie",location);
    replaceVisibleLiteral("Tizi Ouzou, Algeria",location);
    document.querySelectorAll('a[href^="tel:"]').forEach(a=>{ if(phone){a.href="tel:"+digits(phone); a.textContent=a.textContent.trim()?phone:a.textContent;a.hidden=false;}else{a.removeAttribute("href");a.hidden=true;} });
    document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{if(email){a.href="mailto:"+email;if(a.textContent.includes("@"))a.textContent=email;a.hidden=false;}else{a.removeAttribute("href");if(a.textContent.includes("@"))a.textContent="";a.hidden=true;}});
    document.querySelectorAll('a[href*="wa.me/"]').forEach(a=>{if(whatsapp){a.href="https://wa.me/"+digits(whatsapp);a.hidden=false;}else{a.removeAttribute("href");a.hidden=true;}});
    document.querySelectorAll('.footer-social a').forEach(a=>{
      const label=(a.getAttribute('aria-label')||'').toLowerCase();
      const pair=label.includes('instagram')?s.social_instagram:label.includes('linkedin')?s.social_linkedin:label.includes('twitter')||label.includes('x')?s.social_twitter:label.includes('facebook')?s.social_facebook:"";
      if(pair){a.href=pair;a.target="_blank";a.rel="noopener noreferrer";}
    });
    document.dispatchEvent(new CustomEvent("autodev:settings-loaded",{detail:{...liveSettings}}));
  }
  function applyContent(c){
    const h=c.hero||{}, a=c.about||{}, l=c.legal||{}, L=lang();
    const title=h["title_"+L]||h.title||h.title_ar, subtitle=h["subtitle_"+L]||h.subtitle||h.subtitle_ar;
    const ht=document.querySelector("[data-i18n='hero_title'],.hero-title"), hs=document.querySelector("[data-i18n='hero_subtitle'],.hero-subtitle");
    if(title&&ht)ht.textContent=pick(title); if(subtitle&&hs)hs.textContent=pick(subtitle);
    const at=a["title_"+L]||a.title||a.title_ar, ad=a["desc_"+L]||a.description||a.desc_ar;
    const ae=document.querySelector("[data-i18n='about_title']"), de=document.querySelector("[data-i18n='about_desc']");
    if(at&&ae)ae.textContent=pick(at); if(ad&&de)de.textContent=pick(ad);
    ["terms","privacy","cookies"].forEach(k=>{const v=l[k+"_"+L]||l[k];if(v)document.querySelectorAll(`[data-legal-body="${k}"],#legal${k[0].toUpperCase()+k.slice(1)}Body,.legal-body-${k}`).forEach(el=>el.textContent=pick(v));});
  }
  function renderProjects(items){const grid=document.getElementById("projectsGrid");if(!grid)return;const list=items.filter(p=>p.is_visible!==false);grid.innerHTML=list.map(p=>{const title=pick(p.title),img=p.image||p.cover_image_url||"",tech=Array.isArray(p.tech)?p.tech:(Array.isArray(p.technologies)?p.technologies:[]);return `<article class="project-card" data-category="${esc(p.category||"")}" data-title="${esc(title)}" data-img="${esc(img)}" data-portfolio="portfolio/index.html" role="button" tabindex="0"><div class="project-img"><span class="project-tag">${esc(p.tag||"")}</span>${img?`<img src="${esc(img)}" alt="${esc(title)}" loading="lazy">`:""}</div><div class="project-body"><h3>${esc(title)}</h3><p>${esc(pick(p.description||p.short_description))}</p><div class="project-tech">${tech.map(t=>`<span>${esc(typeof t==="string"?t:t.name||"")}</span>`).join("")}</div></div></article>`;}).join("");if(typeof initProjectPreview==="function")initProjectPreview();}
  function renderServices(items){const g=document.querySelector("#services .services-grid");if(!g)return;g.innerHTML=items.filter(x=>x.is_visible!==false).map(s=>`<article class="service-card"><div class="service-icon">${esc(s.icon||"✦")}</div><h3>${esc(pick(s.title))}</h3><p>${esc(pick(s.short_description))}</p></article>`).join("");}
  function renderTestimonials(items){const g=document.getElementById("testimonialsGrid");if(!g)return;g.innerHTML=items.filter(x=>x.is_visible!==false).map(t=>{const n=pick(t.name),r=pick(t.role),c=pick(t.content),stars="★".repeat(Math.max(1,Math.min(5,Number(t.rating)||5)));const av=t.avatar?`<img src="${esc(t.avatar)}" alt="">`:esc(n.trim().split(/\s+/).map(x=>x[0]).slice(0,2).join(""));return `<article class="testimonial-card"><div class="testimonial-stars">${stars}</div><p class="testimonial-text">"${esc(c)}"</p><div class="testimonial-author"><div class="testimonial-avatar">${av}</div><div><strong>${esc(n)}</strong><span>${esc(r)}</span></div></div></article>`;}).join("");}
  function renderFaqs(items){const g=document.getElementById("faqList");if(!g)return;g.innerHTML=items.filter(x=>x.is_visible!==false).map(f=>`<div class="faq-item"><button class="faq-q" type="button"><span>${esc(pick(f.question))}</span><span aria-hidden="true">＋</span></button><div class="faq-a"><p>${esc(pick(f.answer))}</p></div></div>`).join("");g.querySelectorAll(".faq-q").forEach(b=>b.addEventListener("click",()=>b.parentElement.classList.toggle("active")));}
  async function submitRequest(payload){
    const row={name:String(payload.name||"").trim(),company:String(payload.company||""),email:String(payload.email||"").trim(),phone:String(payload.phone||""),service:String(payload.service||""),budget:String(payload.budget||""),timeline:String(payload.timeline||""),description:String(payload.description||payload.desc||""),channel:String(payload.channel||"form"),status:"new",priority:"medium"};
    if(!row.name||!row.email)throw new Error("الاسم والبريد الإلكتروني مطلوبان");
    const {error}=await db.from("requests").insert(row);if(error)throw error;return true;
  }
  window.AutoDevBackend={client:db,submitRequest,getSettings:()=>({...liveSettings})};
  function bindContact(){
    const form=document.querySelector("form.contact-form");if(!form||form.dataset.supabaseBound==="1")return;form.dataset.supabaseBound="1";form.removeAttribute("onsubmit");
    let status=form.querySelector("[data-supabase-status]");if(!status){status=document.createElement("p");status.dataset.supabaseStatus="1";status.setAttribute("role","status");form.appendChild(status);}
    form.addEventListener("submit",async e=>{e.preventDefault();const fields=form.querySelectorAll("input,textarea");const name=fields[0]?.value.trim()||"",email=fields[1]?.value.trim()||"",subject=fields[2]?.value.trim()||"",message=fields[3]?.value.trim()||"";if(!name||!email||!message){status.textContent=lang()==="ar"?"يرجى ملء الحقول المطلوبة.":"Please fill in the required fields.";return;}const btn=form.querySelector('[type="submit"]');if(btn)btn.disabled=true;status.textContent=lang()==="ar"?"جارٍ إرسال الرسالة...":"Sending message...";try{const {error}=await db.from("messages").insert({name,email,subject,message,source:"website_contact_form",status:"unread",phone:""});if(error)throw error;form.reset();status.textContent=lang()==="ar"?"تم إرسال رسالتك بنجاح.":"Your message has been sent.";}catch(err){console.error(err);status.textContent=lang()==="ar"?"تعذر إرسال الرسالة. تحقق من الاتصال أو حاول لاحقاً.":"Could not send your message. Please try again later.";}finally{if(btn)btn.disabled=false;}});
  }
  async function load(){
    document.documentElement.dataset.supabaseStatus="loading";
    const [site,projects,services,testimonials,faqs,settings]=await Promise.all([
      get("site_content",q=>q.eq("id",1).limit(1)),get("portfolio_projects",q=>q.eq("is_visible",true).order("sort_order")),get("services",q=>q.eq("is_visible",true).order("sort_order")),get("testimonials",q=>q.eq("is_visible",true).order("sort_order")),get("faq_items",q=>q.eq("is_visible",true).order("sort_order")),get("settings",q=>q.eq("id",1).limit(1))
    ]);
    if(site!==null&&site[0])applyContent(site[0]);
    // A successful empty result intentionally removes hard-coded sample content.
    if(projects!==null)renderProjects(projects); else renderProjects([]);
    if(services!==null)renderServices(services); else renderServices([]);
    if(testimonials!==null)renderTestimonials(testimonials); else renderTestimonials([]);
    if(faqs!==null)renderFaqs(faqs); else renderFaqs([]);
    if(settings!==null)applySettings(settings[0]||{});
    bindContact();
    document.documentElement.dataset.supabaseStatus=[projects,services,testimonials,faqs,settings].some(x=>x===null)?"partial-error":"connected";
    document.dispatchEvent(new CustomEvent("autodev:supabase-loaded",{detail:{status:document.documentElement.dataset.supabaseStatus}}));
  }
  document.addEventListener("autodev:lang",()=>load().catch(console.error));
  document.addEventListener("autodev-lang-changed",()=>load().catch(console.error));

  // Live synchronization: any dashboard change to public content/settings is reflected
  // in already-open visitor pages without reloading the browser tab.
  let refreshTimer=null;
  let lastRefresh=0;
  function scheduleRefresh(reason){
    if(refreshTimer) clearTimeout(refreshTimer);
    refreshTimer=setTimeout(()=>{
      lastRefresh=Date.now();
      load().catch(err=>console.error("AutoDev live refresh failed ("+reason+"):",err));
    },250);
  }
  try {
    const liveChannel=db.channel("autodev-public-site-live")
      .on("postgres_changes",{event:"*",schema:"public",table:"settings"},()=>scheduleRefresh("settings"))
      .on("postgres_changes",{event:"*",schema:"public",table:"site_content"},()=>scheduleRefresh("site_content"))
      .on("postgres_changes",{event:"*",schema:"public",table:"portfolio_projects"},()=>scheduleRefresh("portfolio_projects"))
      .on("postgres_changes",{event:"*",schema:"public",table:"services"},()=>scheduleRefresh("services"))
      .on("postgres_changes",{event:"*",schema:"public",table:"testimonials"},()=>scheduleRefresh("testimonials"))
      .on("postgres_changes",{event:"*",schema:"public",table:"faq_items"},()=>scheduleRefresh("faq_items"))
      .subscribe(status=>{
        document.documentElement.dataset.supabaseRealtime=status.toLowerCase();
        if(status==="SUBSCRIBED") console.info("AutoDev: live updates connected.");
        if(status==="CHANNEL_ERROR"||status==="TIMED_OUT") console.warn("AutoDev: realtime unavailable; fallback refresh remains active.",status);
      });
    window.AutoDevBackend.liveChannel=liveChannel;
  } catch(err) { console.warn("AutoDev realtime setup failed; fallback refresh remains active.",err); }

  // Fallback in case Realtime is not enabled for a table/project: updates still appear
  // automatically, typically within 15 seconds, without a browser refresh.
  window.setInterval(()=>{
    if(document.visibilityState==="visible" && Date.now()-lastRefresh>14000){
      lastRefresh=Date.now();
      load().catch(err=>console.error("AutoDev fallback refresh failed:",err));
    }
  },15000);
  document.addEventListener("visibilitychange",()=>{
    if(document.visibilityState==="visible") scheduleRefresh("tab-visible");
  });

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>load().catch(console.error));else load().catch(console.error);
})();
