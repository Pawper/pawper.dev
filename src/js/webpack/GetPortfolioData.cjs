const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB
})
const { getProjectImage } = require('./GetProjectImage.cjs');
const { deleteImages } = require('./Cloudinary.cjs');

exports.getPortfolioData = async function () {
    try {
        let results = await octokit.rest.search.repos({ q: 'user:pawper+topic:portfolio-project' });
        let projects = results.data.items.map(repo => ({
            name: repo.name,
            githubURL: repo.html_url,
            description: repo.description,
            topics: repo.topics,
            webURL: repo.homepage
        }));
        deleteImages();
        await Promise.all(projects.map(async (project, index) => {
            let languages = await octokit.rest.repos.listLanguages({
                owner: 'Pawper',
                repo: project.name
            });
            project.languages = languages.data;
            let image = await getProjectImage(project.webURL, project.name);
            project.image = image;
            projects[index] = project
        }, undefined));
        return projects
    } catch (e) {
        console.log(e);
    }
}