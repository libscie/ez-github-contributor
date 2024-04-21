const { App } = require('@octokit/app');
const { Octokit } = require('@octokit/rest');
const { createAppAuth } = require('@octokit/auth-app');

const APP_ID = process.env.APP_ID; // Set your GitHub App's ID
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Your GitHub App's private key
const INSTALLATION_ID = process.env.INSTALLATION_ID; // Installation ID for the repository

async function createIssue(owner, repo, title, body) {
    const auth = createAppAuth({
        appId: APP_ID,
        privateKey: PRIVATE_KEY,
        installationId: INSTALLATION_ID,
    });

    const installationAccessToken = await auth({ type: "installation" });

    const octokit = new Octokit({
        auth: installationAccessToken.token,
    });

    try {
        const { data } = await octokit.issues.create({
            owner,
            repo,
            title,
            body
        });
        console.log("Issue Created: ", data.html_url);
    } catch (error) {
        console.error("Error: ", error);
    }
}

exports.handler = async function(event, context) {
    await createIssue('libscie', 'ez-github-contributor', 'Issue Title', 'Description of the issue');
    // add 200 response

    return {
        statusCode: "200",
        body: "Completed the request",
    };
}