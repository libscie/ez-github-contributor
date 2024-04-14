const { App } = require('@octokit/app');
const { Octokit } = require('@octokit/rest');

const APP_ID = process.env.APP_ID; // Set your GitHub App's ID
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Your GitHub App's private key
const INSTALLATION_ID = process.env.INSTALLATION_ID; // Installation ID for the repository

const app = new App({ id: APP_ID, privateKey: PRIVATE_KEY });
const octokit = new Octokit({auth: {
    appId: APP_ID,
    privateKey: PRIVATE_KEY,
    installationId: INSTALLATION_ID,
  },});

async function createPullRequest(owner, repo, title, head, base, body) {
    const installationAccessToken = await app.getInstallationAccessToken({ installationId: INSTALLATION_ID });
    octokit.authenticate({
        type: 'app',
        token: installationAccessToken
    });

    try {
        const { data } = await octokit.pulls.create({
            owner,
            repo,
            title,
            head,
            base,
            body
        });
        console.log("Pull Request Created: ", data.html_url);
    } catch (error) {
        console.error("Error creating Pull Request: ", error);
    }
}

exports.handler = async function(event, context) {
    await createPullRequest('libscie', 'mizzimig', 'PR Title', 'branch-name', 'main', 'Description of the PR');
    // if (event.httpMethod !== 'POST') {
    //   return {
    //     statusCode: 405,
    //     body: JSON.stringify({ message: "Method Not Allowed" }),
    //     headers: { 'Allow': 'POST' }
    //   };
    // }
  
    const data = JSON.parse(event.body);
    const name = data.name || 'World';
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${name}!` })
    };
  };
  