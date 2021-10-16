document.addEventListener("DOMContentLoaded", function () {
  const pageFlip = new St.PageFlip(document.getElementById("demoBookExample"), {
    width: 550, // base page width
    height: 733, // base page height

    size: "fixed",
    // // set threshold values:
    // minWidth: 315,
    // maxWidth: 1000,
    // minHeight: 420,
    // maxHeight: 1350,

    flippingTime: 1500,
    maxShadowOpacity: 0.5, // Half shadow intensity
    showCover: true,
    // mobileScrollSupport: false,
    useMouseEvents: false,
  });

  // load pages
  pageFlip.loadFromHTML(document.querySelectorAll(".page"));

  document.querySelector(".page-total").innerText = pageFlip.getPageCount();
  document.querySelector(".page-orientation").innerText =
    pageFlip.getOrientation();

  document.querySelector(".page-cover-top").addEventListener("click", () => {
    pageFlip.flip(1);
  });

  document.querySelector(".enter").addEventListener("click", () => {
    pageFlip.flip(3, 'top');
  });

  document.querySelector(".death").addEventListener("click", () => {
    pageFlip.flip(0);
  });

  document.querySelector(".room1").addEventListener("click", () => {
    pageFlip.flip(5,);
  });

  document.querySelector(".room2").addEventListener("click", () => {
    pageFlip.flip(7, 'top');
  });

  document.querySelector(".room3").addEventListener("click", () => {
    pageFlip.flip(9, 'top');
  });

  document.querySelector(".btn-prev").addEventListener("click", () => {
    pageFlip.flipPrev(); // Turn to the previous page (with animation)
  });

  document.querySelector(".btn-next").addEventListener("click", () => {
    pageFlip.flipNext(); // Turn to the next page (with animation)
  });

  // triggered by page turning
  pageFlip.on("flip", (e) => {
    document.querySelector(".page-current").innerText = e.data + 1;
  });

  // triggered when the state of the book changes
  pageFlip.on("changeState", (e) => {
    document.querySelector(".page-state").innerText = e.data;
  });

  // triggered when page orientation changes
  pageFlip.on("changeOrientation", (e) => {
    document.querySelector(".page-orientation").innerText = e.data;
  });
});
