// -----------Spider animation ----------
const spider1 = document.querySelector('.spider-animation .spider1')
const thread1 = document.querySelector('.spider-animation .thread1')

gsap.to(spider1, {keyframes:[
    {y:0, rotation:180, duration: 4, ease:Elastic.easeOut, delay:60,},
    {y:-300, delay:1, duration:6}
]}).repeat(-1)

gsap.to(thread1, {keyframes:[
    {y:0, duration: 4, ease:Elastic.easeOut, delay:60},
    {y:-300, delay:1, duration:6}
]}).repeat(-1)


// -----------Skeleton animation ----------
const skeletonBodyHead = document.querySelectorAll('.skeleton-animation')
const skeletonBody = document.querySelector('.skeleton-animation .skeleton-body')
const skeletonHead = document.querySelector('.skeleton-animation .skeleton-head')

const tlSkeleton = gsap.timeline();

tlSkeleton
.to(skeletonBodyHead,{opacity:0.6, duration:6, delay:2},)
.to(skeletonHead,{x:-40,rotation:-10, duration: 2, y:-20, ease:"power4",})
.to(skeletonHead,{x:-65,rotation:-90, duration: 2, y:8},'-=0.5')
.to(skeletonBody,{rotation:180,y:50, duration: 1})
.to(skeletonHead,{duration: 4, y:100},'-=0.75')
.to(skeletonBodyHead,{opacity:0, duration: 3},'<')


// -----------Ghost animation ----------
const ghost = document.querySelector('.ghost')

const tlGhost = gsap.timeline();

tlGhost
.to(ghost, {keyframes:[
    {y:"random(0,400)", opacity:0, duration:5,  delay:2},
    {x:-150, opacity:"random(0.2,0.5)", duration:5, },
    {x:-300, opacity:"random(0.2,0.5)", duration:5, },
    {x:-450, opacity:"random(0.1,0.4)", duration:5, },
    {x:-600, opacity:0, duration:5, },
    {opacity:0, duration:30, }, 
]}).repeat(-1)

