// controllers/Index1Controller.js
module.exports = {
  showIndex1: (req, res) => {
    // On affiche la vue "index1/index.ejs"
    res.render('index1/index');
  }
};
