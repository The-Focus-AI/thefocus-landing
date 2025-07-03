---
title: Technical Debt and the ROI Threshold
date: 2025-07-03
tags:
  - essay
image: loom_wide.png
description: With agents now able to read and refactor code, the future cost of messy code -- and the current costs of unwritten code -- is shrinking.  Code is more disposable and experimentation more rewarding.
published: true
---
Code is easier now, which has some interesting properties to how and what we thinking about working on.

For example: owning something is to maintain it and maintenance has costs.

## Technical debt

Code can have comments, parts of the human readable document that the compiler ignores, meant to help a future developer figure out what's going on.

> Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.
> -- [The Internet Sometime](https://stackoverflow.com/questions/876089/who-wrote-this-programing-saying-always-code-as-if-the-guy-who-ends-up-maintai)

In business-speak, the concept of  "code that is expensive to maintain" is abstracted into the idea of "technical debt":

>  **technical debt** (also known as **design debt**[[1]](https://en.wikipedia.org/wiki/Technical_debt#cite_note-Girish_2014-1) or **code debt**) refers to the implied cost of additional work in the future resulting from choosing an expedient solution over a more robust one.
>  -- [Wikipedia: Technical Debt](https://en.wikipedia.org/wiki/Technical_debt)

Both of these ideas are based on the idea that we should be doing additional and -- strictly speaking -- *unnecessary* work now because it will make our life easier in the future.

*Because future you will thank you*
![](../assets/u3555521113_a_black_and_white_motivational_poster_than_says_l_86192764-57f5-4d25-b2ea-25847496dff7_1.png)*a black and white motivational poster than says "lets make better mistakes tomorrow"*
## Return on Investment

The return on the investment calculations also work the other way.  Things that once were not worth the effort of doing may now be worth it, because the effort is less.  We end up exploring and playing with more ideas because its easier to do.  Maybe I wouldn't dedicate a week on a wacky, long shot idea but if I can spend a few hours babysitting an agent, why not?

The cost of maintaining code has become cheaper.  So our estimated of the future cost of the mess we make now need to get adjusted.  And our calculations of Return on Investment -- should we even tackle the project at all -- need to get adjsuted.

Now we have agents that understand and write code for us.  Somethings remain hard: building something people want, understand requirements, keeping things organized.  But reading code and making changes are getting way cheaper.

![](../assets/u3555521113_an_reniecance_leonardo_style_notebook_page_full_o_bae5702e-2b03-48f0-ac7d-6e3b827ab204_2.png)*an renaissance, leonardo style notebook page full of sketches of interesting inventions*
## Costs going to zero

And for somethings we just have magic.  The computers simply do much more than they used to.

Rather than writing a script to updating something, I [left instructions in the comments](https://willschenk.com/howto/2025/how_to_turn_aerospace_into_an_application_launcher/) for how the next agent would edit something.

And with MCP, maybe we've actually [accidently made a universal plugin system?](https://worksonmymachine.substack.com/p/mcp-an-accidentally-universal-plugin) Getting things to "talk to one another" suddenly becomes... talking with one another?


## Take away

The growing ability for these agents to understand code means the cost of maintaining and producing functionality will go down.  The code itself is being disposable.  When the cost of making something goes down, there's going to be a lot more of it, and it releases a break that has been slowing things down.

