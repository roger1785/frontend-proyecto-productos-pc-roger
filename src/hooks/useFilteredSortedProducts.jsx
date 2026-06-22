function useFilteredSortedProducts(products, search, selectedPrice, sortBy) {
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product?.price?.toString().includes(search);

    const matchesPrice = selectedPrice ? product.price <= selectedPrice : true;

    return matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "az") {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }

    if (sortBy === "expensive") {
      if (a.price > b.price) return -1;
      if (a.price < b.price) return 1;
      return 0;
    }

    if (sortBy === "cheaper") {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    }

    return 0;
  });

  return { filteredProducts, sortedProducts };
}

export default useFilteredSortedProducts;
