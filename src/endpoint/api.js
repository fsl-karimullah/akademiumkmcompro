const prod_url = 'https://api.akademiumkm.id';
// const url = 'http://127.0.0.1:8000';
export const endpoint = {
  registerUser: `${prod_url}/api/auth/register`,
  loginUser: `${prod_url}/api/auth/login`,
  logoutUser: `${prod_url}/api/auth/logout`,
  getProvince: `${prod_url}/api/provinces`,
  getCategories: `${prod_url}/api/categories`,
  forgotPassword: `${prod_url}/api/auth/forgot-password`,
  updateProfile: `${prod_url}/api/me`,
  getProfile: `${prod_url}/api/me`,
  getEducation: `${prod_url}/api/education`,
  getWebinars: `${prod_url}/api/webinars`,
  getPackage: `${prod_url}/api/packages`,
  getMentor: `${prod_url}/api/mentors`,
  getTransaction: `${prod_url}/api/transactions`,
  getWebinarsById:(id) => `${prod_url}/api/webinars/${id}`,
  getEducationById:(id) => `${prod_url}/api/education/${id}`,
  searchShop: (lat, lng, value) => `${prod_url}/api/shops?q=${value}&lat=${lat}&lng=${lng}`,
  getCities: (provinceId) => `${prod_url}/api/cities?province_id=${provinceId}`,
  getDistrict: (cityId) => `${prod_url}/api/districts?city_id=${cityId}`,
  getShop: (lat, lng) => `${prod_url}/api/shops?lat=${lat}&lng=${lng}`,
  getShopAll: (lat, lng) => `${prod_url}/api/shops?with_geo=0`,
  getShopByFilter: (lat, lng, categoryId) => `${prod_url}/api/shops?lat=${lat}&lng=${lng}&category_id=${categoryId}`,
  getShopDetail: (id) => `${prod_url}/api/shops/${id}`,
  favouriteShop: (id) => `${prod_url}/api/favorites`, 
  deleteFavouriteShop: (id) => `${prod_url}/api/favorites/${id}`, 
  getFavouriteShop: `${prod_url}/api/favorites`, 
  getNews: `${prod_url}/api/news`, 
  getNewsDetails: (id) => `${prod_url}/api/news/${id}`, 
  getCourses: `${prod_url}/api/courses`, 
  getCourseDetails: (id) => `${prod_url}/api/courses/${id}`,
  buyCourse: (id) => `${prod_url}/api/courses/${id}/pay`,
};
  