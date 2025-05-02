export const resolveIndexByUserId= (req, res, next) => {
    const{
        body,
        params: { id },
    } = req;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);

    const findUserIndex = User.findIndex();

    if (findUserIndex === -1) return res.sendStatus(404);
    req.findUserIndex = findUserIndex;
    next();

};