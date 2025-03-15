---
title: Identifying issues in code
date: 2025-03-14
section:
  - coding
tech:
  - prompts
---

```
Assess code quality and suggest improvements:
1. Review naming conventions
2. Check code organization
3. Evaluate error handling
4. Review commenting practices

Provide specific examples of good and problematic patterns.
```

**Usage:**

```
[tasks.llm-lint]
description = 'What does the model think about this'
run = [ """
cat repomix-output.txt | llm -m claude-3.7-sonnet 'Assess code quality and suggest improvements:
1. Review naming conventions
2. Check code organization
3. Evaluate error handling
4. Review commenting practices

Provide specific examples of good and problematic patterns.'
"""]
depends = [ 'llm-dump' ]
```

