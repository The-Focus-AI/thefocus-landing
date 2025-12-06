---
title: Using repomix to give llm full context
section:
  - coding
date: 2025-09-08
tech:
  - context
  - repomix
published: true
related:
  - extracting-requirements
  - understanding-a-codebase
  - repomix
image: repomix.png
description: How to use repomix to package your entire codebase into a single file for LLM context, with tips for managing token counts and mise integration.
duration: 5 min
---
Lets revisit what we can do with [repomix](repomix.md).

Inside of a project:

```bash
npx repomix --init
```


[repomix](https://repomix.com/) is a great tool that you can use to tell an LLM about all of the context of your project.

You can run it like this

```
npx repomix
```

And it will create a `repomix-output.txt` file that you can send to a LLM.   You can drag the file over, or paste it in:  (works best with claude)

```
cat repomix-output.txt | pbcopy
```

You can also pass this into a local llm, like

```
cat repomix-output.txt | ollama run gemma3:12b "Tell me what you think about all of this"
```

Check out more [understanding-a-codebase](understanding-a-codebase.md)
## Tips

When you run `repomix` it shows you how many tokens the files use.

```
✔ Packing completed successfully!

📈 Top 5 Files by Character Count and Token Count:
──────────────────────────────────────────────────
1.  warc-viewer.py (19,802 chars, 4,023 tokens)
2.  tests/test_app.py (14,737 chars, 3,165 tokens)
3.  src/warc_viewer/app.py (14,513 chars, 2,859 tokens)
4.  src/warc_viewer/cdx.py (13,997 chars, 2,672 tokens)
5.  tests/test_db.py (13,766 chars, 3,141 tokens)

🔎 Security Check:
──────────────────
✔ No suspicious files detected.

📊 Pack Summary:
────────────────
  Total Files: 31 files
  Total Chars: 160,627 chars
 Total Tokens: 35,819 tokens
       Output: repomix-output.txt
     Security: ✔ No suspicious files detected

🎉 All Done!
Your repository has been successfully packed.

💡 Repomix is now available in your browser
```

Depending upon what's in there, you can set up `--ignore`:

```
npx repomix --ignore "**/*.json,**/*.ipynb,**/*.mdx"
```

I have a bunch of `mise` tasks that depends on `llm-dump` which I define both in `.config/mise/config.toml` but then override in specific projects as needed.

```
[tasks.llm-dump]
description = 'Runs repomix'
run = ['repomix --ignore "output*,**/*.log,tmp/,inputs/**/*md,data_integrity/**/*.json"']
```