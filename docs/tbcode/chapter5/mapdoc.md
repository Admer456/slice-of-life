---
sidebar_position: 1
---

# MapDocument

I keep mentioning this `MapDocument` thing, so what is it really?

Here are some of its most important members:

```cpp
class MapDocument : public Model::MapFacade, public CachingLogger
{
//...
protected:
  vm::bbox3 m_worldBounds;
  std::shared_ptr<Model::Game> m_game;
  std::unique_ptr<Model::WorldNode> m_world;
//...
  std::unique_ptr<Assets::ResourceManager> m_resourceManager;
  std::unique_ptr<Assets::EntityDefinitionManager> m_entityDefinitionManager;
  std::unique_ptr<Assets::EntityModelManager> m_entityModelManager;
  std::unique_ptr<Assets::MaterialManager> m_materialManager;
  std::unique_ptr<Model::TagManager> m_tagManager;

  std::unique_ptr<Model::EditorContext> m_editorContext;
  std::unique_ptr<Grid> m_grid;
//...
  Model::NodeCollection m_selectedNodes;
  std::vector<Model::BrushFaceHandle> m_selectedBrushFaces;
//...
};
```

There is so much other stuff in there too, including:
* Actions for tags - e.g. hiding a particular texture category, or a particular classname
* Current path of the map project
* Notifiers for all kinds of things - e.g. `selectionDidChangeNotifier`. Other UI components connect to these to react to map editing events

Also, let's not forget the wealth of methods! Here are some you may find interesting:
```cpp
  Logger& logger();

  std::shared_ptr<Model::Game> game() const override;
  const vm::bbox3& worldBounds() const;
  Model::WorldNode* world() const;
//...
  Model::EditorContext& editorContext() const;

  Assets::EntityDefinitionManager& entityDefinitionManager() override;
  Assets::EntityModelManager& entityModelManager() override;
  Assets::MaterialManager& materialManager() override;

  Grid& grid() const;

  Model::PointTrace* pointFile();
  const Model::PortalFile* portalFile() const;
//...
  bool hasSelection() const override;
//...
  std::vector<Model::EntityNodeBase*> allSelectedEntityNodes() const override;
//...
  std::vector<Model::BrushNode*> allSelectedBrushNodes() const;
//...
  void deleteObjects() override;
  void duplicateObjects() override;
//...
  Model::EntityNode* createPointEntity(
    const Assets::PointEntityDefinition* definition, const vm::vec3& delta) override;
  Model::EntityNode* createBrushEntity(
    const Assets::BrushEntityDefinition* definition) override;
//...
  bool translateObjects(const vm::vec3& delta) override;
  bool rotateObjects(
    const vm::vec3& center, const vm::vec3& axis, FloatType angle) override;
  bool scaleObjects(const vm::bbox3& oldBBox, const vm::bbox3& newBBox) override;
//...
  bool createBrush(const std::vector<vm::vec3>& points);
  bool csgConvexMerge();
  bool csgSubtract();
  bool csgIntersect();
  bool csgHollow();
//...
  bool setProperty(
    const std::string& key,
    const std::string& value,
    bool defaultToProtected = false) override;
  bool renameProperty(const std::string& oldKey, const std::string& newKey) override;
  bool removeProperty(const std::string& key) override;
```

Okay, I think we get it by now. You can do basically *everything* using `MapDocument`. Anything you can possibly imagine.

:::warning
This is actually not a very good thing, architecturally speaking! This class has too many responsibilities.

`MapDocument` got so large that KDuske wrote [an issue](https://github.com/TrenchBroom/TrenchBroom/issues/3617) about this, and at the time of writing, it seems to be planned for the "Next" milestone.

TrenchBroom is in active development, and therefore it is not unreasonable to think that `MapDocument` may change in a couple of releases. It may get split up, `MapFacade` may get removed and so on. In either case, if and when this happens, I'll be sure to update this guide. :3
:::

:::info
One thing that's important to mention is that `MapDocument` is a bit like a state machine. If you call:
```cpp
document()->setProperty( "example_key", "example_value" );
```
...it will perform that operation on all selected entities! This design has its pros and cons, which we'll discuss later when we get into creating custom editing tools and such.
:::

