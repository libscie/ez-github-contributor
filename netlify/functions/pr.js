const { Octokit } = require('@octokit/rest')
const { createAppAuth } = require('@octokit/auth-app')
const kebabcase = require('@stdlib/string-kebabcase')

const APP_ID = process.env.APP_ID // Set your GitHub App's ID
const PRIVATE_KEY = process.env.PRIVATE_KEY // Your GitHub App's private key
const INSTALLATION_ID = process.env.INSTALLATION_ID // Installation ID for the repository

async function createCommitAndPullRequest(
  owner,
  repo,
  title,
  head,
  base,
  body,
  path,
  message,
  content
) {
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
    // Get the reference to the head branch
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${head}`,
    })

    // Get the commit that the head branch is pointing to
    const { data: commitData } = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: refData.object.sha,
    })

    // Create a blob with the new file content
    const { data: blobData } = await octokit.git.createBlob({
      owner,
      repo,
      content,
      encoding: 'utf-8',
    })

    // Create a new tree with the new file
    const { data: treeData } = await octokit.git.createTree({
      owner,
      repo,
      base_tree: commitData.tree.sha,
      tree: [
        {
          path,
          mode: '100644',
          type: 'blob',
          sha: blobData.sha,
        },
      ],
    })

    // Create a new commit
    const { data: newCommitData } = await octokit.git.createCommit({
      owner,
      repo,
      message,
      tree: treeData.sha,
      parents: [commitData.sha],
    })

    // Update the reference to point to the new commit
    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${head}`,
      sha: newCommitData.sha,
    })

    // Create the pull request
    const { data } = await octokit.pulls.create({
      owner,
      repo,
      title,
      head,
      base,
      body,
    })
    console.log('Pull Request Created: ', data.html_url)

    return data
  } catch (error) {
    console.error('Error: ', error)
  }
}

async function createBranchIfNotExist(owner, repo, branch, base) {
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
    await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`,
    })
  } catch (error) {
    if (error.status === 404) {
      // The branch does not exist, create it
      const { data: baseRefData } = await octokit.git.getRef({
        owner,
        repo,
        ref: `heads/${base}`,
      })

      await octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branch}`,
        sha: baseRefData.object.sha,
      })
    } else {
      throw error
    }
  }
}

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    throw new Error('Invalid request method, expected POST')
  }

  const params = JSON.parse(event.body)
  const branch = `ez-github-contributor-${Date.now()}`
  await createBranchIfNotExist(
    'libscie',
    'ez-github-contributor',
    branch,
    'main'
  )
  const res = await createCommitAndPullRequest(
    'libscie',
    'ez-github-contributor',
    params.title,
    branch,
    'main',
    `New submission: "${params.title}" 
    
This submission was made for your consideration through the [Easy GitHub Contributor](https://ez-github-contributor.netlify.app/) web app. 

${params.contact ? `The author left their contact info for follow up: ${params.contact}` : 'The author did not leave their contact info.'}`,
    `${kebabcase(params.title)}.md`,
    `Add ${kebabcase(params.title)}.md`,
    params.body
  )

  return {
    statusCode: '200',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(res)
  }
}
