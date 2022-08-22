const isValidAddress = async (req, res, next) => {
  try {
    /**
     * check user enter data  or not
     */
    if (!req.body) {
      return res.status(400).send({
        message: 'please add all require field',
      });
    }
    /**
     * let's validate phone number
     * it should be only 10 digit number
     * and it should be number only
     */
    if (
      `${req.body.contactNumber}`.length !== 10 ||
      isNaN(req.body.contactNumber)
    ) {
      console.log("boddsay",req.body);
      return res.status(400).send({
        message: 'Invalid contact number!',
      });
    }
    /**
     * no let's validate zipcode
     * from reqbody will get string
     * and we have to check that string  only have number
     * string length must be 6 digit only
     */
    if (
      req.body.zipCode != Number(req.body.zipCode) ||
      req.body.zipCode.length !== 6
    ) {
      return res.status(400).send({
        message: 'Invalid zip code!',
      });
    }
    next();
  } catch (e) {
    res.status(500).send({
      mesage: `internal server  error ${e}`,
    });
  }
};
module.exports = { isValidAddress };
