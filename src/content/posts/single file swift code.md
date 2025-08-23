---
title: Single file swift mini-apps
date: 2025-08-22
tags:
  - affordance
  - usecase
published: true
image: swift_wide.png
description: swift files can be run directly without compiling and without XCode, making it easy to create native UI elements and access all of macOS's APIs. Once you see Swift as a scripting language rather than just an app language, you start wondering what other capabilities are hiding in plain sight.
---
Did you know that you can run a single `swift` file?  You can *just write a single .swift file and run it*.  Not only can you use it like a shell script and have it create UI elements, but *you can avoid the abomination of Xcode.*

A prompt like this:

> Create a macOS command-line utility in Swift that displays native confirmation dialogs with optional Touch ID authentication and custom icon support. The tool should be a single-file Swift script that integrates with shell scripts and
  returns proper exit codes for automation.

Will get you code like this:

```swift
#!/usr/bin/env swift
import Cocoa
import LocalAuthentication

let context = LAContext()
var error: NSError?

if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
    context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics,
        localizedReason: "Confirm action") { success, _ in
        if success {
            print("Confirmed")
            exit(0)   // success
        } else {
            print("Denied")
            exit(1)   // failure
        }
    }
} else {
    print("No biometrics available")
    exit(1)
}

RunLoop.main.run()
```

Which you can run like this:

```script
$ ./check.swift
```

And it will get you a dialog like this:
![](../assets/Screenshot%202025-08-22%20at%2016.24.51.png)

**No xcode! No compiling!** Once you’re free from that particular gravity well, you start asking: what if Swift wasn’t just for apps, but for little one-off utilities?  That can use the native Mac APis?

I fleshed it this little confirmation dialog prompt a bit more than that. [https://github.com/The-Focus-AI/confirm-osx](https://github.com/The-Focus-AI/confirm-osx), which is nice to call inside say an MCP server when you want to make sure the AI isn't going rampant.
## Filesystem as a Stream

I like little menubar apps.  But I don't want to figure out how to build them.

I download a bunch of PDFs and epuf files that I consult and then ignore/file away in a shared directory.  Lets build a little menubar app that keeps track of the recent ones I've downloaded and opened so I can quickly open them up again,

[I've written about file stream events before](https://willschenk.com/labnotes/2023/watching_a_directory_for_changes/) but it's a pretty interesting primative to build things off of.  Apple's way of doing this is FSEvents.

Get the code: [https://github.com/The-Focus-AI/readbar](https://github.com/The-Focus-AI/readbar)

```bash
$ swift readbar.swift
```

And then you get a little menubar problem that looks for the latest files you've downloaded.

![](../assets/Screenshot%202025-08-23%20at%2007.08.27.png)


The is show me “recent PDFs.” But that’s just a query. The real pattern is: the menubar becomes a router for event streams.  What else could it do?

- Files you touched in the last hour.
- Drafts you edited twice today.
- Anything in your Downloads folder with “invoice” in the name.

And why stop at files? Feeds could come from RSS, build logs, CI alerts, Git hooks. Each source just contributes {title, subtitle, action} items. The menubar isn’t an app, it’s a bus.

And if its a tiny like swift file that you don't even need to compile?  Easy to remix.

---

## Patterns discovered

A few things kept repeating themselves across these experiments:

- **Zero-dependency durability** — These tools import only Apple frameworks. No pip, no npm. Boring? Yes. But in this world of autogen code, it's not like it slows you down.  And it's a single file.

- **From single file to capsule architecture** — Keeping each tool as a single file is liberating. But you can still connect them via our same unix pipe philosophy.  One utility handles titling. Another handles events. You scale by adding modules, not lines.


---

## **The Reframing**


We use bash and Python for our glue code. But on macOS, the glue language is Swift. You just don’t think of it that way because Xcode makes it unbearable.  But this works:

```swift
#!/usr/bin/env swift
import Cocoa
import Foundation
```

And if you don't know swift -- neither do I -- one of the models know it.  Just ask cursor, or ask claude, or any one of the open source local models for that matter.

Why hasn't swift moved into to occupy the niches that these scripting languages had?  It's how you speak natively to your OS.  

And once you see it as a primitive, you start thinking: what else is hiding in plain sight, just one .swift file away?

Now that we have this casual expertise in everything, what else are we underestimating?
