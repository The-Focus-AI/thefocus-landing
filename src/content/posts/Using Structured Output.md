---
title: Using Structured Output
date: 2025-03-30
tags:
  - usecase
  - process
image: structured_output.png
description: Transforms chatting from simple text generators into powerful data processing engines, enabling extraction of organized information from PDFs, audio files, and more. Here are some practical techniques for building, including audio analysis, pdf data extraction and conversation state management, showcasing how constraint-driven outputs can power rich user experiences.
published: true
---
Structured output is super interesting.  If you're trying to build AI engineering based applications you should make sure you have a handle of the possibilities.

The new version of Gemini Flash 2.5 is really quite remarkable. But let's go through a quick few examples of what you can do -- this technique applies to a whole range of the big boy models.

I've had some good luck with PDFs, PowerPoints, and audio files. Let's take a quick look through each of those.

![](../assets/davinci.png)
*A page from Davincis notebooks intricately sketched on yellowed parchment, surrounded by alchemical symbols and handwritten notes in iron gall ink, old scientific diagram style, high detail,*
# The magic of constraints

One thing that's truly remarkable is how clever and smart it is in matching up what the correct format of the result is.

It's much more than just saying I want to end this format.

For example, you say "give me a timestamp and text" and throw an audio file at it, which is remarkable in itself since these things weren't really trained with that in mind.  But you can sort of understand how it's relatively straightforward, how it knows that you want when the text was spoken during the transcript.

But you can also add in speaker name. And it will do its best based on the entirety of the podcast or audio file to identify who is talking. So it does this both by matching the voice based on the sound of it -- what is known as "speaker diarization" -- but if later on at the very end of the podcast the speaker identifies themselves, it will put that together to make deduce who was speaking at the end.

It wasn't that long ago that "speaker diarization" was itself a challenge, not the general models figure that out *magically*.

And you can also say "also i need a boolean to tell me if this segment is an advertisement".  And it spits it out.  How does it know? I don't know it figures it out though, and so you can just say advertisement true or false and it will deduce from the context what is going on in that part of the audio.

Maybe you can add some more stuff in there to break down different sections to say that this is a type of discussion that they're having. This is a overview news report. This is the highlighted interview. And simply by adding in these fields and perhaps giving it a little bit of information, those constraints will tell it whatever it needs to do to figure it out.


![](../assets/audio.png)
*A vintage black-and-white film reel to real tape recorder with field microphones, with intricate mechanical details, set against a pure white background. Medium: Photography.Style: Inspired by minimalist retro aesthetics and classic cinema.Lighting: Soft, diffused lighting to highlight the projector's form and textures without harsh shadows.Colours: Monochromatic palette with deep blacks and bright whites.Composition: Captured using a Canon EOS R with a 50mm f/1.8 lens, using a shallow depth of field to create a blurred effect on the background while keeping the projector sharply in focus, centered in the frame.*


## Deep structure

