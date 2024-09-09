
### [Index](../README.md) -> TrenchBroom Programming Guide

# TrenchBroom Programming Guide

Hello! Hello and welcome.

**TrenchBroom** is a fabulous level editor, built primarily for Quake, but extended over the years to support other Quake games, Half-Life and even beyond that. However, one problem I've seen - repeatedly so - is people finding the code very complicated, clever, over-engineered, and all kinds of similar adjectives. Some claimed that was the reason they didn't want to modify it for their needs, engines, projects. I understand it personally, but at the same time I also disagree.

I believe a decent amount of people would greatly benefit from a guide. TrenchBroom's architecture, basic ins and outs, together with some examples, would help people get into the codebase. This would help people integrate it better with their engines, possibly improve TB's core and ultimately help enhance *[insert game/engine here]* support too, depending on the person.

## Humble beginnings

My first TB code expedition was in March 2021, when I prototyped a tool to "pick" target entities in the view. In November that year, I tried fixing its portal file parser to support Half-Life's, or more specifically, Vluzacn's Half-Life Tools' version of portal files. In 2023 I opened my first pull request, and it was about default keyvalues in the FGD. TrenchBroom wasn't setting those, and it was crucial for HL and its compilers for those to be set.

The PR itself was more of a WiP for discussion, but KDuske was quick to understand what I was trying to do and, he rewrote it with his far better knowledge of TB's API, because I mean, of course, he's the one who designed it! It felt like an honour to me, it was a huge step for Half-Life support.

These days I am prototyping a file browser for asset paths, prototyping other things to enhance Half-Life support, and toying around with the idea of a Source-style IO editor. I am still no expert on TB's code, however I understand it a lot more than before, enough to the point I can write a few pages about it.

## Chapters

*NOTE: This is an early work in progress! Most of the stuff hasn't been written, and as such, is regular text. Written chapters have links attached to them.*  
*Further work will also be done to enhance navigation. More sub-chapters will be added over time as the guide is more fleshed out.*

This guide comes in a few chapters, each covering a different aspect of the codebase, and occasionally non-code stuff as well.

1. [Introduction](tbcode/chapter1.md)
	1. [Main or fork?](tbcode/chapter1.md#main-or-fork) - Stuff you gotta consider when designing a feature
	2. [Prerequisites](tbcode/chapter1.md#prerequisites) - What you need to know *before* reading this whole thing
	4. [Building](tbcode/chapter1.md#building) - How to build TB, in summary
2. [Overview](tbcode/chapter2.md)
	1. [Architecture](tbcode/chapter2.md#architecture) - All the layers of TrenchBroom
	1. TrenchBroom API vs. Qt API - How to identify when you're looking at TB code and Qt code
	2. Design patterns - TrenchBroom employs quite a few patterns you should be aware of
3. Assets and IO
	1. Entity definitions - Adding new keyvalue types with their custom editors, or your own entity definition format
	2. Graphical assets - Enhancing or adding support for model and texture formats
	3. Filesystems
4. Model - All entities, brushes and how they work
	1. Nodes
	2. Geometry
	3. Entities
	4. Validators
5. [View](tbcode/chapter5.md) (WiP)
	1. Core layout - Where everything starts
	2. Event loop - How events are handled and where they go
	3. Map document - How View communicates with Model
	4. Editing tools - The cutting tool, the skewing tool, the brush tool and others
	5. Entity editor panel - All about entity editing
	6. Smart editors - Respond to keyvalue patterns and provide special editors for them
	7. Actions - Commands, typically accessible via keyboard shortcuts or in a UI tab
	8. Command processor - How TB handles undo/redo, among other things
6. Renderer
7. Examples
	1. Simple file browser

*TODO: more examples*
