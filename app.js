const h = React.createElement;
const products = [
 ['Waffle','Waffle with Berries',650,'waffle','\u{1f9c7}'],
 ['Cr\u00e8me Br\u00fbl\u00e9e','Vanilla Bean Cr\u00e8me Br\u00fbl\u00e9e',700,
'creme-brulee','\u{1f36e}'],
 ['Macaron','Macaron Mix of Five',800,'macaron','\u{1f36a}'],
 ['Tiramisu','Classic Tiramisu',550,'tiramisu','\u{1f370}'],
 ['Baklava','Pistachio Baklava',400,'baklava','\u{1f96e}'],
 ['Pie','Lemon Meringue Pie',500,'meringue','\u{1f967}'],
 ['Cake','Red Velvet Cake',450,'cake','\u{1f370}'],
 ['Brownie','Salted Caramel Brownie',450,'brownie','\u{1f36b}'],
 ['Panna Cotta','Vanilla Panna Cotta',650,'panna-cotta','\u{1f36e}']
];
const money = cents => '$' + (cents / 100).toFixed(2);
function Photo({p,small=false}) {
 const [failed,setFailed] = React.useState(false);
 return h('div',{className:small?'photo small':'photo'},failed ? h('span',{'aria-label':p[1],
role:'img'},p[4]) : h('img',{src:'https://raw.githubusercontent.com/luismda/product-list-with-cart/main/assets/images/image-'+p[3]+'-desktop.jpg',
alt:p[1],onError:()=>setFailed(true)}));
}
function App(){
 const [cart,setCart]=React.useState({});
 const [confirmed,setConfirmed]=React.useState(false);
 const dialog=React.useRef(null);
 const entries=products.map((p,i)=>({p,i,q:cart[i]||0})).filter(x=>x.q);
 const count=entries.reduce((n,x)=>n+x.q,0);
 const total=entries.reduce((n,x)=>n+x.q*x.p[2],0);
 function change(i,delta){setCart(old=>{const next={...old};const q=Math.max(0,
(old[i]||0)+delta);if(q)next[i]=q;else delete next[i];return next;});}
 function remove(i){setCart(old=>{const next={...old};delete next[i];return next;
});}
 React.useEffect(()=>{if(confirmed && dialog.current && !dialog.current.open)dialog.current.showModal();
},[confirmed]);
 function reset(){setConfirmed(false);setCart({});window.scrollTo(0,0);}
 function rows(modal){return entries.map(({p,i,q})=>h('li',{key:i},modal&&h(Photo,
{p,small:true}),h('div',{className:'line-info'},h('strong',null,p[1]),h('div',
{className:'prices'},h('b',null,q+'x'),h('span',null,'@ '+money(p[2])),!modal&&h('span',
null,money(q*p[2])))),modal?h('strong',null,money(q*p[2])):h('button',{className:'remove',
onClick:()=>remove(i),'aria-label':'Remove '+p[1]},'\u00d7')));}
 function orderTotal(){return h('div',{className:'total'},h('span',null,'Order Total'),
h('strong',null,money(total)));}
 return h('main',null,h('section',null,h('h1',null,'Desserts'),h('div',{className:'grid'},
products.map((p,i)=>h('article',{key:i},h('div',{className:'picture '+(cart[i]?'chosen':'')},
h(Photo,{p}),cart[i]?h('div',{className:'quantity'},h('button',{'aria-label':'Decrease '+p[1],
onClick:()=>change(i,-1)},'\u2212'),h('span',null,cart[i]),h('button',{'aria-label':'Increase '+p[1],
onClick:()=>change(i,1)},'+')):h('button',{className:'add',onClick:()=>change(i,
1)},h('span',{'aria-hidden':true},'\u{1f6d2}'),' Add to Cart')),h('p',{className:'category'},
p[0]),h('h3',null,p[1]),h('b',{className:'price'},money(p[2])))))),h('aside',
null,h('h2',null,'Your Cart ('+count+')'),count?h(React.Fragment,null,h('ul',
null,rows(false)),orderTotal(),h('p',{className:'carbon'},'\u{1f33f} This is a carbon-neutral delivery'),
h('button',{className:'primary',onClick:()=>setConfirmed(true)},'Confirm Order')):h('div',
{className:'empty'},h('div',{'aria-hidden':true},'\u{1f9c1}'),h('p',null,'Your added items will appear here'))),
confirmed&&h('dialog',{ref:dialog,onCancel:()=>setConfirmed(false)},h('div',
{className:'check'},'\u2713'),h('h1',null,'Order Confirmed'),h('p',{className:'category'},
'We hope you enjoy your food!'),h('div',{className:'summary'},h('ul',null,rows(true)),
orderTotal()),h('button',{className:'primary',onClick:reset},'Start New Order')));
}
ReactDOM.render(h(App),document.getElementById('root'));