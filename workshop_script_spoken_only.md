# Workshop Script — Spoken Only
**Duration:** 60 Minutes

## Part 1: Context & Concepts

### Slide 0 — Pre-show (T-10:00)
Hi, welcome! Feel free to grab a seat. While we wait for everyone, could you open the link on the screen, or scan the QR code? It will take you to today's handout.

You will need the handout later, especially during the hands-on part, so please have it ready on your laptop.

Also, this is a hands-on workshop, so please make sure your laptop is connected to the Wi-Fi and your Canva account is ready.

If you do not have a Canva account yet, please use the handout link to create a free account now. It only takes a few minutes, and you will need it later.

### Slide 1 — Title (0:00)
Good morning, everyone. My name is Zesen, and I am a Learning Technology Developer at HKU Libraries. Welcome to this CITERS workshop: Vibe Coding for Teaching and Learning.

Before we begin, let me quickly get a sense of the room.

How many of you are school teachers?

How many of you teach in higher education?

And how many of you are students, researchers, or in another role?

Thank you. Today I will use mostly teaching examples, especially classroom examples. But the same method also works for academic presentations, training sessions, and other communication tasks.

Let me start with a simple problem. Many of us use AI to make content faster. We ask AI to write a summary, make an outline, or draft some slides. That is useful. But very often, the final result is still a static slide. The audience reads it. The teacher explains it. The learner listens.

Today, we try something more active.

In the next 60 minutes, you will build a small interactive component. It can be something people click, filter, move, or explore. And you will do this without writing code yourself. You will use plain English to guide the AI.

### Slide 2 — The End Goal (3:00)
I want to be very clear about where we are going today.

On the left, we have a normal slide. It has a list about the water cycle. This is fine, but it is passive. The learner reads the list, and the teacher explains it.

On the right, we have something more active. The learner can click, filter, and open details. They can explore the idea, not just look at it.

For example, I can click Water Cycle Explorer. The card opens into a small visual explorer. I can show it for five seconds, then come back and click another example. This is the kind of small "wow" moment we want: simple, clear, and useful.

By the end of this workshop, your component does not need to be perfect. It does not need to look like a finished product. But you should have a small working draft: maybe a lesson activity showcase, maybe a case explorer, maybe a concept explorer.

The key idea is simple: we are moving from "showing information" to "letting people interact with information".

### Slide 3 — What is "Vibe Coding"? (5:00)
This brings us to a term called Vibe Coding. The term was coined by AI researcher Andrej Karpathy (/ˈɑːn.dreɪ ˈkɑːr.pə.θi/ AHN-dray KAR-puh-thee) in early 2025. Later, Collins Dictionary named it their Word of the Year.

So what does it mean?

Traditionally, if you wanted a computer to do something custom, like building an interactive tool or a small website, you had to write code. Programming is very exact. If one small detail is wrong, the result may not work.

Vibe coding is different. Instead of writing every instruction yourself, you describe what you want in plain language. The AI writes the code. You check the result. You catch the vibe. If something is not right, you tell the AI what to change.

It is a bit like ordering at a restaurant. You describe what you want. The kitchen does the work. When the food comes back, you check it. If it is not right, you ask for a change.

In workshop terms, the loop is this: describe, generate, inspect, refine.

Describe what you want.

Let the AI generate a first version.

Inspect what comes back.

Then refine it by giving clear feedback.

That loop is the real skill today.

### Slide 4 — Why Canva Code? (7:00)
Now, if some of you came here because you want to learn vibe coding more broadly, this is where Canva Code fits in.

Canva Code is not the whole world of vibe coding. It is one easy entry point.

On the right side of this slide, you see tools like Cursor and Claude Code. Professional developers use these tools to build real software. They are powerful, but they need more technical background.

In the middle, there are tools like Replit, Lovable, and Bolt. They can help people build full web applications from prompts. They are easier than professional coding tools, but you still need to understand more about how a project is built and shared online.

On the left, there is Canva Code. No setup. No terminal. No code editor. You write a prompt, see the result, and refine it.

So today, Canva Code is our practice ground. We are not here to become software engineers. We are here to practise a way of working with AI: describe clearly, test carefully, and improve step by step.

### Slide 5 — Canva AI Beyond Canva Code (9:00)
Before we focus on Canva Code, it helps to see the bigger Canva AI picture.

