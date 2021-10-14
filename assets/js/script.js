const storyTitle = document.getElementById("storyTitle");
const allStories = document.getElementById("allStories");

fetch("./stories.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach((story) => {
      console.log(story.storyName)
      const allStoriesList = document.createElement("li");

      allStoriesList.innerHTML = story.storyName;
      allStories.append(allStoriesList);
    });
    storyTitle.innerHTML = data[0].storyName;
  })
  .catch((err) => console.log(err));
