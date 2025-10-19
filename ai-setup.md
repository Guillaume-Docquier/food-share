# AI Tools Setup

This document describes the steps taken to set up AI development tools for the food-share project.

## CodeRabbit Setup

1. **Made Repository Public**
   - Changed the food-share repository visibility to public
   - This enabled:
     - GitHub branch protection via branch rulesets
     - Free access to CodeRabbit

2. **Connected CodeRabbit to GitHub**
   - Visited the CodeRabbit website
   - Connected the CodeRabbit service to the GitHub account
   - Configured repository access

3. **CodeRabbit CLI Attempt**
   - Attempted to install the CodeRabbit CLI in Git Bash on Windows
   - **Result**: Installation failed - Git Bash is not a supported environment
   - **Reason**: CodeRabbit CLI requires either WSL or PowerShell 7 on Windows

## GitHub Copilot Setup

1. **Activated GitHub Copilot Pro Subscription**
   - Subscribed to GitHub Copilot Pro plan

2. **Installed Copilot CLI**
   - Installed the GitHub Copilot CLI tool

3. **Authentication Setup**
   - Created a Personal Access Token (PAT) in GitHub
   - Loaded the PAT into the `GH_TOKEN` environment variable
   - Logged in to GitHub through the Copilot CLI using the token

## Windows Environment Challenges

### CLI Compatibility Issues
During setup, discovered that both CodeRabbit CLI and GitHub Copilot CLI don't work on Windows unless running in:
- WSL (Windows Subsystem for Linux), or
- PowerShell 7

Git Bash is not sufficient for these modern CLI tools.

### WSL Evaluation
- Began setting up WSL as a potential solution
- Realized WSL introduces significant complexity and overhead for development workflows
- WSL felt like going down a rabbit hole with many configuration considerations
- Decided to explore simpler alternatives

### PowerShell 7 Solution
- Chose to install PowerShell 7 instead of committing to WSL
- PowerShell 7 provides:
  - Better integration with Windows environment
  - Support for modern CLI tools
  - Less complexity than WSL
- Currently evaluating how well this approach works for daily development

## Summary

Both AI tools are now configured and ready to use:
- **CodeRabbit**: Active for automated code reviews on pull requests
- **GitHub Copilot CLI**: Authenticated and available for command-line assistance

### Current Status
- ✅ Repository is public with branch protection enabled
- ✅ CodeRabbit connected and active
- ✅ GitHub Copilot Pro subscription active
- ✅ Copilot CLI installed and authenticated
- 🔄 PowerShell 7 installed and being evaluated as primary development shell
