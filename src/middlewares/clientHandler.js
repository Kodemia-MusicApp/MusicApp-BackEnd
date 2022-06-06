const clientHandler = async (req, res, next) => {
  try {
    const { type, _id } = req.params.tokenPayload;
    const { id } = req.params;
    if (id == _id && type == "Client") next();
    else throw new Error("No tiene permisos");
  } catch (error) {
    res.status(401).json({
      success: false,
    });
  }
};

module.exports = { clientHandler };
