
### [Index](../README.md) -> Q1 2024, Elegy

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

Other than that, I've been de-Godot-ifying the engine a little bit. I'm sad to have to say goodbye to that glorious UI system, but alas. It'll be worth the sacrifice, and I can't wait to play with BepuPhysics in February.
