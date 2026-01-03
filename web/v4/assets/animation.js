// gsap.registerPlugin(ScrollTrigger);

// 平滑滚动参数
// const lenis = new Lenis();
// lenis.on("scroll", ScrollTrigger.update);
// gsap.ticker.add((time) => {
//   lenis.raf(time * 1000);
// });
// gsap.ticker.lagSmoothing(0);

// const slice = document.getElementById('slice')
// const hero = document.getElementById('hero')

// let tl = gsap.timeline({
// 	// yes, we can add it to an entire timeline!
// 	scrollTrigger: {
// 		trigger: '#container',
// 		pin: true, // pin the trigger element while active
// 		start: 'top top', // when the top of the trigger hits the top of the viewport
// 		end: 'bottom', // end after scrolling 500px beyond the start
// 		scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
//         debugger: true,
// 		snap: {
// 			snapTo: 'labels', // snap to the closest label in the timeline
// 			duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
// 			delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
// 			ease: 'power1.inOut' // the ease of the snap animation ("power3" by default)
// 		}
// 	}
// });

// // add animations and labels to the timeline
// tl.addLabel('start')
// 	.to('#slice', { y: -768 })
//     .addLabel('end');

window.addEventListener("load", () => {
  const slice = document.getElementById("slice");
  const hero = document.getElementById("hero");
  hero.classList.remove("opacity-0");
  hero.classList.add("opacity-100");
  slice.classList.remove("opacity-0");
  slice.classList.add("opacity-100");
});
