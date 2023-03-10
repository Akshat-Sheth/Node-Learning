
const products = [
    {
      id: 'redshoe',
      description: 'Red Shoe',
      price: 42.12,
      reviews: [],
    },
    {
      id: 'bluejean',
      description: 'Blue Jeans',
      price: 55.55,
      reviews: [],
    }
  ];


function getAllProducts () {
  return products
}

function getProductsByPrice (min,max) {
  return products.filter((product) => {
    return product.price >= min && product.price <= max
  })
}

function getProductById (id){
  return products.find((product) => {
    return product.id === id
  })
}

function addNewProduct(id,description,price) {
  const newProduct = {
    id,
    description,
    price,
    reviews:[]
  }
  products.push(newProduct)
  return newProduct
}

function addProductReview (id,rating,comment) {


  const matchedProduct = getProductById(id)
  if(matchedProduct){
      const newReview = {
        rating,
        comment
      }
      matchedProduct.reviews.push(newReview)
  }

  // my logic -> works properly
    // const newReview = {
  //   rating,
  //   comment
  // }
  // products.map((product) => {
  //   if(product.id === id){
  //     product.reviews.push(newReview)
  //   }
  // })

  return newReview


}

module.exports = {
  products,
  getAllProducts,
  getProductsByPrice,
  getProductById,
  addNewProduct,
  addProductReview
}