const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB
});
const { getProjectImage } = require("./GetProjectImage.cjs");
const { getOldImages, deleteImages } = require("./Cloudinary.cjs");

exports.getPortfolioData = async function () {
  try {
    let results = await octokit.rest.search.repos({ q: "user:pawper+topic:portfolio-project" });

    let projects = results.data.items.map(repo => ({
      name: repo.name,
      githubURL: repo.html_url,
      description: repo.description,
      topics: repo.topics,
      webURL: repo.homepage
    }));

    const { data } = await octokit.rest.repos.getContent({
      mediaType: {
        format: "raw"
      },
      owner: "ozh",
      repo: "github-colors",
      path: "colors.json"
    });
    let languageColors = await JSON.parse(data);

    let oldImagesPublicIds = await getOldImages();
    console.log(oldImagesPublicIds);

    await Promise.all(
      projects.map(async (project, index) => {
        let languages = await octokit.rest.repos.listLanguages({
          owner: "Pawper",
          repo: project.name
        });
        let sumLanguages = Object.values(languages.data).reduce((a, b) => a + b, 0);
        for (const language in languages.data) {
          languageLines = languages.data[language];
          languages.data[language] = new Object();
          languages.data[language]["percent"] = ((languageLines / sumLanguages) * 100).toFixed(2);
          languages.data[language]["color"] = languageColors[language]["color"];
        }
        project.languages = languages.data;

        let topics = await octokit.rest.repos.getAllTopics({
          owner: "Pawper",
          repo: project.name
        });
        topics = topics.data.names.filter(topic => topic !== "portfolio-project");
        project.topics = topics;

        try {
          const { data } = await octokit.rest.repos.getReadme({
            mediaType: {
              format: "html"
            },
            owner: "pawper",
            repo: project.name
          });
          project.readme = data;
        } catch (e) {
          console.log(e);
        }

        let image = await getProjectImage(project.webURL, project.name);
        project.image = image;

        projects[index] = project;
      }, undefined)
    );

    deleteImages(oldImagesPublicIds);
    return projects;
  } catch (e) {
    console.log(e);
  }
};
