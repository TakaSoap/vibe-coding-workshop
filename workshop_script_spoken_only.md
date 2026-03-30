# Workshop Script — Spoken Only
**Duration:** 90 Minutes

## Part 1: Context & Concepts

### Slide 0 — Pre-show (T-10:00)
Hi, welcome! Feel free to grab a seat. While we wait for everyone, could you open the link on the screen, or scan the QR code? It will take you to today's handout. You will need it later, so please have it ready on your laptop.

Also, this is a hands-on workshop, so make sure your laptop is charged and connected to the Wi-Fi.

### Slide 1 — Title (0:00)
Good afternoon, everyone. My name is Zesen, and I am a Learning Technology Developer at HKU Libraries. Welcome to our workshop: Vibe Coding with Canva Code.

Before we begin, let me ask you something. How many of you have ever had one slide that felt too crowded, so you split the same content across two or three slides just to explain it step by step?

*Pause and look around for nods.*

We all know that feeling. You have this rich, complex idea in your head, but your slides are flat. They show one thing at a time. You cannot click anything. You cannot explore anything. That is the problem we are solving today.

In the next 90 minutes, you will build an interactive component, something people can click, filter, and explore, and embed it right into a Canva presentation. And you will do this without writing a single line of code. Just plain English.

### Slide 2 — The End Goal (3:00)
I want to be very clear about where we are going today. Look at these two slides.

On the left, a standard bullet-point list. On the right, something your audience can actually touch. Filter by tags, click to see details, search for what they need.

By the time you leave this room, you will have built something like the one on the right. A working interactive component, maybe a project or idea showcase, maybe a concept explorer, that you can use in your next class, your next meeting, or your next presentation.

But to do this, we need to learn a new way of thinking.

### Slide 3 — What is "Vibe Coding"? (5:00)
This brings us to a concept called Vibe Coding. The term was coined by AI researcher Andrej Karpathy (/ˈɑːn.dreɪ ˈkɑːr.pə.θi/ AHN-dray KAR-puh-thee) in early 2025. It quickly became so popular that Collins Dictionary named it their Word of the Year.

So what does it mean?

Traditionally, if you wanted a computer to do something custom, like building an interactive tool or a dynamic website, you had to write code. Programming. And programming is a bit like following a recipe where you measure every gram and time every second. No shortcuts, no room for error. Most of us have heard of coding, but very few of us have actually done it, and that is exactly the barrier vibe coding removes.

Vibe coding is different. Instead of writing every instruction yourself, you describe what you want in plain language. The AI writes the code. You check the result, you catch the vibe. If something is not right, you tell the AI what to change.

It is like ordering at a restaurant. You describe what you want, you check if it is right, and you ask for changes. The kitchen does the work. Your job is to be clear about what you want.

For today, I want to define it in a very practical way. Vibe coding is not really about one specific tool. It is a way of working.

In workshop terms, the loop looks like this: you describe what you want. The AI generates a first version. You inspect what comes back. Then you refine it by telling the AI what to change.

That loop, describe, generate, inspect, refine, is the real skill.

So even though today we are building a small interactive component, what you are really learning is the mindset behind vibe coding: how to guide AI, judge the result, and improve it step by step.

### Slide 4 — Why Canva Code? (6:30)
Now, if some of you came because you want to learn vibe coding more broadly, this is where Canva Code fits in.

Canva Code is not the whole world of vibe coding. It is one of the easiest entry points.

On one end, you have tools like Cursor and Claude Code. Professional developers use them to build real software. They are incredibly powerful. But they require you to set up a development environment, work in a code editor or terminal, and have at least some technical background.

In the middle, there are platforms like Replit, Lovable, and Bolt. They let you build full web applications from a prompt. More accessible, but you still need to understand things like project structure and deployment.

And then there is Canva Code. The lowest-friction place to practise the same core loop. No setup, no environment, no terminal. You type a prompt, you see the result, and you refine it.

