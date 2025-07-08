---
title: Dagger
date: 2025-06-08
tags:
  - daily
---

```shell
brew install dagger/tap/dagger
```

We can create a `.env` file that gives us access to models.

Then grab an API key and put it in `.env`

```bash
GEMINI_API_KEY=op://Development/Google Ai Studio Key/notesPlain
GEMINI_MODEL=gemini-2.5-pro
```

Then `dagger login` -- this will give you access to the logs, which makes things easier.

Launch it with

```shell
dagger
```

Go to prompt mode by pressing `>` and ask it about itself.  You can see that the system is working and that you have `gemini-2.5-pro` as your model.

## Input mode

Press `i` to go back to input mode. Lets pull in a repo and mount it.

```
source=$(container | from node | with-mounted-directory /src https://github.com/modelcontextprotocol/ruby-sdk | with-workdir /src)
```


```

You have a container with source code in /src. Describe the source code.

Does the application have unit tests?

Find all the unit tests. Deduce what the application does. Describe it in one paragraph.
```

# Tracing