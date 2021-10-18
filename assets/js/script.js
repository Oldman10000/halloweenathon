//  animations
// -----------Spider death ----------
const bodySpider = document.querySelector(".body-spider");
const leftLegs = document.querySelectorAll(".left-leg");
const rightLegs = document.querySelectorAll(".right-leg");
const babySpiders = document.querySelectorAll(".baby-spider");
const allSpiderDeathAnimation = document.querySelector(
  ".spider-death-animation"
);
const blackBackground = document.querySelector(".black-background");
const greyBackground = document.querySelector(".grey-background");
const motherSpider = document.querySelector(".mother-spider");

function spiderDeath() {
  rightLegs.forEach((rightLeg) => {
    gsap.to(rightLeg, {
      rotation: 20,
      yoyo: true,
      repeat: -1,
      duration: "random(0.5,3)",
    });
  });
  leftLegs.forEach((leftLeg) => {
    gsap.to(leftLeg, {
      rotation: -20,
      yoyo: true,
      repeat: -1,
      duration: "random(0.5,3)",
    });
  });

  babySpiders.forEach((babySpider) => {
    gsap.to(babySpider, {
      y: "random(-400,400)",
      x: "random(-400,400)",
      duration: "random(1,4)",
      opacity: 1,
      repeat: -1,
      repeatRefresh: true,
      delay: "random(1,6)",
    });
  });

  const TL = gsap.timeline();

  TL.to(allSpiderDeathAnimation, { display: "block", duration: 1 })
    .to(blackBackground, { opacity: 0, duration: 4 })
    .to(motherSpider, { duration: 2, scale: 8, y: -1500 })
    .to(allSpiderDeathAnimation, { display: "none", duration: 1, delay: 1 });
}

// -----------Scream death ----------
const screamPicture = document.querySelector(".the-scream-picture");
const screamAnimation = document.querySelector(".scream-animation");

function screamDeath() {
  gsap.to(screamAnimation, { display: "block", duration: 1 });
  gsap.to(screamPicture, { duration: 3, scale: 40 });
  gsap.to(screamAnimation, { display: "none", duration: 1, delay: 5 });
}

// -----------blood death ----------
const handPicture = document.querySelector(".hand-blood-picture");
const handAnimation = document.querySelector(".blood-animation");

function bloodDeath() {
  gsap.to(handAnimation, { display: "block", duration: 1 });
  gsap.to(handPicture, { duration: 5, opacity: 0.2, delay: 1 });
  gsap.to(handPicture, { duration: 5, opacity: 1, delay: 5 });
  gsap.to(handAnimation, { display: "none", duration: 1, delay: 7 });
}

// -----------win escape animation ----------
const escapePicture = document.querySelector(".the-escape-picture");
const escapeAnimation = document.querySelector(".escape-animation");

function escape() {
  gsap.to(escapeAnimation, { display: "block", duration: 1 });
  gsap.to(escapePicture, { duration: 3, scale: 15, y: 300 });
  gsap.to(escapeAnimation, { display: "none", duration: 1, delay: 4 });
}
// ----end animations

document.addEventListener("DOMContentLoaded", function () {
  // create new pageFlip class
  const pageFlip = new St.PageFlip(document.querySelector("#horrorBook"), {
    width: 550, // base page width
    height: 733, // base page height

    size: "fixed",
    // // set threshold values:
    // minWidth: 315,
    // maxWidth: 1000,
    // minHeight: 420,
    // maxHeight: 1350,

    usePortrait: false, // prevents only one page being viewed at a time
    flippingTime: 1500, // time to flip book
    maxShadowOpacity: 0.5, // Half shadow intensity
    showCover: true, // show book cover
    // mobileScrollSupport: false,
    useMouseEvents: false, // we don't want users to be able to turn the page by clicking on the page
  });

  // fetch story json data
  fetch("./stories.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // to see the json data in the console
      document.querySelector(".cover-content h2").innerHTML = data.storyName; // test function

      let page = 0; // set initial page value

      const stories = Object.entries(data.storyParts);

      // checks if the story page 1 exists
      function checkPage1(story) {
        if (story.page1) {
          return story.page1.map((p) => `<p>${p}</p>`).join("");
        } else {
          return `
              <div class="page-img" style="background: transparent url(assets/img/page_img/${story.slide}.png) center no-repeat;">
              </div>
          `;
        }
      }

      // checks if the story page 2 exists
      function checkPage2(story) {
        if (story.page2) {
          return story.page2.map((p) => `<p>${p}</p>`).join("");
        } else {
          return `
            <div class="page-img">
              <img href="assets/img/page_img/${story.slide}.png">
            </div>
          </div>
          `;
        }
      }

      // checks buttons
      function checkButtons(story) {
        const buttons = Object.entries(story.userOptions);

        return buttons
          .map((button) => {
            return `<button class="slide${
              Object.values(button[1])[1]
            }" data-slide="${Object.values(button[1])[1]}">${
              Object.values(button[1])[0]
            }</button>`;
          })
          .join("");
      }

      stories.forEach((story) => {
        story = story[1];

        document.querySelector("#horrorBook").innerHTML += `
        <div class="page bloody">
          <div class="page-content">
            <h2 class="page-header">${story.name}</h2>
            <div class="page-text">
             ${checkPage1(story)}
            </div>
          </div>
        </div>

        <div class="page bloody">
          <div class="page-content">
            <h2 class="page-header">${story.name}</h2>
            <div class="page-text">
            ${checkPage2(story)}
              <div class="buttons">
                ${checkButtons(story)}
              </div>
            </div>
          </div>
        </div>
        `;
      });
      pageFlip.loadFromHTML(document.querySelectorAll(".page"));

      document.querySelector(".page-total").innerText = pageFlip.getPageCount();
      document.querySelector(".page-orientation").innerText =
        pageFlip.getOrientation();

      document
        .querySelector(".page-cover-top")
        .addEventListener("click", () => {
          pageFlip.flip(1);
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

      // gets pagecount
      pageCount = pageFlip.getPageCount() + 1;

      function deathAnimation(i) {
        console.log('dfdfjsdkfjaskdjfadjf')
        if (!song.paused){
          document.querySelector("#scream").play();
        }
        if (i == 16) {
          randomNumber = Math.floor(Math.random() * 3) + 1;
          if (randomNumber == 1) {
            spiderDeath();
          } else if (randomNumber == 2) {
            screamDeath();
          } else {
            bloodDeath();
          }
        }
      }

      // dice game will run one click of certain buttons.
      function runDiceGame(i, e) {
        let target = e.target.dataset.slide;
        console.log(target);
        if (target != 50) {
          console.log(i);
          pageFlip.flip(i);
          if (target == 16) {
            deathAnimation(i);
          }
        } else if (target == 50) {
          console.log(i, "dice");
          diceRoll(i, 10, 4);
        }
      }

      // run a dice roll based of variables added to function
      function diceRoll(i, total, odds) {
        let roll = Math.floor(Math.random() * total) + 1;
        console.log(roll);
        if (roll > odds) {
          pageFlip.flip(4);
        }
        if (roll < odds) {
          pageFlip.flip(16);
          deathAnimation(i);
        }
      }

      // allows user to flip to chosen page using the classname
      for (let i = 1; i < 51; i++) {
        if (document.querySelector(`.slide${i}`)) {
          document.querySelectorAll(`.slide${i}`).forEach((button) =>
            button.addEventListener("click", (e) => {
              runDiceGame(i, e);
            })
          );
        }
      }
    })
    .catch((err) => console.log(err)); // error

  // load pages
});
