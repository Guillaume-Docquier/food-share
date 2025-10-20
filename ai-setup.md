# AI Tools Setup

This document describes the steps taken to set up AI development tools for the food-share project.  
This project is mostly an experimentation project around AI tools since I haven't really used them thus far, so we'll abuse all of them to test their limits.   

## Summary

### Current Status
- ✅ Repository is public with branch protection enabled
- ✅ CodeRabbit connected and active
- ✅ GitHub Copilot Pro subscription active
- ✅ Copilot CLI installed and authenticated
- 🔄 PowerShell 7 installed and being evaluated as primary development shell

## CodeRabbit Setup

CodeRabbit is an AI code review service.  
See their docs to [easily get started](https://docs.coderabbit.ai/getting-started/quickstart).  
They are free for open source projects, so hey, we're open source now.

- Changed the food-share repository visibility to public
- Connected [CodeRabbit to GitHub](https://app.coderabbit.ai/login?free-trial)
- Attempted to install the [CodeRabbit CLI](https://www.coderabbit.ai/cli) in Git Bash on Windows, but it requires WSL, so we didn't install it

I've added the CodeRabbit review as a required status check for PRs against the main branch.

## GitHub Setup

I'll want to have the AI push to GitHub by itself, so I absolutely need to protect the main branch. I'm not THAT crazy.  
I've set up branch protection on the main branch, requiring a pull request.  
Note: rulesets are only available to public repos or on the Team paid plan. Since I made the repo public for CodeRabbit, no problem here.  

## GitHub Copilot Setup

GitHub Copilot will be our AI Agent. It is cheap, integrates easily with GitHub (at least, you'd hope this is easier than with other solutions) and is free for the first 30 days.

- Activated GitHub Copilot [Pro Subscription](https://github.com/features/copilot)
- Installed [Copilot CLI](https://github.com/features/copilot/cli) via `npm install -g @github/copilot`
- Created a Personal Access Token (PAT) in GitHub since I want my AI to read and create issues and pull requests with:
  - Copilot Requests read
  - Issues write
  - Pull Requests write
- Loaded the PAT into the `GH_TOKEN` environment variable for the GitHub MCP server auth
  - The PAT is not stored in the repo, even if gitignored, because I don't trust that the AI won't expose it
- Launched Copilot with `copilot` and Logged in to GitHub through the Copilot CLI with the `/login` command
- Added a ruleset to request a Copilot code review on every PR

## Windows Environment Challenges

### CLI Compatibility Issues
During setup, discovered that both CodeRabbit CLI and GitHub Copilot CLI don't work on Windows in Git bash:
- Copilot CLI needs [PowerShell 6+](https://github.com/github/copilot-cli?tab=readme-ov-file#prerequisites) or WSL
- CodeRabbit CLI needs WSL

### WSL Evaluation
I've never used WSL, and it seems fine.  
However, I'm not equipped to bootstrap myself in Ubuntu since I'd have to reinstall all the tools (git, node, etc) and clone the code.  
Also, I'd have to configure webstorm to work with WSL.  
All these things are possible, and probably very fine, but I was looking for something simpler

### PowerShell 7 Solution
I chose to install PowerShell 7 instead of committing to WSL.  
Just installing PowerShell 7 made the Copilot CLI work, so I stuck with this.  
Too bad for CodeRabbit, I'll rely on their GitHub integration only.  
