const { App } = require('@octokit/app')
const { Octokit } = require('@octokit/rest')
const { createAppAuth } = require('@octokit/auth-app')

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
    console.log(event)
    // await createBranchIfNotExist('libscie', 'ez-github-contributor', 'test', 'main');
    // await createCommitAndPullRequest('libscie', 'ez-github-contributor', 'PR Title', 'test', 'main', 'Description of the PR', 'test.md', 'Commit message', 'testdfadsfsa');
    // add 200 response

    return {
        statusCode: '200',
        body: 'Completed the request',
    }
}
