const dataAccess = require("../logic/data-access");

exports.getAllCandidates = async (req, res) => {
  const { limit, offset } = req;
  let totalCandidates;
  try {
    totalCandidates = await dataAccess.count("candidate");
    if (!totalCandidates) {
      res.status(501).json({ message: "got 0 data" });
    } else {
      totalCandidates = totalCandidates.total;
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
  try {
    const data = await dataAccess.getAllData(
      "candidate",
      limit || null,
      offset || null
    );
    if (data) {
      res
        .status(201)
        .json({ candidates: data, totalCandidates: totalCandidates });
    } else {
      res.status(501).json({ message: "got no data" });
    }
  } catch (error) {
    return res.status(502).json({ error: error });
  }
};
