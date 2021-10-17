const spider1 = document.querySelector('.spider-animation .spider1')
const thread1 = document.querySelector('.spider-animation .thread1')


gsap.to(spider1, {keyframes:[
    {y:0, rotation:180, duration: 4, ease:Elastic.easeOut, delay:10,},
    {y:-300, delay:1, duration:6}
]})

gsap.to(thread1, {keyframes:[
    {y:0, duration: 4, ease:Elastic.easeOut, delay:10},
    {y:-300, delay:1, duration:6}
]})

gsap.to(spider1, {keyframes:[
    {y:0, rotation:180, duration: 4, ease:Elastic.easeOut, delay:40,},
    {y:-300, delay:1, duration:6}
]})

gsap.to(thread1, {keyframes:[
    {y:0, duration: 4, ease:Elastic.easeOut, delay:40},
    {y:-300, delay:1, duration:6}
]})
