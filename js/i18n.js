/* EL / EN language switch. Greek is the source text inside index.html;
   English lives in the EN table below (key = the element's data-t number). */
(() => {
  'use strict';
  const EN = {
    203:'Our packages',204:'Holistic consulting for the overall development of the business',
    2:'About',3:'Method',4:'Before &amp; After',5:'Results',6:'Packages',7:'Contact',
    9:'Beyond Design.<br><span class="gold">We create experiences that last.</span>',
    10:'See the packages',12:'Marianna &amp; Michail',13:'About us',
    14:'Partners in the hospitality of the future.',
    15:'We are Marianna and Michail, with an academic background — MSc in <b>Behavioural Economics</b> and <b>Data Science</b> — and a shared passion for experiences that spark strong emotions and stay unforgettable.',
    16:'Most tourism marketing companies focus on bookings and revenue growth. We focus on what comes before and after the booking: <span class="gold">the guest experience.</span>',
    17:'We are not just another agency. We design experiences that build emotional bonds, turn guests into loyal customers and memories into long-term value for the business.',
    18:'Success is not only about filling a room. It is about creating a reason that sparks a strong desire to come back.',
    19:'What luxury hoteliers really want',
    20:'How do I raise my price per overnight stay?',
    21:'Increase the average nightly rate (ADR) through signature experiences and premium positioning.',
    22:'How do I become top 10 on Booking?',
    23:'Optimised ranking and increased visibility.',
    24:'How do I get more repeat guests?',
    25:'Building loyalty and strengthening guest retention.',
    26:'Project goal',27:'Going beyond hospitality starts here.',
    28:'To turn a room or hotel from a place to stay into a <span class="gold">destination experience</span> — one that guests remember, photograph, share and choose again.',
    29:'<i>01</i>Higher perceived value',
    30:'<i>02</i>Better reviews &amp; social sharing',
    31:'<i>03</i>Stronger customer loyalty',
    32:'<i>04</i>Premium pricing <b class="gold"><span data-count="15">15</span>–<span data-count="25">25</span>%</b> <small>→ immediate revenue increase</small>',
    33:'<i>05</i>Stronger competitive differentiation',
    34:'Our methodology',
    35:'From a simple room to an unforgettable experience that makes guests want to return.',
    36:'We turn accommodation spaces into signature experiences that raise perceived value, strengthen emotional connection and set the hotel apart. Our analysis is based on the characteristics and needs of the audience you serve.',
    38:'We experience the room as guests do',
    39:'We analyse every touchpoint to find opportunities for improvement and differentiation, from arrival to departure.',
    40:'Lack of identity',41:'Limited emotional connection',42:'Untapped experience potential',43:'Little differentiation from competitors',
    44:'A beautiful room is not necessarily an unforgettable experience. Low emotional engagement → lukewarm reviews without enthusiasm → lower chance of repeat visits.',
    46:'We create the thematic identity',
    47:'We strategically design the experience we want the guest to live.',
    48:'Disconnects from tension',49:'Experiences the sunset differently',50:'Creates moments worth sharing',
    52:'<b>1 · Welcome</b>A thoughtful welcome with local flavours and a personal message.',
    53:'<b>2 · Sunset Moment</b>Moments of calm to enjoy the sunset.',
    54:'<b>3 · Wellness Touch</b>Natural scents, soft materials and details that help you truly relax.',
    55:'<b>4 · Gentle Close</b>Warm lighting, calm music and the ideal conditions to wind down.',
    57:'We design every moment of the stay',
    59:'First impression &amp; personal welcome',61:'The peak moment of the experience',
    63:'Moments that awaken the senses',65:'Conditions for a calm end to the day',
    66:'Every detail supports the experience and strengthens the emotional connection.',
    70:'Personal greeting',71:'Welcome drink with local identity',72:'Signature scent &amp; sound',
    73:'A small story, a big connection',74:'Smooth transition to the room',
    75:'Measurement &amp; Optimisation',
    76:'We measure what matters — and improve what can be better',
    77:'Baseline',78:'We agree on indicators and a comparable period before the intervention.',
    79:'Pilot',80:'We record the date, cost and areas of implementation.',
    81:'Evaluation',82:'We extract feedback and changes in available indicators.',
    83:'Improvement',84:'We prioritise corrections and next experiences.',
    85:'Before &amp; After',
    86:'One room. <em>Two completely different experiences.</em>',
    87:'BEFORE',88:'AFTER <small>Concept Room · Aegean Harmony</small>',
    89:'Neutral · Plain · No identity · Little light · No experience · No emotion',
    90:'Identity · Experience · Emotion · Warm light · Theme · Character · Unforgettable stay',
    91:'Drag the line or keep scrolling',
    92:'In-season interventions too? Of course!',
    95:'A first impression that lasts',97:'Almost zero cost',99:'Aesthetic improvements',103:'Social sharing',
    96:'Small Rituals',98:'Lighting &amp; Atmosphere',
    104:'Results:',105:'No renovation needed • Applied immediately • Brings reviews',
    108:'Creating experiences does not stop at one concept. We can develop an entire collection of themed rooms, designed around your guests\' preferences and motivations.',
    110:'Impact in practice',
    111:'Targeted benefits and indicative metrics. The impact is evaluated after implementation, using available comparable data.',
    113:'Better reviews<br>Stronger emotional connection',
    115:'More social sharing<br>Stronger brand awareness',
    117:'More repeat bookings<br>Long-term customer loyalty',
    119:'Premium experience vs. the competition<br>Higher ADR*, occupancy and RevPAR*',
    120:'From <span class="gold">+33%</span> to <span class="gold">×8</span> revenue in 1 year',
    121:'Indicative scenarios: Revenue = customers × ADR (average daily rate) × nights per year.',
    122:'Today',123:'+10% on every factor',124:'Double every factor',
    125:'Number of customers',127:'ADR · average daily rate',129:'Nights per year',131:'Revenue',
    132:'*ADR = Average Daily Rate · *RevPAR = Revenue Per Available Room',
    133:'Proposal',
    135:'We create experiences that turn a room into a reason to choose your hotel.',
    136:'<b>Experience Audit</b>A visit to your property and an assessment of the experience through the guest\'s eyes.',
    137:'<b>Concept Design</b>Design of a themed experience tailored to the hotel\'s identity and goals.',
    138:'<b>Guest Experience Flow</b>Shaping every touchpoint from arrival to departure.',
    139:'<b>Implementation Guide</b>Detailed reports, supplier suggestions and an implementation guide.',
    140:'<b>Market, Price &amp; Revenue Strategy</b>Recommendations based on perceived value, market trends and competitor analysis.',
    142:'4–6 weeks',143:'<small>From</small> €2,500 <small>+ VAT</small>',
    144:'Market &amp; competitor research',145:'Guest experience &amp; Customer Journey analysis',
    146:'Creation of Signature Experiences',147:'Detailed implementation plan',
    148:'1 free On-site Experience Audit + free content',
    149:'★ Most popular',151:'6–8 weeks',152:'<small>From</small> €3,500 <small>+ VAT</small>',
    153:'Everything included in the previous package +',
    154:'Detailed market &amp; competitor report',155:'Review &amp; guest sentiment analysis',
    156:'Market position analysis',157:'Growth &amp; revenue opportunity analysis',
    159:'8–12 weeks',160:'<small>From</small> €5,000 <small>+ VAT</small>',161:'Everything included in the previous packages +',
    162:'Suitable supplier recommendations',163:'Support selecting materials &amp; equipment',
    164:'Extended implementation support',165:'Free 360° photography of the space',
    167:'6 or 12 months, extendable',168:'<small>From</small> €1,500<small>/month + VAT</small>',169:'Everything included in the previous packages +',
    170:'Continuous optimisation of the guest experience',171:'Coordination with management &amp; staff',
    172:'Collaboration with decorators / designers',173:'Ongoing adaptation &amp; development of new experiences',
    174:'2 free On-site Experience Audits / year',
    175:'Final investment',
    176:'* Prices shown are starting prices. The final investment depends on the size and complexity of the property, the scope of the Customer Journey, the spaces and experience touchpoints included, and the scale of implementation. After a short discovery meeting and scope definition, a personalised financial proposal is provided.',
    177:'<b>Rollout &amp; Adaptation:</b> if a designed concept is extended to additional rooms, villas, buildings or spaces, a separate Rollout / Adaptation Fee may apply, depending on the scale of implementation and the degree of adaptation required.',
    178:'Each package includes a small percentage of the additional profits of the following season, determined by the size of the business.',
    180:'The experience does not stand still.',
    181:'If you prefer, we remain strategic partners with regular reviews, fresh ideas and continuous evolution of the concept, so it stays relevant, competitive and appealing to your guests.',
    182:'Let\'s create something unique together!',
    183:'Book our next meeting to discuss and walk through our packages.',
    184:'Marianna Spanidi',186:'Michail Kolettis',
    188:'Send us a message',189:'Full name',191:'Hotel / Property',192:'Interested in',
    193:'Not sure yet',201:'Our approach is built on an <b>in-depth analysis of your audience and your business data</b>, so that targeted actions raise perceived value and, in turn, profitability — <span class="gold">without requiring renovations or other expenses</span>. Our services are advisory in nature, in a field that differentiates your business in the market straight away and is not yet widely available in Greece. It is untapped value that gives an even greater advantage to whoever takes the initiative first — with results visible from the very first season the changes are applied.',198:'Message',199:'Send'
  };
  const MSG = {
    el:{ sending:'Αποστολή…', ok:'Ευχαριστούμε! Λάβαμε το μήνυμά σας και θα επικοινωνήσουμε σύντομα.', invalid:'Συμπληρώστε ονοματεπώνυμο, έγκυρο email και μήνυμα.',
         fail:'Δεν ήταν δυνατή η αποστολή. Δοκιμάστε ξανά ή γράψτε μας στο ', title:'Luxury Guest Experience Design',
         desc:'Μετατρέπουμε δωμάτια και ξενοδοχεία σε signature εμπειρίες που αυξάνουν την αντιλαμβανόμενη αξία, την πιστότητα και τον τζίρο.',
         notes:['Βάση σύγκρισης','+33% τζίρος σε 1 χρόνο','×8 τζίρος σε 1 χρόνο (800% του αρχικού)'], baAria:'Σύγκριση πριν και μετά' },
    en:{ sending:'Sending…', ok:'Thank you! We have received your message and will be in touch shortly.', invalid:'Please enter your name, a valid email and a message.',
         fail:'We could not send your message. Please try again or email us at ', title:'Luxury Guest Experience Design',
         desc:'We turn rooms and hotels into signature experiences that raise perceived value, loyalty and revenue.',
         notes:['Baseline','+33% revenue in 1 year','×8 revenue in 1 year (800% of the original)'], baAria:'Before and after comparison' }
  };
  const nodes = [...document.querySelectorAll('[data-t]')].map(el => ({ el, el_: el.innerHTML, en: EN[el.dataset.t] }));
  const desc = document.querySelector('meta[name="description"]');
  let lang = 'el';
  function apply(l) {
    lang = l === 'en' ? 'en' : 'el';
    document.documentElement.lang = lang;
    for (const n of nodes) n.el.innerHTML = (lang === 'en' && n.en != null) ? n.en : n.el_;
    document.title = MSG[lang].title; if (desc) desc.content = MSG[lang].desc;
    const h = document.querySelector('.ba-handle'); if (h) h.setAttribute('aria-label', MSG[lang].baAria);
    document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
    try { localStorage.setItem('lang', lang); } catch (e) {}
    window.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }
  window.I18N = { get lang() { return lang; }, t: k => MSG[lang][k] };
  document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => apply(b.dataset.lang)));
  let saved = null; try { saved = localStorage.getItem('lang'); } catch (e) {}
  const q = new URLSearchParams(location.search).get('lang');
  const start = q || saved || ((navigator.language || '').toLowerCase().startsWith('el') ? 'el' : 'en');
  if (start === 'en') apply('en'); else { lang = 'el'; window.dispatchEvent(new CustomEvent('langchange', { detail: 'el' })); }
})();
