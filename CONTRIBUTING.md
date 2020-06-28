# Contributing to the repo
## Setup
### Prerequisites

- Windows, macOS, or Linux
- Python 3.7 or later
- Visual Studio Code

### VS Code extensions
The recommended extensions have been defined in `extensions.json`. If you are missing one or several extensions, VS Code will inform you with a popup when you start VS Code.


## Pull request - Semantic commit messages
When the pull request is approved, use the default merge option (merge without fast-forwarding) to merge into `master`. We are writing commits in pull requests using semantic commit messages as described in this [article](https://nitayneeman.com/posts/understanding-semantic-commit-messages-using-git-and-angular/). The idea behind semantic commit messages is to give them a structure so that they are easier to read by both contributors as well as scripts. This allows to extract the tags/type of change and automatically generate a changelog.

**Commit message schema**
```text
<type>: <header>
<empty line>
<body - optional parapgraph with more detailed information, introducing the motivation
behind the change in one or several lines>
<empty line>
<footer - optional pull request and/or related issue numbers prefixed by "Closes">
```

**Example**
```text
feature: Add functions to clean yield curves

Clean yield curves so that they can be used in a nice format. This includes reading
data from excel into pandas dataframe, cleaning the dataframe and unpivoting.

Closes #3, closes #5
```

**Types**
The types used as header prefix represent the kind of change, here is a list of ones we use:

    🔨 build: Add or change build scripts, configurations or tools and package dependencies
    🧾 docs: Updating documentation
    ✨ feature: Adding new features
    🐛 fix: Fixing bugs
    ⚡️ perf: Optimize performance of the application
    ♻️ refactor: Rewrite code without changing functionality such as simplifications and renamings
    🎨 style: Codebase styling such as indentations, semi-colons, quotes, trailing commas and so on
    🧪 test: Writing unit tests or refactoring existing tests


## Documentation
### Code comments: To do & info tags
The TODO Tree as well as the Github extension provide support for certain keywords, such as `TODO` and `INFO`.
- When writing comments prefix the comment with TODO, followed by your Github username
  ```ts
  // TODO@simicd: This section requires a follow-up.
  ```
  Not only will all comments be highlighted and referenced in TODO Tree but also activate a Github extension feature. When writing comments using the keyword, the Github VS Code extension will display a lightbulb 💡 next to the comment. By clicking on the lightbulb, you can create a Github issue [directly from VS Code](https://code.visualstudio.com/docs/editor/github#_issues).
- Supported keywords are: `TODO`, `FIXME`, `BUG`, `ISSUE` and `INFO`
- Existing Github issues are referenced with `#` - the Github extension will suggest existing issue IDs with their descriptions.
- Users are referenced with @ - also here, the Github extension will suggest the user names who contributed to the current repo.

### Code documentation with Sphinx
Sphinx automatically generates the documentation in the `docs/build` folder.
- Create module structure as .rst file (required when there are new .py modules): `sphinx-apidoc -o docs/source/ flow flow/tests/* --force --separate --no-headings`. Options:
    - `-o <target> <package> <exclude>` define where to write the documentation source files
    - `--force` overwrite old files
    - `--separate` create a file for each module
    - `--no-headings` use module-level docstrings instead of default titles (module name)
- Create website based on .rst files in source folder: `sphinx-build -b html docs/source docs/build`


### Google style docstrings

In order to have aligned documentation across the whole package, we use google style docstrings.  A detailed recommendation can be found here:

[Detailed recommendation](https://github.com/google/styleguide/blob/gh-pages/pyguide.md)


## Develop Azure Functions
### Installation
To develop and test Azure Functions locally, two conditions have to be met:
- Install `npm i -g azure-functions-core-tools@3 --unsafe-perm true` to get the Azure Functions CLI globally (`-g`)
- Install `pip install azure-functions` if developing Python functions
- Optional: Install (Azure CLI)[https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest] for publishing the package to Azure. In this project the Github Action takes care of this step.

Installation can be validated with `func --version` which should return the current version of the CLI.

See also [Microsoft Docs - Configure your local environment](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function-azure-cli?tabs=bash%2Cbrowser&pivots=programming-language-python)

### First time setup
When running Azure Functions the very first time, make sure you go to the project folder where the functions project resides (i.e. `./azure-functions` folder in flow-spark) and run `func init`. Thereafter select Python. This is required to register the locally installed Python version with Azure Functions.


### Start local server
In order to start the Azure Functions server locally, run
```powershell
# Change to functions package folder
cd azure-functions

# Start server with default environment...
func start
# ... or run with temporary environment variable set (bash)
FLOW_BACKEND="pandas" func start
```

A more convenient way to start the Azure Functions server is to use VS Code built-in task runner. With `CTRL + Shift + P` and then `Tasks: Run Task` you can select the task called `Azure Functions: Run local server`. It has been configured so that the server will be started automatically from the `./azure-function` folder/package.

```json
// .vscode/tasks.json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Azure Functions: Run local server",
            "detail": "Start Azure Functions server from the corresponding subfolder using the CLI.",
            "type": "shell",
            "options": {
                "cwd": "${workspaceFolder}/azure-functions",
                "env": { "FLOW_BACKEND": "pandas" }
            },
            "command": "func start",
            "problemMatcher": []
        }
    ]
}
```


<br />
<br />
<br />

----

**Sources**
- [Semantic commit messages](https://nitayneeman.com/posts/understanding-semantic-commit-messages-using-git-and-angular/)

**Inspiration**
- [VS Code Contribution Guide](https://github.com/microsoft/vscode-python/blob/master/CONTRIBUTING.md)
- [Atom Contribution Guide](https://github.com/atom/atom/blob/master/CONTRIBUTING.md)