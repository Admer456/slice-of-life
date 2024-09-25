---
slug: 2024-q1-elegy
date: 2024-01-24
authors: [admer456]
tags: [elegy, legacy]
---

# Q1 2024, Elegy

## 24th of January, 2024

A couple weeks ago I experimented with a hybrid ECS that supports Source-style entity OOP... now I've thought up of a concept that might just make that obsolete. My idea for entity components was basically twofold: massive data processing and entity traits.

Entity traits would "inject" functionality into entities, and honestly, I think this is just the way to go. FGD files would become entity archetype descriptions at that point:
```
@BaseClass = Door
[
	Door.Angle(string) : "Open-close angle"
	...
]

@SolidClass base( Door ) = func_door
[]

@PointClass base( Door, Model ) = prop_door
[]
```

<!-- truncate -->

Other than that, I've been de-Godot-ifying the engine a little bit. I'm sad to have to say goodbye to that glorious UI system, but alas. It'll be worth the sacrifice, and I can't wait to play with BepuPhysics in February.

## 10th of February, 2024

Godot is really gone from Elegy now. Though, some part of it still remains, as I've adapted its maths code (with proper credits and such).

The goal for February is to render textured polygons and be able to load maps once again. Since we don't have physics, it'll just be a flying camera. BepuPhysics will come in handy soon after.

It occurred to me that there are going to be 3 particularly tacky areas to solve:
* animation
* networking
* AI logic and pathfinding

But that's for future me. Right now I envision that the animation system will feature basic animation blending and animation state machines. It will require some good tooling to get utilised, that's for sure, no way of going around it.

With networking I just want a plain old Quake-style client-server model with clientside prediction and rollback. That in itself is already a lot of work and will probably be started sometime next year.

With AI it's pure experimentation. I really want to toy around with GOAP techniques and as for pathfinding, we'll just have to see. I would like to use Recast, however I'd need to write C# bindings and some parts of the API look a lil' tricky. I think doing that is still more worthwhile than coming up with a system from scratch. Heck, Recast offers a whole baking, navigating & crowdsim solution all in one, it's too convenient not to.

But, these are all problems for future me to solve. Some of these are game-specific, some really should be part of the engine, but overall, it is what it is. A lot of work to be done.

Anyway this is roughly what I wanna do for the next month:
* set up a shader pipeline (without the [polyshader stuff](https://github.com/ElegyEngine/ElegyEngine/blob/master/docs/ideas/MaterialTemplatesPolyshaders.md), that's for later)
* load PNG textures
* load GLTF models (without animations)
* make the map compiler use the engine as a library, so we don't need two separate implementations of the material & virtual filesystem
* load levels again & fly around in em

Then in April:
* make the developer console work again
* implement CVars
* integrate BepuPhysics
* write a basic and decent enough player controller
* load and play back basic animations

May, June etc. are too far away to tell, but overall I'm aiming for a foundation for a basic FPS game template. At some point I'll need to answer the GUI question as well.

## 16th of March, 2024

Shader pipeline has been set up. There's now an `Elegy.ShaderTool` that outputs shader templates and compiled shader permutations.

Now I gotta make the render backend & frontend play well with this, and eventually get to loading some textures and models. This is gonna be fun.
