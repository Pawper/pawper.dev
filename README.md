# Pawper.dev - My portfolio site!

A portfolio site is essential for any developer seeking opportunities, but to stand out I knew I had to do something above and beyond. So, I went at it with a couple goals:
1. Keep it simple. There's no reason for a backend/SSR for this. Single page works fine.
2. Generate the projects section dynamically and include project info.

## Templating & Processing
When I started redoing this portfolio site, I had used [Webpack](https://webpack.js.org/) before for a few different projects. I knew it would work for what I wanted to accomplish. I had also used [EJS](https://ejs.co/) for templating with Express. I know that when I get into Svelte I will probably move away from EJS, but my experiences thus far with EJS have been solid.

While Wepback has some capability for processing EJS, but I couldn't get it to work the way I wanted. So, I went ahead and used the NPM package for EJS, which works great. I have [JavaScript](https://github.com/Pawper/pawper.dev/blob/636e50df278275eeedf8e28fdcd87350bd152ad3/scripts/generateHtml.cjs#L7-L15) ran by Node to pass my portfolio projects' data to EJS then create the HTML, which Webpack will process separately (I'm sure there's a way for Webpack to do all this via a plugin, I just didn't take the time to research further).

As you can probably tell, I wouldn't normally classify Webpack as a great developer experience. Configuring it has what I would consider a significant learning curve. I'm very grateful for all the notes I took while learning. Nevertheless, Webpack is awesome for its plugins, loaders and dev server - the very things that make it challenging to configure. In the end having Webpack process SCSS, including while the live dev server was running (yay code injection!), made for a great developer experience.

## Dynamic Projects
I decided early on that I didn't want to have to update this site's repository every time I created or updated a portfolio project. I used Github, which has an API that can be accessed through the Octokit npm package. As a note, it's strongly suggested that folks using the API do so with authentication via an access token. So, I set up an environmental variable in a `.env` file.

There needed to be some way to identify my portfolio projects apart from my other repositories, so I added `portfolio-project` as a topic to each project. Then it's just a matter of [getting the data with JavaScript](https://github.com/Pawper/pawper.dev/blob/636e50df278275eeedf8e28fdcd87350bd152ad3/scripts/modules/GetPortfolioData.cjs#L10-L17).

This repository data is a great start, but I wanted the languages and other topics as well. For the languages, I wanted the associated colors too (the colors used in the language breakdown on repository pages). Fortunately there is a convenient repo for that. 

(more info coming soon)