*Gesture at the slides.*

So today's workshop is not only about making one small widget. The widget is our practice ground. We are using it to learn a transferable way of working with AI.

In fact, this presentation you are looking at right now, the animations, the interactive demos, was built using some of those more advanced tools on the right. So vibe coding scales. But today, we are starting at the easiest end, and for building interactive teaching aids inside a presentation, Canva Code is exactly the right tool.

The trade-off? Less flexibility. You cannot build a full application with it. But that is fine, because our goal today is not to build a full app. It is to learn the mindset in a simpler environment.

But before we narrow our focus, I want to widen the lens for a moment and show you where Canva Code sits in the broader Canva AI ecosystem.

### Slide 5 — Canva AI Beyond Canva Code (8:00)
Before we zoom in on Canva Code, it helps to locate it inside the bigger Canva workflow.

Think of Canva AI as the umbrella. Sometimes you use it to draft a first version of a presentation. Sometimes you use it to polish the visuals, adjust the layout, or add media. And sometimes you use it to create something custom that normal templates cannot do. That third use case is where Canva Code becomes especially useful.

So a simple mental model is this.
First, you can use Canva AI to draft the deck.
Second, you can edit and refine the slides using Canva's normal tools and AI helpers.
Third, when you need a calculator, mini explorer, or interactive explainer, you open Code for me.

In Canva's own language, Design for me helps generate slide drafts. Code for me helps generate interactive components.

That matters because today we are not trying to learn every Canva AI feature. We are focusing on the part that lets you build a custom interactive component inside a presentation.

### Slide 6 — The Scope (17:00)
That broader Canva AI picture matters because it shows us where Canva Code sits. Canva AI can help with drafting, layout, and presentation design much more broadly.

From this point on, though, we are narrowing our focus to one specific part of that ecosystem.

What we are doing today is not building professional software. We are not creating banking systems or medical databases.

We are using this workflow for one specific purpose: to create lightweight, interactive teaching and presentation aids.

### Slide 7 — Ideal Gas Law Demo (18:00)
Look at this. Right now it is just an equation, PV equals nRT. Most of you have probably seen this in a science class at some point. But does staring at symbols help you feel what happens when you compress a gas?

*Click "Make it interactive".*

Now look. The same equation, but alive. Try moving the temperature slider. Watch the particles speed up. Now change the volume. The container shrinks, the particles crowd together, and the pressure climbs. You can even add more gas with the moles slider: more particles, more collisions, more pressure. And look, the equation at the top shows the exact values balancing.

This is the difference between showing and letting people explore. That is exactly the educational value we are aiming for today. Not this complex, but the same idea. Let your audience touch and explore.

### Slide 8 — The "Junior Intern" Rule (21:30)
Now, a word about the tool we are using today.

Canva Code is like a junior intern: fast and eager, but not always reliable, especially when the task gets too complex. Give this intern a clear, simple task, "build a 4-card comparison tool", and they will usually give you something useful very quickly.

But give this intern a huge, complicated task, "build a 50-variable simulator with fancy animations", and the intern will freeze up and give you a blank white screen.

This is not just Canva Code. AI tools in general have limits. But that is perfectly fine.

Our golden rule today is: keep it small, keep it useful, keep it stable.

Keep your tasks clear and simple, and you will be very happy with the results.

## Part 2: The Live Demo

### Slide 9 — Pick Your Track (23:00)
Before we jump into the tool, let us look at what we are actually building.

I know we have researchers, lecturers, and students from very different fields in this room. That is exactly why I prepared three different starting points.

Track 1 is Projects & Ideas. Best for presenting projects, research themes, teaching ideas, student work, or service initiatives. It gives you a filterable gallery with clickable tags and detail views.

Track 2 is the Case Explorer. If you work with cases, policies, or historical arguments, this lets you build a timeline where each milestone is clickable and shows details.

Track 3 is the Concept Explorer. If you work with numbers or variables, this lets you build a tool where users adjust a slider and see how the result changes, for example, a compound interest calculator.

