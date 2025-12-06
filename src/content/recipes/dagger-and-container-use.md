---
title: Dagger and Container Use
section:
  - coding
date: 2025-07-08
image: dagger.png
published: true
tech:
  - context
description: Unlock the power of isolated development with Dagger and Container Use—no more worrying about missing dependencies or system conflicts.
duration: 15 min
related:
---
**Container Use** lets each of your coding agents have their own containerized environment. Go from babysitting one agent at a time to enabling multiple agents to work safely and independently with your preferred stack.
## Install

Lets check out [dagger](https://github.com/dagger/dagger) and [container-use](https://github.com/dagger/container-use?tab=readme-ov-file)


```shell
brew install dagger/tap/dagger
brew install dagger/tap/container-use
```

## Setup the environment

```shell
mkdir myrepo
git init myrepo
```

Now lets use containers!

```shell
# Add Container Use MCP server
cd /path/to/repository
claude mcp add container-use -- cu stdio

# Add agent rules (optional)
curl https://raw.githubusercontent.com/dagger/container-use/main/rules/agent.md >> CLAUDE.md
```

Then start up claude, and ask it to do something

>  make an awesome looking markdown to html converter using zig

And then it starts up its own development container:

![](../assets/Screenshot%202025-07-01%20at%2018.26.40.png)

This creates an isolated environment to build stuff.  Why?  I said to use zig, but I don't have zig on my system.  But it goes and setups the environment thats needed.

```shell
$ which zig
zig not found
```

Go to another terminal, and then start up another claude, and give it another task.  You can then see them both running in their own environments:


```shell
cu list
ID                TITLE                           CREATED        UPDATED
uncommon-chamois  Zig Hacker News Scraper         7 seconds ago  7 seconds ago
brief-calf        Zig Markdown to HTML Converter  5 minutes ago  19 seconds ago
```

So we have 2 isolated environments, with everything that they need to do their job, working independently without messing up the host environment.
## See what happened

```shell
$ cu checkout uncommon-cham?ois
Switched to branch 'cu-uncommon-chamois'
lsq
CLAUDE.md		hn_scraper.zig		hn_top_stories_20270.md
```

```shell
$ cu checkout brief-calf
Switched to branch 'cu-brief-calf'
ls
build.zig			final_output.html		output.html
built_output.html		markdown_converter_final.zig	README.md
CLAUDE.md			markdown_converter_fixed.zig
example.md			markdown_converter.zig
```
```
## Dagger

Launch it with

```shell
dagger
```

Start up an alpine container:

```shell
container | from alpine | terminal
```

That's cool.

