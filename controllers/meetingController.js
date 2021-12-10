const Joi = require("joi");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const schema = Joi.object({
  id: Joi.number().required(),
  appointment: {
    time: Joi.array().items(Joi.date().iso()).required(),
    additionalNotes: Joi.string(),
  },
  user: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
  },
  property: {
    address: Joi.string().required(),
  },
});

exports.getMeeting = catchAsync(async (req, res, next) => {
  console.log("got request");

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    data: {
      id: 1,
      appointment: {
        time: null,
        additionalNotes: null,
      },
      user: {
        firstName: "John",
        lastName: "Malkovich",
        phone: "+1(403)-999-99-99",
      },
      property: {
        address: "436 W Rivo Alto Dr, Miami Beach, FL 33139",
      },
    },
  });
});

exports.postMeeting = catchAsync(async (req, res, next) => {
  console.log("post request");
  console.log(req.body);
  const meeting = {
    id: 1,
    appointment: {
      time: req.body.time,
      additionalNotes: "Optimistic update works!",
    },
    user: {
      firstName: "John",
      lastName: "Malkovich",
      phone: "+1(403)-999-99-99",
    },
    property: {
      address: "436 W Rivo Alto Dr, Miami Beach, FL 33139",
    },
  };

  const { error, value } = await schema.validate(meeting);

  if (error) return next(new AppError(JSON.stringify(value)));

  res.status(200).json({
    status: "success",
    data: meeting,
  });
});
