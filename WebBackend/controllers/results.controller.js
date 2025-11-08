import Result from '../models/result.model.js'

export const results = async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.json({ message: "Result saved successfully", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to save result" });
  }
}

export const checkResults = async (req, res) => {
  try {
    const { user } = req.params;
    const existing = await Result.findOne({ user: user, status: "✅ Passed"});
    if (existing) {
      return res.json({ taken: true });
    }
    res.json({ taken: false });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

export const allStudentList = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("user")
      .sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch results", details: err.message });
  }
}