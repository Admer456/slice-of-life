# Chapter 1: Introduction

So, you have decided to - bravely so - dive into TrenchBroom's code, whether it's to add a feature, enhance support for your game/engine, or to fix a bug. You can start by finding the source code on the [TrenchBroom GitHub repository](https://github.com/TrenchBroom/TrenchBroom).

There's a few things you gotta know before deciding on a serious change.

## Main or fork?

If you're just fixing a bug or providing a minor enhancement, you probably do not need to read this section. However, if you are going to author a feature pertaining to the following:
* New or improved editing tools
* Structural, UI changes etc.
* File format changes (e.g. extending the FGD format)

You need to ask yourself: does this idea fit TrenchBroom's vision?

:::note[Keep in mind!]
Before I continue with this thought, I must note that what follows is just **my** personal view of what roughly fits and what doesn't fit the "TrenchBroom philosophy", so to speak. I'm just maintaining an unofficial form of documentation for a tool that I like using and contributing to.

If you're in doubt, you can always open an issue on GitHub and have a conversation with the author - quite possibly the best thing to do anyway.
:::

Basically, the reason for this is TrenchBroom's *core* target audience, that is Quake mappers. If your feature or design in any way worsens compatibility with Quake, there is a far less chance that your PR will be accepted.

So for example, if you were to completely change how triggers/targets work in TB, that is most appropriate for a fork. Maintaining your own TB fork has its own pros (complete freedom) and cons (catching up with the occasional major TB update).

Another aspect is from a workflow, or UX design perspective. TrenchBroom's main thing is doing everything in 3D dominantly with the mouse and keyboard modifiers. If you are going to add an editing feature in 3D, and you require the user to type in some numbers, it may conflict with the design ideology, and your PR may be less likely to be accepted.

From a code and design POV, it should be simplistic, maintainable, and in case of more complex features, configurable and generic. This is pretty important stuff to consider, because keep in mind, if you decide to open a PR, you are changing TB for *everybody*. You're changing TB for me too.

Ultimately it's up to you. If you're after a highly specialised set of features that won't benefit TB's core audience, but will *highly* benefit your own project, absolutely go for a fork. I probably don't even need to tell you this!

:::warning[TODO]
Provide some example PRs.
:::
