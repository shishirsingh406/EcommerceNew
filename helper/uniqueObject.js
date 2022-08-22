const uniqueObject = (response) => {
  let categories = [];
  response.forEach((e) => {
    categories.push(e.category);
  });
  let uniqueCategories = categories.filter(
    (el, i) => i === categories.indexOf(el)
  );
  return uniqueCategories;
};

module.exports = { uniqueObject };