Think of Canva AI as the umbrella.

Sometimes you use AI to draft a deck.

Sometimes you use it to polish slides, change the layout, or add media.

And sometimes you need something custom, something a normal template cannot do. That is where Canva Code becomes useful.

In simple words: Design for me helps you make slide drafts. Code for me helps you make small interactive components.

Today, we are not trying to learn every Canva AI feature. We are focusing on one useful part: building a small interaction that supports teaching, learning, or presentation.

### Slide 6 — The Scope (11:00)
This is our scope.

We are not building production software.

We are not building a school management system, a medical database, or a full learning platform.

We are using this workflow for one clear purpose: to create lightweight, interactive teaching and presentation aids.

So keep the size small. Keep the purpose clear. Think of one slide, one concept, one activity, or one question.

### Slide 7 — Ideal Gas Law Demo (12:30)
Let us look at an example.

Right now, this is just an equation: PV equals nRT. Many of us have seen this in a science class. But does staring at the symbols help a learner feel what happens when a gas is compressed?

Let us make it interactive.

Now we have the same equation, but learners can explore it.

Try moving the temperature slider. The particles speed up.

Now change the volume. The container becomes smaller. The particles are closer together. The pressure goes up.

You can also change the amount of gas. More gas means more particles and more collisions.

This is the difference between showing and letting people explore.

Your own component today does not need to be this complex. But the learning idea is the same: let the audience touch the idea.

### Slide 8 — The "Junior Intern" Rule (15:00)
Now, a word about the tool.

Canva Code is like a junior intern: fast and eager, but not always reliable.

If you give this intern a clear, small task, like "build a 4-card comparison tool", you will often get something useful very quickly.

But if you give this intern a huge task, like "build a 50-variable simulator with beautiful animations and many modes", it may break. You may get a blank screen. Or the result may look nice but not work well.

This is not only Canva Code. AI tools in general have limits.

So our golden rule is: keep it small, keep it useful, keep it stable.

If your prompt fails, do not panic. Usually the answer is simple: make the task smaller.

## Part 2: The Live Demo

### Slide 9 — Pick Your Track (17:00)
Before we open the tool, let us look at what you can build today.

I have prepared three starting points.

Track 1 is Lesson Activity Showcase. This is good for classroom activities, lesson examples, student project ideas, or learning resources. It gives you a filterable gallery. People can search, filter, and click a card to see details.

Track 2 is Case or Argument Explorer. This is good for social studies, humanities, citizenship, law, or any topic where students need to look at evidence and make a judgement.

Track 3 is Concept Explorer. This is good for maths, science, economics, or any topic where changing one input changes the result.

I will demonstrate Track 1 right now. Please just watch the screen first. In a few minutes, you will build your own version.

### Slide 10 — Live Build: Step by Step (19:00)
Okay, watch closely.

On the Canva homepage, you will see a text box for Canva AI. Click on it. At the bottom of the box, you should see a few buttons. Click the one that says `</> Code`.

This is important. If you type directly into Canva AI and press Enter, Canva may create normal slide designs. That is not what we want right now. We want Code.

Now I have the Code prompt box open.

This is where many people freeze. They look at the empty box and do not know what to type. That is why I prepared prompt templates in the handout.

I am going to use the Track 1 prompt. Let me read the structure, not every word.

First, it says the context: this is for teachers.

Second, it says the content: 6 cards, each with a title, summary, grade level, subject tag, and interaction type.

Third, it says the behavior: add filters and search, and show a detail view when a card is clicked.

Fourth, it says the style: clean and professional, suitable for a workshop presentation.

That is a strong prompt. It tells the AI what the component is for, what it contains, what it should do, and how it should look.

Now I submit it.

While it is working, let me say one thing. The first result is only a first draft. Do not expect it to be perfect. We are not asking AI for a final answer. We are asking for something we can inspect.

### Slide 11 — Inspect and Refine (27:00)
Now we inspect the result.

I will click a few filters. I will try the search box. I will open one card and see if the detail view works.

When you inspect your own result, two things can happen.

Maybe something is broken. For example, a button does not respond, or the layout is too small.

Or maybe everything works, but you want to improve it. Maybe the text is too small for a classroom screen. Maybe the colours are too light. Maybe you want the teacher notes to be clearer.

Either way, the process is the same. You describe the change in plain English.

