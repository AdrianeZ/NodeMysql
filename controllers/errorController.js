function errorController(err, req, res, next)
{
    res.status(404).render("error",
        {
            message: err.message
        }
    );
}

module.exports = errorController;