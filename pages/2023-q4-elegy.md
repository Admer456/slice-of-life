
### [Index](../README.md) -> Q4 2023, Elegy

## 23rd of October, 2023

The material system is now a thing. It can read Quake 3-style material definitions like these:

```cpp
materials/tools/nodraw
{
	materialTemplate NoDraw
	{
		// TrenchBroom dies upon encountering quotation marks here, so do not use them
		map materials/textures/tools/nodraw
	}

	compilerParams
	{
		// Stripped away
		Nodraw 1
		// Nodraw implies that lightmap will be 0, but yeah
		Lightmap 0
		// This one will probably need tweaking. If we ever end up
		// using brushes for collision acceleration, this will have
		// to be 1.
		Collide 0
	}
}
```

Also been pondering about adding OpenXR one day. I like VR and Elegy could totally be used for VR one day. Maybe in a couple years from now. Right now since Elegy is using Godot as a backend, VR is already more than possible, but I don't wanna rely on Godot for more things than necessary.

I also fixed the level format, now the render meshes are actually written to it. I have been considering using GLTF itself with a few extensions, honestly it may just be better long-term.

In November I hope to work on the console system (CVars and commands), fix level loading, so that I can finally focus on a mini game SDK. 

## 25th of December, 2023

Level loading fixed. Console commands are now pretty damn functional, as you can have them bound to an object:
```cs
public class Game : IApplication
{
	...

	[ConsoleCommand("map")]
	public void Map( string mapName )
	{
		...
	}

	[ConsoleCommand("disconnect")]
	public void LeaveGame()
	{
		...
	}
}
```

It is currently limited to plugin implementors, it'd be a bit much work to automatically bind them every time you do `new Something()` where `Something` has these console commands. Plus there's the issue of naming them. But to be honest, if you have a scenario where you want to manipulate lots of objects via console commands, you can pass these objects as parameters to one command. `game.edit ent1.Health 20` or whatever.

Repositories have mostly been merged, 90% of stuff is in `Elegy.Engine` now. Only `DevConsoleApp` and `Elegy.Launcher` are located in their own GitHub repos. This will make it easier to work on stuff, especially for new people.

Next steps are CVars, GLTF loading, dual grid partitioning, and hopefully that'll all be done throughout January so I can work on a mini game SDK in February.
