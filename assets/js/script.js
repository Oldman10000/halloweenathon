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
          return `<h2>Picture here??</h2>`;
        }
      }

      // checks if the story page 2 exists
      function checkPage2(story) {
        if (story.page2) {
          return story.page2.map((p) => `<p>${p}</p>`).join("");
        } else {
          return `<h2>Picture here??</h2>`;
        }
      }

      // checks buttons
      function checkButtons(story) {
        const buttons = Object.entries(story.userOptions);

        return buttons
          .map((button) => {
            return `<button class="slide${Object.values(button[1])[1]}">${
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

      // allows user to flip to chosen page using the classname
      for (let i = 1; i < pageCount; i++) {
        if (document.querySelector(`.slide${i}`)){
          document.querySelector(`.slide${i}`).addEventListener("click", () => {
            pageFlip.flip(i);
          });
        }
      }

    })
    .catch((err) => console.log(err)); // error

  // load pages
});




// const mainBoxContainer = document.querySelector(".puzzle-main-boxes");
// const sideBoxContainer = document.querySelector(".puzzle-side-boxes"); 
// const head = document.getElementsByTagName('head');

// // const filled = document.querySelectorAll('.fill');
// fetch("./stories.json")
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data); // Show data in console

//         const stories = Object.entries(data.storyParts); // Create an array of the objects

//         // Generate side box images
//         stories.forEach(story => {
//             const imageArray = story[1].puzzleImages;
//             if (imageArray) {
//                 imageArray.forEach(img => {
//                     // head.innerHTML += `
//                     //     <style>
//                     //         .fill {
//                     //             background: blue;
//                     //             background-image: url('${img});
//                     //             background-size: contain;
//                     //             background-position: center;
//                     //             background-repeat: no-repeat;
//                     //         }
//                     //     </style>
//                     // `

//                     mainBoxContainer.innerHTML += `
//                         <div class="col-4 img-box-container"  style="width: 100%; height: 150px; background: white; border: 1px solid #000"></div>
//                     `

//                     sideBoxContainer.innerHTML += `
//                         <div class="col-12 side-box"  style="width: 100%; height: 150px; background: white; border: 1px solid #000');">
//                             <div class="fill" draggable="true" style=" width: 100%; height: 100%; 
//                             background-image: url('${img}'); background-size: contain; background-position: center; background-repeat: no-repeat;
//                             ></div>
//                         </div>
//                     `

//                     // filled.style.width = '100%';
//                     // filled.style.height = '100%';
//                     // filled.style.backgroundImage = `url('${img}')`; 
//                     // filled.style.backgroundSize = 'contain';
//                     // filled.style.backgroundPosition= 'center';
//                     // filled.style.backgroundRepeat = 'no-repeat';
//                 })
//             }
//         });

//         // const emptyBoxes = document.querySelectorAll('.img-box-container');
//         // const fill = document.querySelectorAll('.fill');

//         // // Drag functions

//         // const dragStart = () => {
//         //     this.className += ' hold';
//         // }

//         // const dragEnd = () => {
//         // }

//         // const dragOver = () => {
//         // }

//         // const dragEnter = () => {
//         // }

//         // const dragLeave = () => {
//         // }

//         // const dragDrop = () => {
//         // }

//         // fill.addEventListener('dragstart', dragStart);
//         // fill.addEventListener('dragend', dragEnd);

//         // // Loop through empty container to add event listeners to them
//         // for (const emptyBox of mainBoxContainer) {
//         //     emptyBox.addEventListener('dragover', dragOver);
//         //     emptyBox.addEventListener('dragenter', dragEnter);
//         //     emptyBox.addEventListener('dragleave', dragLeave);
//         //     emptyBox.addEventListener('drop', dragDrop);
//         // }
//     })