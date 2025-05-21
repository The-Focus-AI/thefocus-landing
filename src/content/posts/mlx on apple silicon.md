---
title: mlx on apple silicon
date:
  "{ date }": 
tags:
  - daily
---

[llm-mlx](https://simonwillison.net/2025/Feb/15/llm-mlx/)

```shell
llm install llm-mlx
```

We can then download a model

```shell
llm mlx download-model mlx-community/gemma-3-12b-it-4bit
```

# mlx-vlm

```shell
uv tool install mlx-vlm
```

```shell
mlx_vlm.generate --model mlx-community/Qwen3-8B-3bit --max-tokens 100 --temperature 0.0 --prompt "who was the monster in frankenstien"
```

Or image:

```shell
mlx_vlm.generate --model mlx-community/Qwen2-VL-2B-Instruct-4bit --max-tokens 100 --temperature 0.0 --image http://images.cocodataset.org/val2017/000000039769.jpg
```

# mlx-llm

```shell
uv tool install mlx
uv tool install mlx-lm
```


# Performance

```shell
time llm -m mlx-community/gemma-3-12b-it-4bit 'Python code to traverse a tree'  
9.28s user 4.14s system 56% cpu 23.793 total
```

```shell
ollama run gemma3:12b "Python code to traverse a tree"  
0.12s user 0.14s system 0% cpu 32.980 total
```


```shell
llm -m mlx-community/gemma-3-12b-it-4bit -a audio.mp3 --schema-multi  'timestamp str: mm:ss,ad bool, speaker, text, tone: the conversation tone'
```
