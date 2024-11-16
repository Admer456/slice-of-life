
# Design patterns

This page is mostly some commentary on design patterns in TB. Some notable ones include: Adapter, Command, Facade and the Visitor pattern.

:::warning[TODO]
Write this section further with examples.
:::

## Adapter

Gotcha! The example code below is not a "real" adapter, as in, a class that wraps and adapts another to an interface. But still I felt it was neat to mention:

```cpp title="common/src/Model/HitAdapter.cpp"
Node* hitToNode(const Hit& hit)
{
  if (hit.type() == EntityNode::EntityHitType)
  {
    return hit.target<EntityNode*>();
  }
  else if (hit.type() == PatchNode::PatchHitType)
  {
    return hit.target<PatchNode*>();
  }
  else if (hit.type() == BrushNode::BrushHitType)
  {
    return hit.target<BrushFaceHandle>().node();
  }
  else
  {
    return nullptr;
  }
}
```

This is used in `SelectionTool::mouseClick`:
```cpp title="common/src/View/SelectionTool.cpp"
bool SelectionTool::mouseClick(const InputState& inputState)
{
  ...

  if (isFaceClick(inputState))
  {
    ...
  }
  else
  {
    const auto& hit =
      firstHit(inputState, type(Model::nodeHitType()) && isNodeSelectable(editorContext));
    if (hit.isMatch())
    {
      auto* node = findOutermostClosedGroupOrNode(Model::hitToNode(hit));
      ...
```

## Visitor

TB uses this pattern in quite a few spots, for example when writing all nodes to a file:
```cpp title="common/src/IO/NodeWriter.cpp"
  for (auto* node : nodes)
  {
    node->accept(kdl::overload(
      [](Model::WorldNode*) {},
      [](Model::LayerNode*) {},
      [&](Model::GroupNode* group) { groups.push_back(group); },
      [&](Model::EntityNode* entity) { entities.push_back(entity); },
      [&](Model::BrushNode* brush) {
        if (auto* entity = dynamic_cast<Model::EntityNode*>(brush->parent()))
        {
          entityBrushes[entity].push_back(brush);
        }
        else
        {
          worldBrushes.push_back(brush);
        }
      },
      [](Model::PatchNode*) {}));
  }
```

Now when looking at this for the very first time, I thought to myself: why not just have this as an overrideable method in the base class? This basically looks like polymorphism! That was in 2021 or so. Now I see it. That approach would just end up polluting the code for small things like these.

Let's put it in a different way: *the visitor pattern delegates polymorphism to systems instead of instances.* In this case, a system is just an object that processes a series of data, in this case brush, entity etc. nodes (the instances). When you really think about it, it kinda makes sense to move this responsibility away from the instances/data and giving it to systems instead.

But if that doesn't make sense to you, then let's just say it's a matter of principle. Here is another example:
```cpp title="common/src/BrushNode.cpp"
bool BrushNode::contains(const Node* node) const
{
  return node->accept(kdl::overload(
    [](const WorldNode*) { return false; },
    [](const LayerNode*) { return false; },
    [&](const GroupNode* group) { return m_brush.contains(group->logicalBounds()); },
    [&](const EntityNode* entity) { return m_brush.contains(entity->logicalBounds()); },
    [&](const BrushNode* brush) { return m_brush.contains(brush->brush()); },
    [&](const PatchNode* patch) { return containsPatch(m_brush, patch->grid()); }));
}
```
Oh yeah. Try solving that elegantly with virtual methods.

:::note[Side thought]
I do feel in C# this could be made even nicer with pattern matching:
```cs
public bool Contains(Node node)
	=> node switch
	{
		GroupNode group => Brush.Contains(group.LogicalBounds),
		EntityNode entity => Brush.Contains(entity.LogicalBounds),
		BrushNode brush => Brush.Contains(brush.Brush),
		_ => false
	};
```
*TrenchBroom.NET anyone?*

If only we had this in C++... `kdl::overload` is good enough though!
:::

I must say though, this approach can have its downsides. If you were to add a new node type (e.g. `TerrainNode`), you would have to go to each and every instance of visiting, and potentially add logic there. If you wanted to add all kinds of unique editable objects and tools to TrenchBroom, you could run into architectural issues partly due to this pattern.
