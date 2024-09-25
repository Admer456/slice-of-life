---
slug: 2024-q2-misc
date: 2024-04-15
authors: [admer456]
tags: [life, legacy]
---

# Q2 2024, Miscellaneous

## 15th of April, 2024

Wew. I'm happy to say I've already reached a few goals I set for myself in January:
* mental health good
* started a HL mapping series
* got a real good microphone & audio interface
	* and a guitar
* started making videos in 1080p

Elegy is en route to becoming more and more usable, so that's cool. <!-- truncate -->

For a little while, I'll hardly be making any money, don't have much to work on at my job since we finished a project recently. Not really good for my attic renovation project, but that's okay, I'm in no hurry there. I do have some other things to do, so I'll try to make a couple bucks by May.

### YouTube stuff

The series "GoldSRC Mapping" has finally started. The first video "Wanna make maps?" got some 16k views, so I'm 100% certain it's a good direction to go in. I also really like some of the new editing details I started putting in, so I think I'll keep doing them.

I'd love to pick up the moss mod or software water mod around May or so. I really gotta finish those eventually. We now have workarounds for the 25th anniversary update, so like, yeah.

## 3rd of May, 2024

Mental health dipped for a week; I'm fine now. Got assigned a new project at work, so at least that's kept me busy.

I'm thinking about working on the next video in the mapping series, so we'll see how that goes. I haven't used my mic in a while...

### PCVR and its hurdles
I finally fixed the issue I had with VRChat under Virtual Desktop. TL;DR VRChat uses a custom file for controller bindings, which it downloads from a `vr-input-workshop` URL. This is spelled out in `steamapps.vrmanifest` and is overwritten every time you start a VR game - at least I think. But SteamVR certainly overwrites it.

Using winDbg, I spied on vrserver.exe and found out it crashes when it tries to load from that URL. The fix was to remove the bindings entry from `steamapps.vrmanifest` entirely, so it falls back to loading them from a file provided by SteamVR. Fabulous!

I can now say goodbye to Pico Connect, which has been vastly inferior to Virtual Desktop as a wireless PCVR streaming solution.

### The attic and its furniture
So I bought some furniture recently. A desk and a corner shelf. I finally have some free space on my main desk, as I've moved much of the stuff to the other desk. Stuff that used to be on a clothes drying rack next to me, is now on the shelves, including my steering wheel. The wheel itself nicely occupies one whole panel on the shelf.

The nice thing is, I now have some workspace. If I wanna maintain my guitar, or work with electronics and such, I can do so on the new desk. No more need to go out of the room and use the uncomfy chairs in the kitchen, or the ultra-low coffee table in the living room. Those days are gone now.

## 8th of May, 2024

I've been playing quite a bit of Prey (2017) and Abiotic Factor. First, I must say Prey is an absolute masterpiece and am extremely disappointed that its developing studio, Arkane Austin, is shut down. The chance of getting a Prey sequel went from slim to none. I usually avoid modernday games like the plague (mainly because they have a tiny "fun per GB" ratio) but this is a huge. HUGE. Exception. Shame.

Anyway... Abiotic Factor is apparently set in Australia! This explains why there are monsters in the game. Wowie! Despite the game being on Unreal Engine 5 (which IMO is its only true flaw - everything else can be solved through time), I love it.

Other than that, today I wrote the script for my next HL mapping video. It's about compiling and troubleshooting issues related to that. The next one's gonna be about making basic shapes and props outta brushes, and then I'm making a HL programming video again. Probably throwing a Status 456 somewhere in between there.

Got a lot of stuff to potentially talk about there. VR, Assetto Corsa mods, the guitar, but honestly I'm not making one until I get the moss mod into a "demo" releasable state.