The constraints that it will go to to solve are truly mind blowing.  We are up to gemini 2.5 now, but back in the gemini 1.5 days this [one example blew my mind](https://cloud.google.com/vertex-ai/generative-ai/docs/prompt-gallery/samples/question_answering_barista_bot_105)

It's a prompt that defines the reasoning model for a barista bot. This is a "bot" that will help place your order and you can say give me something strong or I want something that's sort of like this and it will prompt you as a conversation to come up with an order that makes sense.

But it's specified as a sort of free-flowing state machine inside of the system prompt and with a again almost scribble of intention of what the structured response should be.  We aren't defining LL-decent parsers here, just throwing it a few examples of what we think it should look like.

The structure they defined keeps track of the conversational history of what's happening throughout the prompt objects, the resulting objects, and so it forces the model to it sort of automatically creates a chain of thought system because in order for the fields to get filled out correctly they have to anticipate and think of future options

Inside of the structured output, it includes a spot for the model's reasoning to get to the next step. It includes the prompt that it is meant to show to the user, so a lot of the structured data is not meant to be visible. And it includes a sort of previous conversational history. So this could also be done as sort of one-off generations without having long conversational chains, because the state that the barista bot needs to know is all contained within the structured output itself.

![](../assets/rube.png)
*Very complex science fiction rube goldberg machine with water*

# It's great for user experience

When tools in general are added to a conversational agent -- either in a direct function way or in the general ModelContextProtocol way -- they will return structured data as s result of the interface itself.  You know that you are getting that exact output for sure because that's code that you've explicitly written. And you can built your UI interface off of that, rather than a free flowing text box or some flakey way of detecting where the code diff starts and ends or whatever.

In the barista example you can show what's in the order -- maybe a draft of the coffee art too while you're at it -- as well as buttons to increase the quantity or whatever else you might want to tweak in addition to using the words.  That's not what they mean by multimodal, but its a type of it for sure.

What you've done is shifted the business logic right into the model, in the way that it can reason about and that the user experience can supplement rather than define.

And being able to make structures output off of individual completions means that, starting with very vague data, you can build an experience around that that isn't a just a chatbot experience. It's better way to add brains before the application. Let's go through a quick example of how we could build a better podcasting app.

And if you want to see the code in action, I've got a vibe coded demo up at [https://github.com/The-Focus-AI/pocketcast-collaborator]. Its very cool to be able to talk to a podcast.

![](../assets/coffee-art.png)
*normal rockwell style painting, visible and thick brush strokes, of an art-deco style robot teaching a younger robot how to draw latte art on a cappuccino*
# Audio transcription

Hands on coding here people!  Install [llm-gemini](https://github.com/simonw/llm-gemini), get yourself a key, download a podcast mp3 and hold on to your butts:

```bash
llm -m gemini-2.5-pro-exp-03-25 \
    -a google-s-gemma-3-rollout-plus-ftc-delays-amazon-trial-3-12-25-8fc8c4.mp3 \
    --schema-multi 'timestamp str: mm:ss,speaker_name,advertisement: boolean, text' \
    transcript
```

This is a one word prompt `transcript` and you pass it an mp3 file, and it breaks it down into the output schema.  How does it know who is talking?  How does it know that we are in an ad?  *magic*

Now you can do all sorts of fun stuff.

## Working with the output

*show me the first 3 non-ad items*
```bash
jq '[.items[] | select(.advertisement == "false")] | .[0:3]' ../transcript.json
```

```json
[
  {
    "advertisement": "false",
    "speaker_name": "Leslie Picker",
    "text": "Google releasing a new family of open source models today that it says can run on a single chip, a GPU or Google's custom AI chip called the TPU.",
    "timestamp": "00:44"
  },
  {
    "advertisement": "false",
    "speaker_name": "Leslie Picker",
    "text": "Derbosa has more in today's tech check D. Interesting development here.",
    "timestamp": "00:53"
  },
  {
    "advertisement": "false",
    "speaker_name": "Deirdre Bosa",
    "text": "Hey Leslie, good morning.",
    "timestamp": "00:58"
  }
]
```

![](../assets/teleprompter.png)
*picture of a 1950 radio studio showing a hand-written teleprompter showing the lines to two presenters*

*show the key points of discussion with the timestamps*
```bash
jq '[.items[] | select(.advertisement == "false")]' transcript.json  | \    
llm --schema-multi 'timestamp str: mm:ss, key_headline, topics[], participants[], discussion'  > key_points.json
```

Here are the first 3
```bash
jq '[.items[0:3]]' ../key_points.json
```

```json
[
  [
    {
      "timestamp": "00:44",
      "key_headline": "Google Launches Open Source AI Models",
      "topics": [
        "AI Models",
        "Google",
        "TPU"
      ],
      "participants": [
        "Leslie Picker",
        "Deirdre Bosa"
      ],
      "discussion": "Google has released a family of open source models that can run efficiently on various chips, including its own TPU."
    },
    {
      "timestamp": "00:53",
      "key_headline": "Tech Check Updates",
      "topics": [
        "Tech News",
        "Google",
        "AI"
      ],
      "participants": [
        "Leslie Picker",
        "Deirdre Bosa"
      ],
      "discussion": "Deirdre Bosa provides insights into the significance of Google's new model release."
    },
    {
      "timestamp": "00:58",
      "key_headline": "Market Implications of Google's AI Models",
      "topics": [
        "AI Models",
        "Market Trends",
        "Nvidia"
      ],
      "participants": [
        "Deirdre Bosa"
      ],
      "discussion": "Deirdre notes that Google's models represent a response to competition and highlight its chip technology advantage."
    }
  ]
]
```

You could image how to build an interface off of this structured data: here's the key headlines that they covered, a description of the conversation, who was in it, what the larger topics were that you could cross reference with other episodes or podcasts...

...and all we did was define a couple of schemas.  Pump the audio into one, the output of that into the other, and boom.  It takes a couple of minutes, and the real trick is to figure out how you want to organize your product around the data.
# Schema Builder

I'm using the excellent [llm schema](https://llm.datasette.io/en/stable/schemas.html#schemas-dsl) command to generate the JSON schema
```bash
llm schemas dsl --multi 'timestamp str: mm:ss,speaker_name,advertisement: boolean, text'  
```

And this outputs:

```json
{
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "timestamp": {
            "type": "string",
            "description": "mm:ss"
          },
          "speaker_name": {
            "type": "string"
          },
          "advertisement": {
            "type": "string",
            "description": "boolean"
          },
          "text": {
            "type": "string"
          }
        },
        "required": [
          "timestamp",
          "speaker_name",
          "advertisement",
          "text"
        ]
      }
    }
  },
  "required": [
    "items"
  ]
}
```

If you're coding this yourself, you'd probably use something like [zod](https://github.com/StefanTerdell/zod-to-json-schema) if you are in a typescript context.

# Extracting structured data from a PDF

Lets do this using the vercel ai sdk.  First lets define the output that we want in [zod](https://github.com/colinhacks/zod)

```typescript
import { z } from "zod";

// HealthInsurancePlan Schema
const HealthInsurancePlanSchema = z.object({
  // Basic Plan Information
  planName: z
    .string()
    .describe(
      "The formal name of the health insurance plan, e.g., 'Open Access Plus', 'Connect Gold CMS Standard'. Usually appears at the top of the SBC document."
    ),

  carrierName: z
    .string()
    .describe(
      "The name of the insurance company providing the plan, e.g., 'Cigna', 'Cigna HealthCare of North Carolina, Inc.'. Found at the top of the SBC document."
    ),

  planType: z
    .string()
    .describe(
      "The type of health insurance plan, such as 'OAP' (Open Access Plus), 'HMO' (Health Maintenance Organization), 'PPO' (Preferred Provider Organization). Usually found in the header section."
    ),

  coveragePeriod: z
    .object({
      startDate: z
        .date()
        .describe(
          "The start date of the coverage period, formatted as MM/DD/YYYY. Found in the header of the SBC, usually labeled 'Coverage Period'."
        ),
      endDate: z
        .date()
        .describe(
          "The end date of the coverage period, formatted as MM/DD/YYYY. Found in the header of the SBC, usually labeled 'Coverage Period'."
        ),
    })
    .describe("The time period during which the plan provides coverage."),
....
```

When we can make a prompt that says something like:

```
import HealthInsurancePlanSchema from "./schemas/sbc_schema.js";

export const SBC_PROMPT = `You are a healthcare enrollment form parser. 
Your task is to extract key information from enrollment forms.

${HealthInsurancePlanSchema}

Extract and return ONLY the JSON data. Do not include any other text or explanation.`;

```

Then we fire it up something like:

```typescript
const fileBuffer = await fs.readFile(path.resolve(filePath));
const fileType = await fileTypeFromBuffer(fileBuffer);

const mimeType = fileType?.mime || "application/octet-stream";
const base64Data = fileBuffer.toString("base64");


messages.push({
	id: "document-context",
    role: "system",
    content: prompt.system,
    })

message.push({
    role: "user",
    content: [
    {
      type: "file",
      data: base64Data,
      mimeType: mimeType
 .  }
]})

message.push({
  {
  role: "user",
  content: "Parse the enrollment PDF and extract the information."
  });

await generateText({
      model: this.prompt.model,
      messages: this._messages,
      tools: this.prompt.tools,
      maxSteps: 1,
    });
```

![](../assets/doctor_visit.png)
*a simple childish drawing of an parent, young child, and a doctor in the doctors office routine checkup, set on a white background*


# Thoughts

From an AI engineering point of view this is a super interesting way to structure things.

First you are specifying your intentions -- this is what I want, figure out how to do it.  Sometimes you need to coach it a bit with a more detailed system prompt, but you can get pretty far with just the output schema.

Second, you're breaking it down so that you have prompts that are leading to prompts that lead into prompts. You're not building a hugely complicated prompt system that solves everything all at once. What you're doing is finding a way for these things to plug in to each other easily, and any modular system is easier to maintain and test and verify.

This stuff is really, you know, simply using the model itself. You can go pretty deep with tools.  Give it some ways to query your analytics database, these are the knobs themselves, have at it -- and "give me a list of pages that are the most popular with viewers that come in through India" or some sort of complicated query and in that case the model is being smart in order to understand what you're asking for and then call the tools in the right way to make that happen.

![](../assets/oracle.png)
*greek supplicants visiting the oracle to get the great answers of life, hyper realistic*

After that, you're plugging them in to each other and you're showing the visualization or whatever of the data that comes back and instead of being, you can build a much richer experience at that point.

It doesn't need to be that complicated -- think about the transcript app above.  Define the schema, and it gets the output.  You start your product by lets just layer "you can see the transcript of what is being spoken as the user listens."  You can see the text highlighted where the user is speaking. That's cool. That's pretty fun.

But you can also have it skip over the ads or you can have it summarize the key points of what is in that discussion and be able to zip in to that part directly.  All with another simple schema-prompt that you've added after the first one.

And why not make it so the person can ask deeper questions about it?  Lets add another layer of data answers on top of the previous one. There's a lot of podcasts that I listen to or I'm in the car or whatever, and being able to kind of ask questions about it is super helpful later on.

What was that book they were talking about? Why is it that they liked it? What was it that they thought about that author? How can I go and find out more information about it?

Manual show notes are all well and good, but imagine what this level of deeper understanding will unleash for people interacting with the information that's streaming into them.

