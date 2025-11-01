"use client"

import React, { useCallback, useMemo, useState } from "react";

// Componente hijo memorizado
const ProductList = React.memo(({ products, onSelect }) => {
  console.log("🔄 Renderizando ProductList");
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id} onClick={() => onSelect(p)}>
          {p.name}
        </li>
      ))}
    </ul>
  );
});

export default function Shop() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const products = [
    { id: 1, name: "Camisa" },
    { id: 2, name: "Pantalón" },
    { id: 3, name: "Zapatos" },
    { id: 4, name: "Gorra" },
  ];

  // ✅ useMemo → memoriza el resultado del filtro
  const filteredProducts = useMemo(() => {
    console.log("🧮 Filtrando productos...");
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  // ✅ useCallback → memoriza la función (no cambia entre renders)
  const handleSelect = useCallback((product) => {
    console.log("Seleccionado:", product);
    setSelected(product);
  }, []);

  return (
    <div>
      <h2>Tienda</h2>
      <input
        type="text"
        value={search}
        placeholder="Buscar..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <ProductList products={filteredProducts} onSelect={handleSelect} />

      {selected && <p>🛒 Seleccionado: {selected.name}</p>}
    </div>
  );
}