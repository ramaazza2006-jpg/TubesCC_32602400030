// Small helper to avoid repeating the same ownership-scoped CRUD logic
// for Course / Task / Note / Schedule, which all follow the same shape:
// each row belongs to req.userId and users can only see/edit their own rows.
function makeCrudController(Model) {
  return {
    list: async (req, res) => {
      try {
        const rows = await Model.findAll({
          where: { userId: req.userId },
          order: [["id", "ASC"]],
        });
        res.json({ success: true, data: rows });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },

    create: async (req, res) => {
      try {
        const row = await Model.create({ ...req.body, userId: req.userId });
        res.status(201).json({ success: true, data: row });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
    },

    update: async (req, res) => {
      try {
        const row = await Model.findOne({
          where: { id: req.params.id, userId: req.userId },
        });
        if (!row) {
          return res.status(404).json({ success: false, message: "Data tidak ditemukan." });
        }
        await row.update(req.body);
        res.json({ success: true, data: row });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
    },

    remove: async (req, res) => {
      try {
        const row = await Model.findOne({
          where: { id: req.params.id, userId: req.userId },
        });
        if (!row) {
          return res.status(404).json({ success: false, message: "Data tidak ditemukan." });
        }
        await row.destroy();
        res.json({ success: true });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    },
  };
}

module.exports = makeCrudController;
