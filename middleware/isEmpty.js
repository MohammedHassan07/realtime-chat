const isEmpty = (req, res, next) => {

    const data = req.body

    for (let key in data) {

        if (data.hasOwnProperty(key)) {

            if (data[key] == null || data[key] == undefined) {


                res.status(400).json({

                    error: "Bad Request",
                    message: "Required values are empty."
                })
                return
            }
        }
    }

    next()
}

module.exports = isEmpty