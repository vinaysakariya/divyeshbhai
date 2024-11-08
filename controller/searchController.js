const SeatModel = require("../models/bookedseat");
const Businfo = require("../models/busInfo");
const Routeinfo = require("../models/routeinfo");
async function getsearchAll(req, res) {
  try {
    // Extract the Date parameter from the query string
    const { Date: dateStr, route } = req.query;

    // Initialize an empty filter object
    const filter = {};
    const ExsitingRoute = await Routeinfo.findOne({ route });

    // Add date range filter if the date is provided
    if (dateStr) {
      // Parse the date string into a Date object
      const dateValue = new Date(dateStr);

      // Check if the date conversion is valid
      if (!isNaN(dateValue.getTime())) {
        // Define the start and end of the day
        const startOfDay = new Date(dateValue.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateValue.setHours(23, 59, 59, 999));

        // Create a filter to match documents where the date is within the specified date range
        filter.date = {
          $gte: startOfDay,
          $lte: endOfDay,
        };
      } else {
        return res
          .status(400)
          .json({ error: "Invalid date format. Please use YYYY-MM-DD." });
      }
    }

    // Build the aggregation pipeline
    const pipeline = [];

    // Add $match stage to the pipeline if there's a valid filter
    if (Object.keys(filter).length > 0) {
      pipeline.push({
        $match: filter,
      });
    }
    pipeline.push(
      {
        $match: {
          route: ExsitingRoute._id,
        },
      },
      {
        $lookup: {
          from: "routeinfos", // The collection to join
          localField: "route", // Field from the `orders` collection
          foreignField: "_id", // Field from the `customers` collection
          as: "routeDetails", // Output array field name
        },
      },
      {
        $unwind: "$routeDetails", // Unwind the array to merge customer details
      },
      {
        $sort: { "ExsitingRoute.busname": 1 } // Sort by bunname in ascending order
      }
    );
    console.log("pipeline", pipeline);

    // Run the aggregation pipeline
    const documents = await SeatModel.aggregate(pipeline);

    return res.status(200).json({
      data: documents,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}


async function getsearchBus(req, res) {
  try {
    // Extract the Date parameter from the query string
    const { Date: dateStr, route } = req.query;

    // Initialize an empty filter object
    const filter = {};
    const ExsitingRoute = await Routeinfo.findOne({ route });

    // Add date range filter if the date is provided
    if (dateStr) {
      // Parse the date string into a Date object
      const dateValue = new Date(dateStr);

      // Check if the date conversion is valid
      if (!isNaN(dateValue.getTime())) {
        // Define the start and end of the day
        const startOfDay = new Date(dateValue.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateValue.setHours(23, 59, 59, 999));

        // Create a filter to match documents where the date is within the specified date range
        filter.date = {
          $gte: startOfDay,
          $lte: endOfDay,
        };
      } else {
        return res
          .status(400)
          .json({ error: "Invalid date format. Please use YYYY-MM-DD." });
      }
    }

    // Build the aggregation pipeline
    const pipeline = [];

    // Add $match stage to the pipeline if there's a valid filter
    if (Object.keys(filter).length > 0) {
      pipeline.push({
        $match: filter,
      });
    }
    pipeline.push(
      {
        $match: {
          route: ExsitingRoute._id,
        },
      },
      {
        $lookup: {
          from: "routeinfos", // The collection to join
          localField: "route", // Field from the `orders` collection
          foreignField: "_id", // Field from the `customers` collection
          as: "routeDetails", // Output array field name
        },
      },
      {
        $unwind: "$routeDetails", // Unwind the array to merge customer details
      }
    );

    // Run the aggregation pipeline
    const documents = await Businfo.aggregate(pipeline);

    return res.status(200).json({
      data: documents,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
async function getsearchAllByseat(req, res) {
  try {
    const { Date: dateStr, route } = req.query;
    const filter = {};
    const ExsitingRoute = await Routeinfo.findOne({ route });

    if (dateStr) {
      const dateValue = new Date(dateStr);
      if (!isNaN(dateValue.getTime())) {
        const startOfDay = new Date(dateValue.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateValue.setHours(23, 59, 59, 999));
        filter.date = {
          $gte: startOfDay,
          $lte: endOfDay,
        };
      } else {
        return res
          .status(400)
          .json({ error: "Invalid date format. Please use YYYY-MM-DD." });
      }
    }

    const villageOrder = [
      "અરજણસુખ",
      "ખાખરીયા",
      "સૂર્યપ્રતાપગઢ",
      "અનીડા",
      "ઉજળા",
      "મોટાઉજળા",
      "મોટીકુકાવાવ",
      "નાનીકુકાવાવ",
      "જંગર",
      "કોલડા",
      "લુણીધાર",
      "જીથુડી",
      "રાંઢીયા",
      "ચિતલ",
      "ભીલડી",
      "ભીલા",
      "ઇંગોરાળા",
      "ઇંગોરાળાપાટીયુ",
      "લુણકી",
      "તાલાળિ",
      "સનાળિ",
      "રાણસીકી",
      "દેરડી",
      "પાટખીલોરી",
      "રાવણા",
      "વાસાવડ",
      "દડવા",
      "ઝુંડાળા",
      "રાણપર",
      "ફુલજર",
      "ખીજડીયા",
      "દેવળીયા",
      "ધરાઇ",
      "વાવડી",
      "ત્રંબોડા",
      "ગમાપીપળીયા",
      "ચમારડી",
      "બાબરા",
      "ચરખા",
      "ઉટવડ",
      "નડાળા",
      "થોરખાણ",
      "ગરણી",
      "પાનસડા",
      "કર્ણુકી",
      "કોટડાપીઠા",
      "જંગવડ",
      "મોટીખીલોરી",
      "મેતાખંભાળિયા",
      "કેશવાળાપાટીયુ",
      "કમઢીયા",
      "બિલડી",
      "ડોડીયાળા",
      "સાણથલી",
      "નવાગામ",
      "જુનાપીપળીયા",
      "પીપળીયા",
      "જીવાપર",
      "પાંચવડા",
      "પાંચવડાચોકડી",
      "પાચવડા",
      "આટકોટ",
      "વાવડા",
      "ગોખલાણા",
      "શિવરાજગઢ",
      "જસદણ",
      ,
      "સૂર્યાપંપ",
      "લીલાપુર",
      "લાલાવદર",
      "વિછીયા",
      "પાળીયાદ",
      "રાણપુર",
    ];

    const villageSortOrder = villageOrder.reduce((acc, village, index) => {
      acc[village] = index;
      return acc;
    }, {});

    const pipeline = [];

    if (Object.keys(filter).length > 0) {
      pipeline.push({
        $match: filter,
      });
    }
    pipeline.push(
      {
        $match: {
          route: ExsitingRoute._id,
        },
      },
      {
        $lookup: {
          from: "routeinfos", // The collection to join
          localField: "route", // Field from the `orders` collection
          foreignField: "_id", // Field from the `customers` collection
          as: "routeDetails", // Output array field name
        },
      },
      {
        $unwind: "$routeDetails", // Unwind the array to merge customer details
      }
    );

    pipeline.push(
      {
        $addFields: {
          adjustedName: {
            $replaceAll: {
              input: {
                $replaceAll: {
                  input: "$name",
                  find: "ી", // Replace Dirghai with empty string
                  replacement: "",
                },
              },
              find: "િ", // Replace Rasvai with empty string
              replacement: "",
            },
          },
          adjustedVillage: {
            $replaceAll: {
              input: {
                $replaceAll: {
                  input: "$vilage",
                  find: "ી", // Replace Dirghai with empty string
                  replacement: "",
                },
              },
              find: "િ", // Replace Rasvai with empty string
              replacement: "",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            name: "$adjustedName",
            village: "$adjustedVillage",
          },
          seatNumbersArray: {
            $addToSet: "$seatNumber",
          },
          date: {
            $first: "$date",
          },

          village: {
            $first: "$vilage",
          },
          name: {
            $first: "$name",
          },
          mobile: {
            $first: "$mobile",
          },
        },
      },
      {
        $addFields: {
          villageOrderIndex: {
            $indexOfArray: [villageOrder, "$village"],
          },
        },
      },
      {
        $sort: {
          villageOrderIndex: 1,
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          village: 1,
          seatNumbersArray: 1,
          date: 1,
          uniqueSeatNumberCount: {
            $size: {
              $setUnion: [
                {
                  $map: {
                    input: "$seatNumbersArray",
                    as: "seat",
                    in: {
                      $cond: {
                        if: {
                          $regexMatch: { input: "$$seat", regex: /^કેબિન/ },
                        },
                        then: "કેબિન", // Grouping cabins together
                        else: "$$seat",
                      },
                    },
                  },
                },
                [],
              ],
            },
          },
          cabinCount: {
            $size: {
              $filter: {
                input: "$seatNumbersArray",
                as: "seat",
                cond: { $regexMatch: { input: "$$seat", regex: /^કેબિન/ } },
              },
            },
          },
          // Calculate seatCount ignoring "કેબિન" entries
          seatCount: {
            $size: {
              $reduce: {
                input: {
                  $map: {
                    input: {
                      $filter: {
                        input: "$seatNumbersArray",
                        as: "seat",
                        cond: {
                          $not: {
                            $regexMatch: { input: "$$seat", regex: /^કેબિન/ },
                          },
                        },
                      },
                    },
                    as: "seat",
                    in: { $split: ["$$seat", ","] }, // Splitting comma-separated seat numbers
                  },
                },
                initialValue: [],
                in: { $concatArrays: ["$$value", "$$this"] }, // Flattening the array
              },
            },
          },
          mobile: 1,
        },
      }
    );

    const documents = await SeatModel.aggregate(pipeline);

    return res.status(200).json({
      data: documents,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
// async function getsearchRouteByvillage(req, res) {
//   try {
//     const { Date: dateStr, village } = req.query;

//     // Initialize an empty filter object
//     const filter = {};

//     // Add date range filter if the date is provided
//     if (dateStr) {
//       // Parse the date string into a Date object
//       const dateValue = new Date(dateStr);

//       // Check if the date conversion is valid
//       if (!isNaN(dateValue.getTime())) {
//         // Define the start and end of the day
//         const startOfDay = new Date(dateValue.setHours(0, 0, 0, 0));
//         const endOfDay = new Date(dateValue.setHours(23, 59, 59, 999));

//         // Create a filter to match documents where the date is within the specified date range
//         filter.date = {
//           $gte: startOfDay,
//           $lte: endOfDay,
//         };
//       } else {
//         return res
//           .status(400)
//           .json({ error: "Invalid date format. Please use YYYY-MM-DD." });
//       }
//     }

//     // Add village filter if the village is provided
//     if (village) {
//       // Assume `village` can be a single value or an array
//       if (Array.isArray(village)) {
//         filter.village = { $in: village };
//       } else {
//         filter.village = village;
//       }
//     }

//     // Query the database with the constructed filter
//     const results = await Routeinfo.find(filter);

//     // Respond with the results
//     res.status(200).json(results);
//   } catch (error) {
//     res.status(500).json({ error: `Error: ${error.message}` });
//   }
// }
async function getsearchRouteByvillage(req, res) {
  try {
    const { Date: dateStr, from, to } = req.query;

    // Initialize an empty filter object
    const filter = {};

    // Add date range filter if the date is provided
    if (dateStr) {
      // Parse the date string into a Date object
      const dateValue = new Date(dateStr);

      // Check if the date conversion is valid
      if (!isNaN(dateValue.getTime())) {
        // Define the start and end of the day
        const startOfDay = new Date(dateValue.setHours(0, 0, 0, 0));
        const endOfDay = new Date(dateValue.setHours(23, 59, 59, 999));

        // Create a filter to match documents where the date is within the specified date range
        filter.date = {
          $gte: startOfDay,
          $lte: endOfDay,
        };
      } else {
        return res
          .status(400)
          .json({ error: "Invalid date format. Please use YYYY-MM-DD." });
      }
    }

    // Add 'from' filter if provided
    if (from) {
      // Assume `from` can be a single value or an array
      if (Array.isArray(from)) {
        filter.from = { $in: from };
      } else {
        filter.from = from;
      }
    }

    // Add 'to' filter if provided
    if (to) {
      // Assume `to` can be a single value or an array
      if (Array.isArray(to)) {
        filter.to = { $in: to };
      } else {
        filter.to = to;
      }
    }

    // Find documents matching the filter
    const results = await Routeinfo.find(filter);

    // Respond with the results
    res.status(200).json(results);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: `Error: ${error.message}` });
  }
}

module.exports = {
  getsearchAll,
  getsearchBus,
  getsearchAllByseat,
  getsearchRouteByvillage,
};
