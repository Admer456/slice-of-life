
### [Index](../../README.md) -> [TrenchBroom Programming Guide](../2024-tbcode.md) -> Chapter 2: Architectural overview

# Overview

Okay, so, you've cloned and built TrenchBroom. Now what? Well, the code is in `common/src`, so go there and we'll talk more.

Everything more or less begins in `TrenchBroomApp`, more specifically here:
```cpp
TrenchBroomApp::TrenchBroomApp(int& argc, char** argv)
  : QApplication{argc, argv}
{
  using namespace std::chrono_literals;
//...
  if (!initializeGameFactory())
  {
    QCoreApplication::exit(1);
    return;
  }

  loadStyleSheets();
  loadStyle();

  // these must be initialized here and not earlier
  m_frameManager = std::make_unique<FrameManager>(useSDI());

  m_recentDocuments = std::make_unique<RecentDocuments>(
    10, [](const auto& path) { return std::filesystem::exists(path); });
//...
}
```

However, TrenchBroom is fairly complex, so starting from here without much context is a little hard. Onto the next section, please!

## Architecture

TrenchBroom consists of a few layers and modules:
* Common code - `Color`, `TrenchBroomApp` and others are there. This is the heart of TB.
* **View** layer - All of the UI and user input-related code. Actions, commands and tools are also here.
* **Model** layer - All "business" stuff is here. Brush nodes, entity nodes, validation and so on.
* **Assets** module - Internal data formats! Things like colour palettes, 3D models and other resources and definitions.
* **IO** module - Files, virtual file systems, and format readers, writers and parsers. TrenchBroom supports plenty of formats, so this is quite extensive.
* **EL** module - TrenchBroom's own expression language, used in entity property definitions and the compile dialog.
* **Renderer** layer - Finally, the one responsible for drawing the 2D and 3D viewports. It uses OpenGL 3.x to draw geometry and text in the world.

TrenchBroom can be essentially described as having a Model-View-Controller design, where View is augmented with a 2D and 3D renderer.

Chances are, you will spend a lot of your time in View and IO! At least I know I did. If you'd like to explore these in more detail, go back to the main page and select one of the chapters you're interested in.

## TrenchBroom API vs. Qt API

If you're new to Qt, you may find this section useful. As a rule of thumb, any type prefixed with `Q` is part of Qt, and in View, TrenchBroom can sometimes use more Qt types than its own. When I say that, I don't mean Qt's UI components, but rather more "primitive" types like `QString` and `QColor`. Let me give you an example, the `SmartColorEditor`:

```cpp
class SmartColorEditor : public SmartPropertyEditor
{
  Q_OBJECT
private:
  static const size_t ColorHistoryCellSize = 15;
  using wxColorList = std::vector<QColor>;

  QRadioButton* m_floatRadio;
  QRadioButton* m_byteRadio;
  ColorButton* m_colorPicker;
  ColorTable* m_colorHistory;
//...
  void setColor(const QColor& wxColor) const;

  void floatRangeRadioButtonClicked();
  void byteRangeRadioButtonClicked();
  void colorPickerChanged(const QColor& color);
  void colorTableSelected(QColor color);
};
```

> Fun fact: TrenchBroom used wxWidgets before switching to Qt around 2019.

This here is done out of convenience, most likely. The colour picker dialog already works with `QColor`, so it might as well be used internally here too. It's a small class, doesn't really do much, so it's not a problem to maintain. If we dive a bit into `setColor`:
```cpp
void SmartColorEditor::setColor(const QColor& color) const
{
  const auto colorRange =
    m_floatRadio->isChecked() ? Assets::ColorRange::Float : Assets::ColorRange::Byte;
  const auto value = Model::entityColorAsString(fromQColor(color), colorRange);
  document()->setProperty(propertyKey(), value);
}
```
You will notice that it converts the `QColor` into a `TrenchBroom::Color` before finally converting it into a string.

`fromQColor` is one of the many utilities found in `View/QtUtils`. Here are some other ones:
* `centerOnScreen` - centers a UI element
* `makeEmphasized` - makes a label **bold**
* `createBitmapButton` - does exactly what it says
* `createSearchBox` - creates a little textbox with an accompanying search icon



## Design patterns

Some notable patterns in TB include: Adapter, Command, Facade and the Visitor pattern.

*TODO: write this section further with examples*
