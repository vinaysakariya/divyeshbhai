const Businfo = require("../models/routeinfo");

async function routeDetails(req, res) {
  try {
    const { date, route, to, from, price } = req.body;

    const busdetails1 = await Businfo.create({
      date,
      route,
      from,
      to,
      price,
    });
    res.status(200).json({ data: busdetails1 });
  } catch (error) {
    res.status(500).json(`error while fetching details ${error}`);
  }
}
async function routedelete(req, res) {
  try {
    // const { route } = req.body;

    const busdetails = await Businfo.findByIdAndDelete(req.params.id);
    res.status(200).json("route is deleted");
  } catch (error) {
    res.status(500).json(`error while fetching details ${error}`);
  }
}
async function routeread(req, res) {
  try {
    // const { date, route } = req.body;

    const busdetails = await Businfo.find();
    res.status(200).json({ data: busdetails });
  } catch (error) {
    res.status(500).json(`error while fetching details ${error}`);
  }
}
async function routeupdate(req, res) {
  try {
    const { date, route, to, from, price } = req.body;

    const busdetails3 = await Businfo.findByIdAndUpdate(
      req.params.id,
      {
        route,
        date,
        from,
        to,
        price,
      },
      { new: true }
    );
    res.status(200).json({ data: busdetails3 });
  } catch (error) {
    res.status(500).json(`error while fetching details ${error}`);
  }
}

module.exports = { routeDetails, routeupdate, routeread, routedelete };
