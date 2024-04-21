const { Octokit } = require('@octokit/rest')
const { createAppAuth } = require('@octokit/auth-app')
const kebabcase = require('@stdlib/string-kebabcase')

const APP_ID = process.env.APP_ID // Set your GitHub App's ID
const PRIVATE_KEY = process.env.PRIVATE_KEY // Your GitHub App's private key
const INSTALLATION_ID = process.env.INSTALLATION_ID // Installation ID for the repository

async function listRepos() {
  const auth = createAppAuth({
    appId: APP_ID,
    privateKey: PRIVATE_KEY,
    installationId: INSTALLATION_ID,
  })

  const installationAccessToken = await auth({ type: 'installation' })

  const octokit = new Octokit({
    auth: installationAccessToken.token,
  })

  try {
    const { data } = await octokit.apps.listReposAccessibleToInstallation()
    return data.repositories.map((repo) => {
      return {
        handle: repo.owner.login,
        repo: repo.name,
        description: repo.description,
        avatar: repo.owner.avatar_url,
      }
    })
  } catch (error) {
    console.error('Error: ', error)
  }
}

exports.handler = async function (event, context) {
  // if (event.httpMethod !== 'POST') {
  //   throw new Error('Invalid request method, expected POST')
  // }

  return {
    statusCode: '200',
    body: JSON.stringify(await listRepos()),
  }
}
