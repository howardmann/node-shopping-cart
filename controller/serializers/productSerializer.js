const _serializeSingle = (product) => {
  return {
    'id': product.id,
    'name': product.description,
    'price': `AUD$${product.price}`
  };
};

const serialize = (data) => {
  if (!data) {
    return 'Expect data to be not undefined or null'
  }
  if (Array.isArray(data)) {
    return data.map(_serializeSingle)
  }
  return _serializeSingle(data)
}


module.exports = serialize