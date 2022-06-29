# Contributing Guide

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with GitLab

We use GitLab to host code, to track issues and feature requests, as well as accept pull requests.

## Report bugs using GitLab's [issues](https://docs.gitlab.com/ee/user/project/issues/index.html)

We use GitLab issues to track public bugs. Report a bug by opening a new issue, it's that easy!

### Reporting Issues

- The issue list of this repo is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately.

- Try to search for your issue, it may have been answered.

- See if the error is reproducible with the latest version.

- If reproducible, please provide a [simple codepen](https://codepen.io/) or repository that can be cloned to produce the expected behavior. It is preferred that you create an initial commit with no changes first, then another one that will cause the issue.

### Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background

- Steps to reproduce

  - Be specific!
  - Give sample code and even screenshots if you can

- What you expected would happen

- What actually happens

- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People _love_ thorough bug reports. We are not even kidding.

## We Use [GitLab Flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html), So All Code Changes Happen Through Pull Requests

Pull requests are the best way to propose changes to the codebase (we use [GitLab Flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html)). We actively welcome your pull requests:

1.  Fork the repo and create your branch from `master`.
    We defined the following prefixes for branch name convention:

```
# feature/----
# fix/----
# refactor/----
```

2.  If you've added code that should be tested, add tests.

3.  If you've changed APIs, update the documentation.

4.  If you are adding a dependency, please use `yarn add`. The `yarn.lock` file is our source of truth for all dependencies.

5.  Ensure the test suite passes.

6.  Make sure your code lints.

7.  Issue that pull request!

### Pull Requests

- Bug fixes should be submitted to the `master` branch.

- New features and breaking changes should be submitted to the `dev` branch.

- Use a descriptive title no more than 64 characters long. This will be used as the commit message when your PR is merged.

- For changes and feature requests, please include an example of what you are trying to solve and an example of the markup. It is preferred that you create an issue first however, as that will allow the team to review your proposal before you start.

- Please reference the issue # that the PR resolves, something like `Fixes #1234` or `Resolves #6458` (See [closing issues using keywords](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html))

### Use a Consistent Coding Style

- 2 spaces for indentation rather than tabs, please use the defined settings in the project.
- You can try running `yarn lint` for style unification

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.
