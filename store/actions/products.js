export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  pid: productId,
});

export const createProduct = (title, description, imageUrl, price) => ({
  type: CREATE_PRODUCT,
  productData: {
    title,
    description,
    imageUrl,
    price
  },
});

export const updateProduct = (id, title, description, imageUrl) => ({
  type: UPDATE_PRODUCT,
  pid: id,
  productData: {
    title,
    description,
    imageUrl
  },
});
