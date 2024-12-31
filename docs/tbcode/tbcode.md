# TrenchBroom Programming Guide

Hello! Hello and welcome.

**TrenchBroom** is a fabulous level editor, built primarily for Quake, but extended over the years to support other Quake games, Half-Life and even beyond that. However, one problem I've seen - repeatedly so - is people finding the code very complicated, clever, over-engineered, and all kinds of similar adjectives. Some claimed that was the reason they didn't want to modify it for their needs, engines, projects. I understand it personally, but at the same time I also disagree.

I believe a decent amount of people would greatly benefit from a guide. TrenchBroom's architecture, basic ins and outs, together with some examples, would help people get into the codebase. This would help people integrate it better with their engines, possibly improve TB's core and ultimately help enhance *[insert game/engine here]* support too, depending on the person.

## Humble beginnings

My first TB code expedition was in March 2021, when I prototyped a tool to "pick" target entities in the view. In November that year, I tried fixing its portal file parser to support Half-Life's, or more specifically, Vluzacn's Half-Life Tools' version of portal files. In 2023 I opened my first pull request, and it was about default keyvalues in the FGD. TrenchBroom wasn't setting those, and it was crucial for HL and its compilers for those to be set.

The PR itself was more of a WiP for discussion, but KDuske was quick to understand what I was trying to do and, he rewrote it with his far better knowledge of TB's API, because I mean, of course, he's the one who designed it! It felt like an honour to me, it was a huge step for Half-Life support.

These days I am prototyping a file browser for asset paths, prototyping other things to enhance Half-Life support, and toying around with the idea of a Source-style IO editor. I am still no expert on TB's code, however I understand it a lot more than before, enough to the point I can write a few pages about it.

## Chapters

:::note
This is an early work in progress! Written chapters have links attached to them.  
Further work will also be done to enhance navigation. More sub-chapters will be added over time as the guide is more fleshed out.
:::

This guide comes in a few chapters, each covering a different aspect of the codebase, and occasionally non-code stuff as well.

1. [Introduction](tbcode/chapter1/chapter1.md) (90%) - Some philosophy, prerequisites, building etc.
2. [Overview](tbcode/chapter2/chapter2.md) (80%) - Architectural overview and software design patterns
3. Assets and IO - How TB handles entity definitions (FGD etc.) and file formats
4. Model - All entities, brushes and how they work
5. [View](tbcode/chapter5/chapter5.md) (60%) - Core layout, event loop, editing tools, panels, commands etc.
6. Renderer - How TB renders the map
7. Bite-sized examples - Simple file browser, user-friendly keyvalue names, custom grid size, custom brush editing tool etc.
