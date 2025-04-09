// controllers/HomeController.js
module.exports = {
  showHome: (req, res) => {
    // On affiche la vue "home/index.ejs"
    res.render('home/index');
  }
};
