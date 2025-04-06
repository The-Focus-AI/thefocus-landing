---
title: Make it run tests
date: 2025-03-29
section:
  - analysis
  - coding
tech:
  - prompts
related:
  - product-ideation
---
The key to making magenta coating working is ultimately zooming in and having it make targeted changes.

It works sometimes with these grand sweeping things, but more often than not it gets a little bit confused. So it's helpful to have it write modular and testable code.

If you get the test right, then you tell it to keep iterating on the code until the test pass.

If you get the code right, then you keep iterating on the tests in order to get the test passed.

But this gives you a feedback loop that it can use to understand how well it's doing, and it can stay focused.

Ask it to first write tests, and then run them every time after to make it work

## Always TDD

If you don't have tests, first thing you should do is to say

```
Extract the code into modules and write tests for them.  Make sure you run the tests after every change.
```

