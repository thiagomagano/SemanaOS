const crypto = require("crypto");
const connections = require("../database/connection");
// const knexfile = require("../knexfile");

module.exports = {
  async index(req, res) {
    const ongs = await connections("ongs").select("*");

    return res.json(ongs);
  },

  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString("HEX");

    await connections("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });
    return res.json({ id });
  },
};
