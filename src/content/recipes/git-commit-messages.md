---
title: Write git-commit-messages
section:
  - coding
date: 2025-03-15
tech:
  - prompts
published: true
description: Learn how to automate Git commit message generation with this simple but powerful prompt for Claude. The template enforces conventional commit format with appropriate type prefixes and detailed descriptions, making your repository history more professional and useful.
duration: 10 min
image: git-commit-messages.png
related:
  - making-meta-data
---
I have a quick prompt that looks at all of the changes staged in Git and writes a commit message based upon that. It's got a title with a little type to it and a little paragraph descriptions of what's going on.

I run at something like this.

```
git diff HEAD | llm -m claude-3.7-sonnet "$(cat $HOME/prompts/git-commit-message)
```

Or as a mise task like so:

```
[tasks.commit-message]
description = 'Writes a commit message'
run = [ 'git diff HEAD | llm -m claude-3.7-sonnet "$(cat $HOME/prompts/git-commit-message)"' ]
```

## prompt

I'm sure this could be improved upon, but I literally just copied and pasted it from Google search results asking about different ways to format git commits.

```
Write a commit message based upon the diffs of the code.

Each commit has a type, with a short sentence describing 
what it is.  There's a longer paragraph afterwards 
describing the change

feat: Introduces a new feature (correlates with MINOR in semantic versioning).
fix: Patches a bug (correlates with PATCH in semantic versioning).
docs: Documentation changes (e.g., updates to README or other markdown files).
style: Changes that do not affect the meaning of the code (white-space, formatting, etc.).
refactor: A code change that neither fixes a bug nor adds a feature.
perf: Improves performance.
test: Adds missing tests or corrects existing tests.
chore: Changes that do not relate to a fix or feature and don't modify src or test files (e.g., updating dependencies).
build: Changes that affect the build system or external dependencies
ci: Continuous integration related changes
revert: Reverts a previous commit

# Examples

feat: Add new user profile feature
fix(parser): Fix issue with parsing dates
docs: Update README with installation instructions
style: Remove unnecessary whitespace
refactor: Improve code readability
perf: Optimize image loading
test: Add unit tests for new feature
chore: Update dependencies
```
