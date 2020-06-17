const connections = require("../database/connection");
const { create } = require("./OngController");
const { response } = require("express");

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const ong = await connections("ongs")
      .where("id", id)
      .select("name")
      .first();

    if (!ong) {
      return res.status(400).json({ error: "no ong ound with this id" });
    }

    return res.json(ong);
  },
};
