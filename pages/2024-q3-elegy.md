
### [Index](../README.md) -> Q3 2024, Elegy

## 3rd of September, 2024

Very epic news! If we look back at April this year:

> Congrats! A door that will never ever open. I did also think about triggering and stuff, I even went ahead to modify TrenchBroom a bit so I can have autocompletion for these triggerable events, e.g. `mydoor.Open()` can be a valid keyvalue. However I need to experiment more.

You'll notice I didn't exactly have triggering implemented. I only *thought* about it. Well GUESS WHAT.

### Hybrid ECS: The Sequel

I have extended `fennecs` with my own stuff on top, in a separate library which I might as well release in its own NuGet package! Eventually.

```cs
[Component]
[Requires<AudioSource>] // for door sounds, duh!
[Requires<Transform>]
public partial struct Door
{
	public float CurrentAngle { get; set; } = 0.0f;

	[Property] // gets initialised from map data
	public float Angle { get; set; } = 90.0f; // opens up to 90 degrees by default

	[Property]
	public float Speed { get; set; } = 120.0f; // opens at a rate of 120 deg/sec by default

	[Property]
	public Output OnFullyOpened { get; set; }

	[Property]
	public Output OnFullyClosed { get; set; }

	[Input] // this Open thingy can be called by some trigger entity in the map!
	public void Open()
	{
		... // do your magic here
		OnFullyOpened.Fire();
	}

	[Event<Player.UseEvent>]
	public void OnPlayerUse( Player.UseData data ) => Open();

	[GroupEvent<Entity.ServerUpdateEvent>]
	public static void UpdateAllDoors( Entity.ServerUpdateData data,
		ref Door door, ref Transform transform )
	{
		... // do your magic here
		door.CurrentAngle += data.Delta * door.Speed; // or minus if it's closing, whatever
	}
}
```

I'm saved by a very powerful little thing called code generation. I wanted to mess with codegen since Elegy was on .NET 6, however I didn't quite get the full hang at first. A little while later, I figured out how to do things with the C# syntax nodes, and now I have some very epic capabilities. Let's see what kinds of things we've got here:
* **`Component`** - tells the codegen that this is a complex game component. Complex, in the sense that it has event handling, serialisable properties and so on
* **`Requires<T>`** - tells the codegen to spawn `T` when this component is created via `entity.Create<T>()`
* **`partial struct`** - these components are typically structs/value types for performance, and they gotta be `partial` due to codegen
* **`Property`** - this member is a map property. Soon enough we'll also have attributes for savegames and networking: `[Property, Networked, Saved]`
* **`Output`** - a special object that contains Source-style IO data, i.e. a list of entities to trigger and their inputs and time delays. It's initialised from the map file's entity data, with a custom parser that is outside of the ECS extension library. (via `IEntityProperty`)
* **`Input`** - marks a method as a usable entity input event, also related to Source-style IO. This is typically the target of an output.
* **`Event<T>`** - this method responds to entity event `T`. Entity events can be defined by any entity and called: `entity.Dispatch<T>( data );`. An entity may have multiple different components that react to the same event, and this is where the beauty lies.
* **`GroupEvent<T>`** - this method is called when batch processing all components of a certain type: `world.Dispatch<T>( data );`. The 1st parametre is the event data, and all following parametres are the components you're going to query! And yes. Any component type can uniquely respond to these group events.

Some QoL ideas:
* You should be able to put multiple type parametres into `Requires`, e.g. `[Requires<Transform, AudioSource, Mesh>]` etc.
* A way to handle default values for custom properties, shown below.
* More custom properties like `AudioEvent`:

```cs
[Property( Default = "sound/doors/open1.wav" )]
public AudioEvent OpeningSound { get; set; }

[Property( Default = "sound/doors/close1.wav" )]
public AudioEvent ClosingSound { get; set; }

...

OpeningSound.Play();
```

### The rest

I wrote about this a bit more [at Knockout](https://knockout.chat/thread/58267). TL;DR the map compiler now outputs glTF with the `.elf` extension so I can import the map seamlessly into Blender, and I have a basic client-server model in the works.

I gotta fork TrenchBroom soon enough, too. It's about time I've added an IO smart editor and file browsing.

Oh and yeah, did I mention how test-friendly this whole approach is? I can test my ECS extensions super easily as well as individual components.

### What's next

A lot. I need to write a bunch of components now, and work on the clientside presentation layer. I'd like to have a `Mesh` component which overrides some type of `RenderEvent`. I'm thinking something like this:

```cs
[Component]
[Requires<Transform>]
public partial struct Mesh
{
	// This is another custom entity property that
	// gets initialised from a string
	[Property]
	public RenderMeshHandle RenderObject { get; set; }

	// This could've been a group event, however,
	// there is occlusion culling going on
	[Event<RenderWorld.RenderEvent>]
	public void OnRender( RenderWorld.RenderData data )
	{
		var renderer = data.Renderer;
		renderer.SubmitMesh( RenderObject.Mesh );
	}

	// Very important this one!!!
	// Everything physical relies on the transform,
	// rigid bodies will have something similar
	[Event<Transform.UpdateEvent>]
	public void OnTransformUpdated( Transform.UpdateData data )
	{
		RenderObject.Position = data.NewPosition;
		RenderObject.Orientation = data.NewOrientation;
	}
}
```

So yeah. BepuPhysics, rendering the world etc., gotta do all that now. Also gotta do something about UI. Yeah. We're really getting into the fun stuff now.
