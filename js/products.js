// products.js
// = PRODUCT LIST LOGIC
// = filter products
// = find product grids
// = render/update product cards

FIND .women-product-grid
CALL it womenProductGrid

IF womenProductGrid exists:

    FILTER the already-fetched products
    so only Female products remain

    CALL the result womenProducts

    LOG womenProducts

    RENDER womenProducts inside womenProductGrid

