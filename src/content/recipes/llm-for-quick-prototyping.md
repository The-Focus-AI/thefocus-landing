---
title: Use the llm cli for quick prototyping
section:
  - user-experience
  - analysis
date: 2025-04-03
image: llm-for-quick-prototyping.png
published: true
tech:
  - prompts
description: Transform your workflow with a command-line tool that brings AI capabilities directly to your terminal, no complex setup required. See how to parse websites, analyze transcripts, and extract meaningful data using the llm CLI with popular models like Gemini and Claude.
duration: 15 min
---
Installation info on [my other site](https://willschenk.com/labnotes/2025/llm_cli_tool/)

But the short answer is:

```bash
brew install llm

# Paste your OpenAI API key into this
llm keys set openai

llm install llm-gemini
llm keys set gemini

llm install llm-anthropic
llm keys set anthropic
```

Links
- [llm](https://llm.datasette.io/en/stable/setup.html)
- [llm-gemini](https://github.com/simonw/llm-gemini)
- [llm-anthropic](https://github.com/simonw/llm-anthropic)

# HTML + Text

```bash
wget https://thefocus.ai/blog -O blog.html

cat blog.html | \
llm -m gemini-2.5-pro-exp-03-25 \
    --schema-multi 'title, date str: mm:ss,description,topics' \
    parse | \
tee blog.json
```


Or with claude

```bash
wget https://turingpost.com/ -O turingpost.html

cat turingpost.html | \
llm -m claude-3.7-sonnet \
    --schema-multi 'title, link, date str: yyyy/mm/dd,description,topics' \
    parse | tee turingpost2.json
```

Make sense of some real estate data

```bash
wget --user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36" "https://www.redfin.com/NY/Binghamton/3-Brookside-Rd-13903/home/115601261"

cat 115601261 | llm -m gemini-2.5-pro-exp-03-25 "extracts the price history of this property and who the broker was"
```

Or if you want something more structured

```bash
cat 115601261 | \
llm -m gemini-2.5-pro-exp-03-25 \
	--schema-multi 'date: status, broker: broker name of was in the transaction, description: listed/price change/offered/sold etc, price: the price' \
	"figure out the price history for when this property was bought and sold"
```

# Audio

Here's one to get a transcript of an audio file, for example of a pod cast

```bash
wget -O audio.mp3 "https://podtrac.com/pts/redirect.mp3/tracking.swap.fm/track/SxlTEPDY7xDg35RXkASs/traffic.omny.fm/d/clips/e73c998e-6e60-432f-8610-ae210140c5b1/afbd76b8-eff2-442a-b938-b28e0126edad/4c60a33c-1249-4bd6-ae78-b29100f1413d/audio.mp3?utm_source=Podcast&in_playlist=d08826cd-f888-4cd3-b700-b28e0126edbb"

llm -m gemini-2.5-pro-exp-03-25 \
	-a audio.mp3 \
	--schema-multi 'timestamp str: mm:ss,ad bool, speaker, text, tone: the conversation tone' \
	transcript | tee transcript.json
```

# Video

Lets pull down something from youtube
```bash
  brew install yt-dlp
```


Grab something, the smallest something and turn it into an mp4 if it isn't:

```bash
# These flags try to get the smallest filesize
yt-dlp -S +size,+br,+res,+fps \
	-o video.webm \
	"https://www.youtube.com/watch?v=ndvRsQx3xBw"

# Convert it to mp4 if its in some unsupported format
ffmpeg -i video.webm.mkv video.mp4
```

And then lets see what happens:

```bash
llm -m gemini-2.5-pro-exp-03-25 \
	-a video.mp4 \
    --schema-multi 'timestamp: in the format mm:ss,
     text: what was said,
     mood: what was the tone of voice,
     sponsor_section bool: is this section an add or not,
     ' \
    transcript | \
tee video.json
```

which gives us

```bash
sed '1,2d;$d' video.json | jq '.items | length'
```

47 items.  Or we can look at the moods:

```
sed '1,2d;$d' video.json | jq '.items[].mood' | sort | uniq -c | sort -nr
  18 "Analytical"
  15 "Explanatory"
   7 "Informative"
   2 "Conclusive"
   2 "Comparative"
   1 "Reflective"
   1 "Problem-solving"
   1 "Confident"
```

# Schema

This command helps see [how schemas are defined](https://llm.datasette.io/en/stable/schemas.html)
```bash
llm schemas dsl
```

And you can do multi, so:

```bash
llm schemas dsl --multi 'timestamp: in the format mm:ss,
     text: what was said,
     mood: what was the tone of voice,
     sponsor_section bool: is this section an add or not,
     '
```