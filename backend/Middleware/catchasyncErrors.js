module.exports = syncError => (req, res, next) =>{
    Promise.resolve(syncError(req, res, next)).catch(next);
};