For example: "The text is too small for a classroom presentation. Make it larger and keep the layout simple."

Or: "The filter button does not work. Please fix it. Keep everything else the same."

This is the refine step. You are not coding. You are giving feedback.

Once you are happy, you can click "Use in a design" and place it into a Canva presentation.

## Part 3: Hands-On Sprint

### Slide 12 — Your Turn (32:00)
Now it is your turn.

You have 20 minutes. Your goal is simple: get one first working draft on your screen.

It does not need to be perfect.

It does not need to be beautiful.

It just needs to work.

Step 1: Open Canva AI, then click `</> Code`.

Step 2: Open the handout and choose Track 1, 2, or 3.

Step 3: Copy the prompt, paste it into Canva Code, edit the topic if you want, and submit it.

If you do not know what topic to use, do not spend too much time thinking. Use the sample content in the handout. The goal today is to learn the workflow, not to finish a perfect teaching resource.

Your working time starts now. I will walk around. If you get an error, raise your hand.

*Minute 38 reminder:* Quick reminder: if you are getting an error, your prompt may be too complex. Make it smaller and try again.

*Minute 44 reminder:* Once your component appears, test it. Click the buttons. Try the filters. Open the details. Do not only look at it. Test it.

*Minute 49 reminder:* Three minutes left. If you have a working component, give it one improvement. Make the text larger, simplify the layout, or make the teacher notes clearer.

## Part 4: Wrap-Up, Boundaries & Questions

### Slide 13 — The "Interactive Sandwich" Mindset (52:00)
Let us pause and come back together.

By now, many of you should have a first draft: maybe a gallery, maybe a case timeline, maybe a concept explorer.

Before you use it in a real class or presentation, remember this: do not just drop a widget onto a blank slide.

If your audience sees an interactive component with no framing, they may not know what to do with it.

So use the Interactive Sandwich.

At the top, give the setup. Tell your audience what to do or what to think about. For example: "Move the slider. What changes first?"

In the middle, place your widget. Make it large enough to use.

At the bottom, give the synthesis, or the final takeaway. What should learners notice?

If you only remember one structure, remember this: Setup, Widget, Synthesis.

### Slide 14 — Interaction ≠ Understanding (54:00)
Now we need to talk about limits.

An AI-generated component can look very professional. It can have nice buttons, cards, colours, and animations.

But a professional-looking interface does not mean the content is correct.

Do not fall into that trap.

Use Canva Code to build the interface: the buttons, the layout, the interaction.

But check the teaching content yourself: the facts, examples, formulas, instructions, and age level.

For low-stakes exploration and quick learning checks, this can be very useful.

For high-stakes grading, legal advice, medical decisions, or anything where mistakes have serious consequences, always be much more careful.

### Slide 15 — When to Use What (56:00)
Also remember: not everything needs Canva Code.

If you only need a quick poll, a simple question, or a form, Canva already has built-in features. Use those when they are enough.

Use Canva Code when you need something custom.

For example, you want learners to explore a case, compare options, adjust a variable, or open different explanations on the same slide.

The question is not "Can I use Canva Code here?"

The better question is: "What interaction helps my audience understand this better?"

### Slide 16 — Where to Go Next (57:00)
So, where do you go next?

First, keep the handout. The prompts are templates. You can swap the topic, but keep the structure.

Second, start building a small library of interaction patterns. A gallery, a timeline, a slider, a quiz-like check, a card sorter. These patterns can be reused.

Third, next time you prepare a lesson or presentation, ask yourself: could one slide be interactive?

Not every slide. Just one useful slide.

### Slide 17 — You Can Start with a Free Account (58:00)
One quick practical note.

Everything we did today works with a standard Canva account. You do not need a paid plan to practise this workflow.

If later you want premium templates or extra assets, that is a separate question.

But for learning the workflow, start with what you already have.

Build one small, useful interactive slide first.

### Slide 18 — Thank You (59:00)
Let me close with the main idea.

The new skill is not coding. It is knowing the learning purpose and saying it clearly.

Today, you described an idea in plain English. You let AI generate a first version. You tested it. You gave feedback. That is the workflow.

This is also where human choice matters. AI can generate many things, but you decide the purpose. You decide what is useful. You decide what is correct for your learners.

Thank you for your time. I will stay for questions and troubleshooting after the session.

*Optional Q&A / individual troubleshooting after the workshop.*
