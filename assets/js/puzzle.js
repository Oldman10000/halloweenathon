const mainBoxContainer = document.querySelector(".puzzle-main-boxes");
const sideBoxContainer = document.querySelector(".puzzle-side-boxes"); 

fetch("./stories.json")
    .then((res) => res.json())
    .then((data) => {
        console.log(data); // Show data in console

        const stories = Object.entries(data.storyParts); // Create an array of the objects

        // Generate side box images
        stories.forEach(story => {
            const imageArray = story[1].puzzleImages;
            if (imageArray) {
                imageArray.forEach(img => {
                    mainBoxContainer.innerHTML += `
                        <div class="col-4 img-box-container"  style="width: 100%; height: 150px; background: white; border: 1px solid #000"></div>
                    `

                    sideBoxContainer.innerHTML += `
                        <div class="col-12 side-box"  style="width: 100%; height: 150px; background: white; border: 1px solid #000');">
                            <div class="fill" draggable="true" style=" width: 100%; height: 100%; background-image: url('${img}'); background-size: cover;background-size: contain; background-position: center; background-repeat: no-repeat;"></div>
                        </div>
                    `


                })
            }
        });

        const emptyBoxes = document.querySelectorAll('.img-box-container');
        const fill = document.querySelectorAll('.fill');


        // Drag functions
        const dragStart = () => {
            this.className += ' hoveredBorders';
        }

        const dragEnd = () => {
        }

        const dragOver = (e) => {
            e.preventDefault();
            console.log("over")
        }

        const dragEnter = (e) => {
            e.preventDefault();
            this.className += ' hovered';
            console.log("dragEnter");
        }

        const dragLeave = () => {
            this.className = 'empty';
            console.log("leave")
        }

        const dragDrop = () => {
            this.className  = 'empty';
            console.log("drop")
        }
        fill.forEach(filled => {
            filled.addEventListener('dragstart', dragStart);
            filled.addEventListener('dragend', dragEnd);
        });
        
        for (const emptyBox of emptyBoxes) {
            emptyBox.addEventListener('dragover', dragOver);
            emptyBox.addEventListener('dragenter', dragEnter);
            emptyBox.addEventListener('dragleave', dragLeave);
            emptyBox.addEventListener('drop', dragDrop);
        }


    })