const musicianHandler = async (req, res, next) => {
  try {
    const { type, _id } = req.params.tokenPayload;
    console.log(type);
    //const { id } = req.params;
    if (type == "Musico") next();
    else throw new Error("No tiene permisos");
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "No tiene permisos",
    });
  }
};

module.exports = { musicianHandler };
