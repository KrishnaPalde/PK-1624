const checkIfSubscribed = (email) => {
  return true;
};

const subscribeEmailToNewsletter = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({ message: "Thanks For Subscribing " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  subscribeEmailToNewsletter,
};
