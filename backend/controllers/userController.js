import User from "../models/User.js";

export const selectCharity = async (req, res) => {
  const { charityId } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user,
    { charityId },
    { new: true }
  );

  res.json(user);
};

export const activateSubscription = async (req, res) => {
  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + 1);

  const user = await User.findByIdAndUpdate(
    req.user,
    {
      subscription: {
        plan: "monthly",
        isActive: true,
        expiryDate: expiry
      }
    },
    { new: true }
  );

  res.json(user);
};