import * as core from '@actions/core'
import * as github from '@actions/github'
import * as verify from './verify'

const strictKey = 'strict'
const usersKey = 'users'
const tokenKey = 'token'

const token = core.getInput(tokenKey)
const octokit = new github.GitHub(token)
const username = github.context.actor
let owner = github.context.repo.owner
let verified = false
function run(): void {
  try {
    const strict = Boolean(core.getInput(strictKey))
    if (!strict) {
      core.info('Checking repo ownership against author')
      verified = verify.verifyOwner(username)
    }
    if (!verified || strict) {
      core.info(
        `Verifying that username (${username}) is approved for running builds`
      )
      const usernames = core.getInput(usersKey).trim()
      core.debug(usernames)
      verified = verify.verifyUser(username, usernames)
    }
    if (!verified) {
      core.setFailed(
        `User ${username} is not approved to execute builds on this pipeline`
      )
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
