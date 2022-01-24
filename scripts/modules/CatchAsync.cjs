exports.catchAsync = fc => {
    return (req, res, next) => {
        fc(req, res, next).catch(next);
    }
}