I am going to demonstrate Track 1 right now. Please just watch the screen. Put your hands away from your keyboards for the next ten minutes. I will guide you through your own build right after.

### Slide 10 — Live Build: Step by Step (24:30)
Okay, watch closely.

On the Canva homepage, you will see a text box for Canva AI. Click on it. At the bottom of the text box, you will see a few buttons. Click the one that says `</> Code`. It looks like a little pill button. That is our entry point.

Important: if you type directly into the text box and press Enter, you will get Canva AI designs. That is not what we want today. Make sure you click the `</> Code` button first.

*Perform the action on screen.*

Now I have the Code prompt box open. This is where people freeze. They stare at the blinking cursor and forget what to type. To help with that, I have provided prompt templates in your handout.

I am going to use the exact prompt from Track 1. Let me read it out loud:

Build an interactive showcase for a university presentation. Show 6 cards featuring projects, research themes, teaching ideas, student work, or service initiatives. Each card should include a title, one-line summary, and tags. Add tag filters and a search box. When a card is clicked, show a detail view. Use a clean, professional design.

Notice the structure. I specified the context, the content, the behavior, and the style.

Now I hit Submit.

*While waiting for generation.*

While it is working, let me tell you what to expect. When the result comes back, one of two things will happen. Either something will not work quite right, a button is broken, the layout looks off, and we fix it. Or everything works fine, and we just want to improve it, bigger text, different colors. Either way, the process is the same: you describe the change in plain English and let the AI update it.

### Slide 11 — Inspect and Refine (30:30)
And here we go. Let us inspect the result.

*Click a few filters and type in the search box.*

Now we inspect the result. Two things can happen.

Maybe something is not working. A button does not respond, the layout is off. Or maybe everything works fine and you just want to improve it, make the text bigger, change the colors.

Either way, the process is the same: you describe what you want to change in natural language.

For example, I could say: the text is too small for a presentation. Make it larger and change the color palette to professional blue and grey.

*Hit update and show the change.*

Much better. Once you are happy, click the button up here that says "Use in a design". Select your presentation, and now it is embedded in your slide.

## Part 3: Hands-On Sprint 1

### Slide 12 — Your Turn (35:00)
Now you have seen it in action. Time to try it yourself.

You have about 20 minutes. Your only goal right now is to get a first working draft on your screen. It does not need to be perfect. It just needs to work.

Step 1: Open Canva. Go to Canva AI, then click `</> Code`.
Step 2: Open your handout. Choose Track 1, 2, or 3.
Step 3: Copy the prompt, paste it, edit it if you want, and press Submit.

Now, I know some of you are thinking, "But I do not know what topic to use."

If you are staring at a blank screen, look at the handout. I have provided sample content for every track, a ready-made scenario you can paste in right now. Do not spend 10 minutes thinking of a topic. The goal today is to learn the workflow, not to create finished work.

Your working time starts now. I will be walking around. If you get an error, raise your hand.

*Minute 40 reminder:* Quick reminder: if you are getting an error, you probably asked for too much. Go back, make the prompt simpler, and try again.

*Minute 45 reminder:* I am seeing some great work. Once your widget is generated, click on it. Test the buttons. If something does not work, tell the AI: "The filter button is broken, please fix it."

*Minute 50 reminder:* Five minutes left. If you have a working component, try giving it one improvement. Tell it to change the colors, or make the text bigger.

And if you are already happy with your result, try a different track from the handout, or add more features to the one you have. There is no ceiling here.

## Part 4: Regroup & Flexible Exploration

### Slide 13 — The "Interactive Sandwich" Mindset (55:00)
Okay, let us pause. By now, most of you have a working component, maybe a gallery, maybe a timeline, maybe a calculator.

Now we move into a more flexible block. If your widget is ready, you can try embedding it into a presentation. If it is not ready, keep refining it. And if you want to explore Canva AI a little more broadly, that is also fine.

