---
title: Building a chrome extension
date: 2024-11-28
tags:
  - barefoot
published: false
---
I have no idea how to build a chrome extension.  Lets see how to do it.  Oh GPT, can you help me?

## option-space

If you haven't [downloaded the chatgpt desktop app](https://openai.com/chatgpt/download/) I'd recommend doing that now.  The convenience factor makes a huge difference in how to use it.

Once it's installed and you log in, fire it up and press the microphone.  Its cooler just to talk to it right?

## Project structure

>[!note] my first prompt
> I want to build a Chrome extension that takes the text of the page, puts it through OpenAI, and summarizes the results.

That prints out a whole bunch of stuff, including the project structure:

```
/chrome-extension
  /manifest.json
  /popup.html
  /popup.js
  /content.js
  /background.js (optional)
  /styles.css (optional)
```

Lets create a new project and copy those files over.

```
mkdir -p ~/src/remix
cursor ~/src/remix
```

And copy all of the files over.
### Test the extension

1. Open Chrome, go to `chrome://extensions/`.
2. Enable "Developer mode."
3. Click "Load unpacked" and select your project folder.

I get the error that says `Could not load icon 'icon.png' specified in 'action'.` So lets ask gpt to create that icon for us.

> ![note] gpt prompt
> create an image that I can use for the icon

This is cool, I'll download it and save it as `icon.webp` in my folder.  But looking at the manifest, I need to scale this into different sizes.  Lets prompt again.

> ![note] gpt prompt
> can you write a shaper js script that I can use to convert this webp file into a 16x16 called icon.png, 48x48 called icon48.png and a 128x128 icon128.jpg

This writes a `node` script.  Copy it into the directory, install the shaper npm library `npm i shaper` and then run it.

```bash
remix % node resize-icons.js
Successfully created: ./icon.png
Successfully created: ./icon48.png
Successfully created: ./icon128.png
```
Load up the extension and enable it.  It should be working in the extensions menu.

## Set a mark with git

Lets setup a repo and commit all of our files.  It's handy to be able to roll back to a working state, so it's a good habit to take little snapshots like this.

```bash
echo node_modules >> .gitignore
git init
git add .
git commit -m "Initial commit"
```

## Move to cursor

Open up the cursor composer.  `option-command-b`

>![note] cursor prompt
> add a way to setup the settings.  We need a way to enter in an openai api key, and the base url for our server.  When the user activates the popup, if the api key is unset or blank, open up the options page.

This will edit all of your files in place.  You don't need to make sure that the llm has the latest version of the file (perhaps you tweaked something to make it work) and don't need to worry about missing something.

The first times I do this I read through what it does, but honestly after a while I just blindly accept.

Now go back to `chrome://extensions/` and reload your extension.  