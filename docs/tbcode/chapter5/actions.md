---
sidebar_position: 2
---

# Actions

Actions in this context are *basically* executable objects with an associated name and shortcut.

```cpp title="Actions.h"
class Action
{
protected:
  QString m_label;
  std::filesystem::path m_preferencePath;
  ActionContext::Type m_actionContext;
  QKeySequence m_defaultShortcut;
  std::filesystem::path m_iconPath;
  QString m_statusTip;
```

They are executable because, well:
```cpp
  virtual void execute(ActionExecutionContext& context) const = 0;
  virtual bool enabled(ActionExecutionContext& context) const = 0;
  virtual bool checkable() const = 0;
  virtual bool checked(ActionExecutionContext& context) const = 0;
```

`Action` itself is a base class, and at the moment it only has one subclass: `LambdaAction`. So, in practice, actions are basically function pointers with names.

```cpp title="Actions.h"
/**
 * ExecuteFn has type ActionExecutionContext& -> void
 * EnabledFn has type ActionExecutionContext& -> bool
 * CheckedFn has type ActionExecutionContext& -> bool
 */
template <class ExecuteFn, class EnabledFn, class CheckedFn>
class LambdaAction : public Action
{
private:
  ExecuteFn m_execute;
  EnabledFn m_enabled;
  CheckedFn m_checked;
  bool m_checkable;
```

It's worth noting that actions are present in lots of places:
* Toolbar (brush tool, clipping tool etc.)
* Menus (File, Edit, Tools etc.)

## Action manager

TB uses a singleton to create and manage actions.

```cpp title="Actions.h"
class ActionManager
{
private:
  /**
   * All actions which are used either in a menu, a tool bar or as a shortcut.
   * Indexed by preference path.
   */
  std::map<std::filesystem::path, std::unique_ptr<Action>> m_actions;

  /**
   * The main menu for the map editing window.
   * These will hold pointers to the actions in m_actions.
   */
  std::vector<std::unique_ptr<Menu>> m_mainMenu;

  /**
   * The toolbar for the map editing window. Stored as a menu to allow for separators.
   * These will hold pointers to the actions in m_actions.
   */
  std::unique_ptr<Menu> m_toolBar;

```

It is accessed via `ActionManager::instance()`. Let's see how the menu actions (for File, Edit, Tools etc.) are handled.

```cpp title="KeyboardShortcutModel.cpp"
void KeyboardShortcutModel::initializeMenuActions()
{
  MenuActionVisitor visitor(m_actions);
  const auto& actionManager = ActionManager::instance();
  actionManager.visitMainMenu(visitor);
}
```

So, for example, this is what `visitMainMenu` does:

```cpp title="Actions.cpp"
void ActionManager::visitMainMenu(MenuVisitor& visitor) const
{
  for (const auto& menu : m_mainMenu)
  {
    menu->accept(visitor);
  }
}
//...
void Menu::accept(MenuVisitor& visitor) const
{
  visitor.visit(*this);
}
```

Well, that doesn't tell us much. Since this is the visitor pattern, what matters is the visitor itself, not the thing being visited:

```cpp title="MapFrame.cpp"
void MapFrame::createMenus()
{
  auto menuBuilder =
    MainMenuBuilder{*menuBar(), m_actionMap, [this](const Action& action) {
                      auto context = ActionExecutionContext{this, currentMapViewBase()};
                      action.execute(context);
                    }};

  const auto& actionManager = ActionManager::instance();
  actionManager.visitMainMenu(menuBuilder);
```

Now that gives us a much better idea. Let's see what `MainMenuBuilder` actually does.

```cpp
void MainMenuBuilder::visit(const Menu& menu)
{
  auto* parentMenu = m_currentMenu;
  if (m_currentMenu == nullptr)
  {
    // top level menu
    m_currentMenu = m_menuBar.addMenu(QString::fromStdString(menu.name()));
  }
  else
  {
    m_currentMenu = m_currentMenu->addMenu(QString::fromStdString(menu.name()));
  }

  if (menu.entryType() == MenuEntryType::Menu_RecentDocuments)
  {
    recentDocumentsMenu = m_currentMenu;
  }

  menu.visitEntries(*this);
  m_currentMenu = parentMenu;
}
```

`MainMenuBuilder` basically creates menu entries for actions. The actions themselves are created by the action manager:
```cpp title="Actions.cpp"
void ActionManager::createMenu()
{
  createFileMenu();
  createEditMenu();
  createViewMenu();
  createRunMenu();
  createDebugMenu();
  createHelpMenu();
}

void ActionManager::createFileMenu()
{
  auto& fileMenu = createMainMenu("File");
  fileMenu.addItem(createMenuAction(
    std::filesystem::path{"Menu/File/New"},
    QObject::tr("New Document"),
    QKeySequence::New,
    [](ActionExecutionContext&) {
      auto& app = TrenchBroomApp::instance();
      app.newDocument();
    },
    [](ActionExecutionContext&) { return true; }));
  fileMenu.addSeparator();
  fileMenu.addItem(createMenuAction(
    std::filesystem::path{"Menu/File/Open..."},
    QObject::tr("Open Document..."),
    QKeySequence::Open,
    [](ActionExecutionContext&) {
      auto& app = TrenchBroomApp::instance();
      app.openDocument();
    },
    [](ActionExecutionContext&) { return true; }));
    //...
```

## Recap

Right, so, this was a tad convoluted, here's a quick recap:

1. Actions are executable objects.
2. Actions are created by `ActionManager`.
3. UI elements for actions are created by various visitors.

That's basically all you need to know about them!
