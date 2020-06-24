import * as github from '@actions/github'
import * as core from '@actions/core'

export function verifyUser(username: string, input: string): boolean {
  const listOfUsernames = input.split(',')
  return listOfUsernames.includes(username)
}

export function verifyOwner(username: string): boolean {
  const owner = github.context.repo.owner
  core.debug(`Owner: ${owner}`)
  return owner === username
}

export function verifyRepoAccess(username: string): boolean {
  const repo = github.context.repo

}
