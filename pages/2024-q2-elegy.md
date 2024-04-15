
### [Index](../README.md) -> Q2 2024, Elegy

## 15th of April, 2024

As of recently, the Elegy team has officially gotten a new member! A friend of mine, Amara, is gonna contribute to the tooling and stuff which is very epic.

### The Great Discombobulation

A big change happened again. The engine subsystems have become separated from the engine. Now the engine is basically an application framework, and using code generation it automatically initialises and launches various engine subsystems.

This way tools will only use what they need from the engine, and won't pull unnecessary dependencies with them, reducing needed filesize and stuff.

### Hybrid ECS

> A couple weeks ago I experimented with a hybrid ECS that supports Source-style entity OOP... now I've thought up of a concept that might just make that obsolete. My idea for entity components was basically twofold: massive data processing and entity traits.

I experimented with the entity parsing a bit further, and was able to elegantly make it work using code generation. It's very powerful, I must say!

Now I can define an entity component:
```cs
public struct Door
{
	public float Angle { get; set; } = 90.0f;
	public float Speed { get; set; } = 90.0f;
	public bool Locked { get; set; } = false;
}
```

And in the map you may have:
```
{
	"classname" "func_door"
	"Door.Angle" "90"
	"Door.Speed" "120"
	"Door.Locked" "1"
}
```

Congrats! A door that will never ever open. I did also think about triggering and stuff, I even went ahead to modify TrenchBroom a bit so I can have autocompletion for these triggerable events, e.g. `mydoor.Open()` can be a valid keyvalue. However I need to experiment more.

### Catching up

Moving on, I'm gonna do a mini review of the last quarter.

> I would like to use Recast, however I'd need to write C# bindings and some parts of the API look a lil' tricky.

Good news is, there is DotRecast! It is even a C# port, not just bindings.

> Anyway this is roughly what I wanna do for the next month:
> * set up a shader pipeline (without the [polyshader stuff](https://github.com/ElegyEngine/ElegyEngine/blob/master/docs/ideas/MaterialTemplatesPolyshaders.md), that's for later)
> * load PNG textures
> * load GLTF models (without animations)
> * make the map compiler use the engine as a library, so we don't need two separate implementations of the material & virtual filesystem
> * load levels again & fly around in em

> Now I gotta make the render backend & frontend play well with this, and eventually get to loading some textures and models. This is gonna be fun.

This is done until the map compiler part. I have a shader pipeline, PNG loading, GLTF loading, literally all I gotta do to render entities now is: create pipelines and use the correct pipeline depending on the material & render pass. That's literally it, can be done in like an hour.

Right now I am not exactly satisfied with the renderer API. It is more on a proof of concept level and needs a lot of fleshing out. I'd like to move some things over to the `RenderSystem` module, to avoid code duplication. I'll need to define a clear purpose of render frontend plugins.

The part that needs to be handled by the engine is definitely the link between shaders and materials, as well as managing GPU resources (materials, textures, meshes). Currently all of that is done in the plugin, which means each of them (`Render99`, `Render2004` etc.) will have their own copy of that. Code duplication bad, must avoid!

> Then in April:
> * make the developer console work again
> * implement CVars
> * integrate BepuPhysics
> * write a basic and decent enough player controller
> * load and play back basic animations

Now unfortunately this was planned for April and is probably getting moved to May/June if we're gonna be realistic.

Nonetheless, it's gettin' done. We're gonna rewrite the old dev console using `spectre.console` and Elegy's app framework, and that will allow faster development. No more going back'n'forth between the C# code and C++ code, manually parsing the network messages, none of that.

It's pretty important to develop this external console, since we don't have a UI yet. So there's no "start game" button.

### Conclusion

It's been a massive month for Elegy and some really good changes have happened that will FINALLY let me propel it in the direction I've always wanted to. I imagine the next couple of months will be all about rendering, the map compiler and a bit of physics and the console stuff.
