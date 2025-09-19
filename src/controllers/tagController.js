import Tag from "../models/Tag.js";
import Task from "../models/Task.js";

// GET /api/tags
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/tags
export const createTag = async (req, res) => {
  try {
    const { name, user_id } = req.body;
    const tag = await Tag.create({ name, user_id });
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/tags/:id
export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tag.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Tag not found" });
    res.json({ message: "Tag deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/tasks/:id/tags/:tagId
export const addTagToTask = async (req, res) => {
  try {
    const { id, tagId } = req.params;
    const task = await Task.findByPk(id);
    const tag = await Tag.findByPk(tagId);

    if (!task || !tag) {
      return res.status(404).json({ error: "Task or Tag not found" });
    }

    await task.addTag(tag);
    res.json({ message: "Tag added to task" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};