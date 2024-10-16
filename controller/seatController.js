const SeatModel = require("../models/bookedseat");
const routeInfo = require("../models/routeinfo");
const { translate } = require("@vitalets/google-translate-api");

async function allocateSeats(req, res) {
  try {
    const { seatNumber, name, vilage, mobile, date,busname,busnumber,time } = req.body;
    const exsitRoute=await routeInfo.findById(req.params.id)
    if(!exsitRoute){
      res.status(404).json(`Route not found`);
    }
    // console.log("translate",translate)

    // Translate the name to Gujarati
    

    // Create a seat with translated name
    const currentSeat = await SeatModel.create({
      name: name,
      vilage: vilage,
      mobile: mobile,
      date: date,
      busnumber:busnumber,
      busname:busname,
      time:time,
      seatNumber: seatNumber,
      route:exsitRoute._id
    });

    res.status(201).json({ data: currentSeat });
  } catch (error) {
    res.status(500).json(`Error while allocating seat: ${error}`);
  }
}
async function allseats(req, res) {
  try {
    const currentSeat = await SeatModel.find({});
    res.status(201).json({ data: currentSeat });
  } catch (error) {
    res.status(500).json(`error while allocating seat ${error}`);
  }
}
async function deleteseat(req, res) {
  try {
    const currentSeat = await SeatModel.findByIdAndDelete(req.params.id);
    res.status(201).json("seat is deleted");
  } catch (error) {
    res.status(500).json(`error while allocating seat ${error}`);
  }
}
async function updateseat(req, res) {
  try {
    const { seatNumber, name, vilage, mobile, date,busname,busnumber,time } = req.body;

    const currentSeat = await SeatModel.findByIdAndUpdate(req.params.id, {
      name: name,
      vilage: vilage,
      mobile: mobile,
      date: date,
      busnumber:busnumber,
      busname:busname,
      time:time,
      seatNumber: seatNumber,
    });
    res.status(201).json({ data: currentSeat });
  } catch (error) {
    res.status(500).json(`error while allocating seat ${error}`);
  }
}
module.exports = { allocateSeats, allseats, updateseat, deleteseat };
