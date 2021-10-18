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
      document.querySelector(".cover-content h2").innerHTML = data.storyName; // sets header in html

      // create variable for the storyparts
      const stories = Object.entries(data.storyParts);

      // checks if the story page 1 exists
      function checkPage1(story) {
        if (story.page1) {
          // insert paragraph content
          return story.page1.map((p) => `<p>${p}</p>`).join("");
        } else {
          // insert image
          return `
              <div class="page-img" style="background: transparent url(assets/img/page_img/${story.slide}.png) center no-repeat;">
              </div>
          `;
        }
      }

      // checks if the story page 2 exists
      function checkPage2(story) {
        if (story.page2) {
          // insert paragraph content
          return story.page2.map((p) => `<p>${p}</p>`).join("");
        } else {
          // insert image
          return `
            <div class="page-img">
              <img href="assets/img/page_img/${story.slide}.png">
            </div>
          </div>
          `;
        }
      }

      // checks what buttons are needed
      function checkButtons(story) {
        // gets buttons from the story variable
        const buttons = Object.entries(story.userOptions);

        // inserts buttons needed with relevant class/data/content
        return buttons
          .map((button) => {
            return `<button class="slide${
              Object.values(button[1])[1]
            }" data-slide="${Object.values(button[1])[1]}" data-action="${
              Object.values(button[1])[2]
            }">${Object.values(button[1])[0]}</button>`;
          })
          .join("");
      }

      // renders content into html
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

      // creates pageFlip object from html content
      pageFlip.loadFromHTML(document.querySelectorAll(".page"));

      // adds page count to html for testing purposes
      document.querySelector(".page-total").innerText = pageFlip.getPageCount();
      document.querySelector(".page-orientation").innerText =
        pageFlip.getOrientation();

      // allows user to open book from cover
      document
        .querySelector(".page-cover-top")
        .addEventListener("click", () => {
          pageFlip.flip(1);
        });

      // flip to prev page for testing
      document.querySelector(".btn-prev").addEventListener("click", () => {
        pageFlip.flipPrev(); // Turn to the previous page (with animation)
      });

      // flip to next page for testing
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

      // creates animation that triggers on player death
      function deathAnimation() {
        // plays sound if the sound is turned on
        if (!song.paused) {
          document.querySelector("#scream").play();
        }
        // plays random death animation from 3options
        randomNumber = Math.floor(Math.random() * 3) + 1;
        if (randomNumber == 1) {
          spiderDeath();
        } else if (randomNumber == 2) {
          screamDeath();
        } else {
          bloodDeath();
        }
      }

      // set initial key value
      let haveKey = false;

      // dice game will run one click of certain buttons.
      function runDiceGame(i, e) {
        let death;
        let puzzle;
        if (e.target.dataset.action == "death") {
          death = e.target.dataset.action;
        } else if (e.target.dataset.action == "puzzle") {
          puzzle = e.target.dataset.action;
        } else if (e.target.dataset.action == "key") {
          // sets this to true once key has been taken
          haveKey = true;
        } else if (e.target.dataset.action == "keycheck") {
          // checks if key exists
          if (!haveKey) {
            // if no key then hide this button
            document.querySelector(".slide36").style.display = "none";
          }
        }

        // checks if butotn pressed was a puzzle button
        if (!puzzle) {
          // just flip to necessary page
          pageFlip.flip(i);
          if (death) {
            // if death button activate death anim
            deathAnimation();
          }
        } else {
          // activate diceroll on puzzle
          diceRoll(i, 10, 4);
        }
      }

      // run a dice roll based of variables added to function
      function diceRoll(total, odds) {
        let roll = Math.floor(Math.random() * total) + 1;
        if (roll > odds) {
          pageFlip.flip(36);
        }
        if (roll < odds) {
          pageFlip.flip(i);
          deathAnimation();
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