But I want to leave you with one mindset before you continue: do not just drop a widget onto a blank slide.

If you put an interactive widget on a plain slide with no framing, it feels random. Your audience will not know why it is there.

Instead, build what I call an Interactive Sandwich. Your slide becomes a small experience with three layers.

The top layer: the setup.
Above your widget, write a question or an instruction. For example: "Adjust the interest rate below. What happens after 30 years?" Tell your audience why they are interacting.

The middle layer: your widget.
Place your Canva Code component in the center. Make sure it is large enough to use.

The bottom layer: the synthesis.
Below the widget, write the takeaway. What did the widget just show?

If you only remember one thing from this slide, remember this structure: Setup, Widget, Synthesis.

Use the next 15 minutes flexibly. Refine your component, embed it if you are ready, or keep exploring. The goal is not to finish a perfect slide. The goal is to start thinking like a presenter, not just a prompt writer.

*Minute 63 reminder:* If your widget is not ready to embed yet, that is completely fine. Keep improving the widget itself, or sketch the setup and takeaway text first.

## Part 5: Wrap-Up, Boundaries & Questions

### Slide 14 — Interaction ≠ Understanding (72:00)
Alright, let us bring it all together for the final stretch of our workshop.

As academics, researchers, and students, we need to talk about the boundaries.

When we use tools like Canva Code, it is very easy to create the illusion of quality. The AI generates a professional-looking interface in 10 seconds. Because it looks professional, we assume the content inside it is correct.

Do not fall into that trap.

Use Canva Code to build the interface, the buttons, the layout, the interaction. But always check the content with your own expertise. If you are teaching students, you want them exploring variables to understand a concept, not receiving unverified AI output wrapped in a professional-looking interface.

Low-stakes exploration is great. High-stakes decisions? Always double-check.

### Slide 15 — When to Use What (75:00)
I also want to save you some unnecessary work in the future.

Now that you know how to use Canva Code, remember: not everything needs it.

If you just want to ask your audience a question, or run a quick poll, or collect responses, Canva already has built-in features for that. Canva Live, native quizzes, and forms. They are stable and require no prompts at all.

When do you use what we learned today? When you need a custom interaction. When you want someone to explore a specific argument, or visualize your own unique data in a way that standard templates cannot support.

### Slide 16 — Where to Go Next (78:00)
So, where do we go from here?

First, keep your handout. Those prompts are templates. Swap out the content, but keep the structure. I have also added a short Canva AI recap there, so if you want to revisit the bigger picture later, you can.

Second, start building a personal library of interaction patterns. Next time you are making a presentation, ask yourself: "Could one slide be interactive?"

And finally, remember the core lesson.

### Slide 17 — You Can Start with a Free Account (79:00)
One quick practical note before we wrap up.

Everything we covered today works with a free Canva account. You do not need a paid plan to practise this workflow, build a first widget, or embed it into a presentation.

If you later decide you want premium templates, brand kits, or extra media assets, you can explore those on your own terms. But do not let that question slow you down.

The important thing is to start small, build one useful interactive slide, and decide on extra tools only when you know what problem they solve.

Alright, let us finish up.

### Slide 18 — Thank You (80:00)
Ninety minutes ago, most of us were making static slides.

Now you have taken plain English, guided an AI, and built a custom interactive component.

What we practiced today is not just a trick for making better slides. We are at a turning point. More and more of our work, designing, analyzing, building, will follow this same pattern: you express what you need, and AI helps you make it real. The people who thrive will not be the ones who learn every tool. They will be the ones who can think clearly about what they want and communicate it precisely.

Remember: the new skill is not coding. It is knowing what you want and saying it clearly.

Thank you for your time, and keep experimenting. I will stay for a few minutes if anyone has questions about their work, whether that is about Canva AI, Canva Code, or the things you built today. Have a great afternoon.

*Optional Q&A / individual troubleshooting until 90:00.*