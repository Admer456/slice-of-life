
### [Index](../../README.md) -> [TrenchBroom Programming Guide](../2024-tbcode.md) -> Chapter 1: Introduction

# Introduction

So, you have decided to - bravely so - dive into TrenchBroom's code, whether it's to add a feature, enhance support for your game/engine, or to fix a bug. You can start by finding the source code on the [TrenchBroom GitHub repository](https://github.com/TrenchBroom/TrenchBroom).

There's a few things you gotta know before deciding on a serious change.

## Main or fork?

If you're just fixing a bug or providing a minor enhancement, you probably do not need to read this section. However, if you are going to author a feature pertaining to the following:
* New or improved editing tools
* Structural, UI changes etc.
* File format changes (e.g. extending the FGD format)

You need to ask yourself: does this idea fit TrenchBroom's vision?

*Before I continue with this thought, I must note that what follows is just **my** personal view of what roughly fits and what doesn't fit the "TrenchBroom philosophy", so to speak. I'm just maintaining an unofficial form of documentation for a tool that I like using and contributing to. If you're in doubt, you can always open an issue on GitHub and have a conversation with the author - quite possibly the best thing to do anyway.*

Basically, the reason for this is TrenchBroom's *core* target audience, that is Quake mappers. If your feature or design in any way worsens compatibility with Quake, there is a far less chance that your PR will be accepted.

So for example, if you were to completely change how triggers/targets work in TB, that is most appropriate for a fork. Maintaining your own TB fork has its own pros (complete freedom) and cons (catching up with the occasional major TB update).

Another aspect is from a workflow, or UX design perspective. TrenchBroom's main thing is doing everything in 3D dominantly with the mouse and keyboard modifiers. If you are going to add an editing feature in 3D, and you require the user to type in some numbers, it may conflict with the design ideology, and your PR may be less likely to be accepted.

From a code and design POV, it should be simplistic, maintainable, and in case of more complex features, configurable and generic. This is pretty important stuff to consider, because keep in mind, if you decide to open a PR, you are changing TB for *everybody*. You're changing TB for me too.

Ultimately it's up to you. If you're after a highly specialised set of features that won't benefit TB's core audience, but will *highly* benefit your own project, absolutely go for a fork. I probably don't even need to tell you this!

*TODO: provide some example PRs*

## Prerequisites

So, with all the above said, what do you *need* to know and have in order to do this? Well apart from the obvious (a computer and a C++ compiler), you need a little bit of knowledge:

* **Proficiency in modern C++**
	* If you are just learning the basics of C++, TB's code will be extremely tough to understand, because it relies on you knowing so much else. Keep on improving, you'll get there!
	* If you're coming from a language like Rust, C# and such, you will very likely be fine, just gotta adapt to the quirks of C++.
	* It's very good to know things like templates, move semantics and smart pointers. The code uses quite a bit of the standard library's features.
* **Proficiency in software development**
	* Here we talk about things like interfaces, designing APIs and so on. You don't necessarily need to know SOLID or stuff like that, but having some hands-on experience applying software engineering principles will help you recognise patterns in the code.
	* Here we also talk about some software design patterns, mentioned in chapter 2 in more detail.
* **Experience in Qt or UI in general**
	* TrenchBroom uses the Qt framework for its GUI. You should know at least some UI development concepts or even better, have experience with Qt itself. If you don't know Qt, don't worry, TB utilises it in a simple way.
* **Experience using TrenchBroom itself, making maps for games**
	* While it is possible to enhance TB without ever having used it, believe me, it is much easier once you know a good part of the mapping pipeline. Context is key, and you should at least try making a couple of moderately complex Quake maps, a few triggers and monsters here'n'there just to get the idea.
	* I'll try to give a basic explanation of each concept as well as a picture or illustration, but again, context really matters.

Finally, this goes for every C++ codebase: it has its own style, so your eyes may need adjusting.

```cpp
void CompilationDialog::closeEvent(QCloseEvent* event)
{
  if (m_run.running())
  {
    const auto result = QMessageBox::warning(
      this,
      "Warning",
      "Closing this dialog will stop the running compilation. Are you sure?",
      QMessageBox::Yes | QMessageBox::No,
      QMessageBox::Yes);

    if (result != QMessageBox::Yes)
    {
      event->ignore();
      return;
    }

    stopCompilation();
  }
  saveProfile();
  event->accept();
}
```
Notable features include `auto` by default, 2 spaces per space-tab, `camelCase` methods and so on.

For comparison, this is a code style I'm more used to:
```cpp
void CompilationDialog::CloseEvent( QCloseEvent* event )
{
	if ( m_run.running() )
	{
		const int result = QMessageBox::warning(
			this,
			"Warning",
			"Closing this dialog will stop the running compilation. Are you sure?",
			QMessageBox::Yes | QMessageBox::No,
			QMessageBox::Yes
		);

		if ( result != QMessageBox::Yes )
		{
			event->ignore();
			return;
		}

		StopCompilation();
	}

	SaveProfile();
	event->accept();
}
```
Everybody has their own, and if you're new and thinking "Hmm I would love to modify the clang format file to use my style", no. Just follow the established style, it'll make keeping up with code changes easy.

## Building

Now, you may have noticed stuff like `QCloseEvent` and `QMessageBox` above, and yes, this editor uses the Qt framework. You will need to create a free Qt account and install Qt5.

You can follow the [build instructions](https://github.com/TrenchBroom/TrenchBroom/blob/master/Build.md) on the repository, however I'll summarise them here and point out a couple notes for us minimalists who want to save space.

But generally speaking, you need a C++ compiler, CMake and Qt5. You can clone the repo like so:
```
git clone https://github.com/TrenchBroom/TrenchBroom.git --recursive
```

> If you're like me, living in Bosnia with a poor Internet connection, you can also fork TB and do this:
> ```
> https://github.com/<your-gh-account>/TrenchBroom.git --recurse-submodules --depth=1
> ```
> `--depth=1` only clones the latest commit. You **must not** use `--shallow-submodules` here due to `vcpkg`, it needs a more complete Git history.

### Windows
Quite simply create a `build` directory in your cloned repo, navigate to it and:
```
cmake .. -G"Visual Studio 17 2022" -T v143 -A x64 -DCMAKE_PREFIX_PATH="C:\Qt\5.13.0\msvc2017_64"
```

`CMAKE_PREFIX_PATH` needs to point to your Qt installation. Make sure you have a pretty recent version of CMake else `vcpkg` will attempt to download it... in either case, `vcpkg` will take care of the rest.

### Linux
On Debian-based distros you need:
```
sudo apt-get install g++ qtbase5-dev libqt5svg5-dev libxi-dev libgl1-mesa-dev libglu1-mesa-dev freeglut3-dev mesa-common-dev libglew-dev libxrandr-dev build-essential libglm-dev libxxf86vm-dev libfreetype6-dev libfreeimage-dev libtinyxml2-dev pandoc cmake p7zip-full ninja-build curl
```

And then it's similar to the above:
```
cmake .. -DCMAKE_BUILD_TYPE=Debug -DCMAKE_PREFIX_PATH="cmake/packages"
```

For the other details (and building on Mac - I don't have one of those), refer to the official [build guide](https://github.com/TrenchBroom/TrenchBroom/blob/master/Build.md) on TB's repository.
