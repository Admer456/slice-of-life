# Building

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

Since this editor uses the Qt framework, you will need to create a free Qt account and install Qt5. You don't need Qt Creator or any of that jazz, just Qt5's Widgets library more or less.

You can follow the [build instructions](https://github.com/TrenchBroom/TrenchBroom/blob/master/Build.md) on the repository, however I'll summarise them here.

Generally speaking, you need a C++ compiler, CMake and Qt5. You can clone the repo like so:
```
git clone https://github.com/TrenchBroom/TrenchBroom.git --recursive
```

:::tip
If you're like me, living in Bosnia with a poor Internet connection, you can also fork TB and do this:
```
https://github.com/<your-gh-account>/TrenchBroom.git --recurse-submodules --depth=1
```
`--depth=1` only clones the latest commit. You **must not** use `--shallow-submodules` here due to `vcpkg`, it needs a more complete Git history.
:::

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

