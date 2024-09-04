"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ShoppingCart,
  Filter,
  DollarSign,
  Trash2,
  Edit2,
  Save,
  Search,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  HandCoins,
  Diff,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ItemCompra {
  id: number;
  nombre: string;
  cantidad: number;
  categoria: string;
  comprado: boolean;
  precio: number;
}

// export default function Component() {
//   const [items, setItems] = useState<ItemCompra[]>(() => {
//     const savedItems = localStorage.getItem("listaCompras");
//     return savedItems ? JSON.parse(savedItems) : [];
//   });
//   const [categorias, setCategorias] = useState<string[]>(() => {
//     const savedCategorias = localStorage.getItem("categorias");
//     return savedCategorias
//       ? JSON.parse(savedCategorias)
//       : [
//           "Frutas y Verduras",
//           "Carnes y Pescados",
//           "Lácteos",
//           "Panadería",
//           "Bebidas",
//           "Limpieza",
//           "Otros",
//         ];
//   });
//   const [nuevoItem, setNuevoItem] = useState("");
//   const [nuevaCantidad, setNuevaCantidad] = useState(1);
//   const [nuevaCategoria, setNuevaCategoria] = useState(categorias[0]);
//   const [nuevoPrecio, setNuevoPrecio] = useState(0);
//   const [filtro, setFiltro] = useState("todos");
//   const [orden, setOrden] = useState("nombre");
//   const [editandoId, setEditandoId] = useState<number | null>(null);
//   const [busqueda, setBusqueda] = useState("");
//   const [nuevaCategoriaInput, setNuevaCategoriaInput] = useState("");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   useEffect(() => {
//     localStorage.setItem("listaCompras", JSON.stringify(items));
//   }, [items]);

//   useEffect(() => {
//     localStorage.setItem("categorias", JSON.stringify(categorias));
//   }, [categorias]);

//   const agregarItem = () => {
//     if (nuevoItem.trim() !== "") {
//       setItems([
//         ...items,
//         {
//           id: Date.now(),
//           nombre: nuevoItem,
//           cantidad: nuevaCantidad,
//           categoria: nuevaCategoria,
//           comprado: false,
//           precio: nuevoPrecio,
//         },
//       ]);
//       setNuevoItem("");
//       setNuevaCantidad(1);
//       setNuevoPrecio(0);
//     }
//   };

//   const toggleComprado = (id: number) => {
//     setItems(
//       items.map((item) =>
//         item.id === id ? { ...item, comprado: !item.comprado } : item
//       )
//     );
//   };

//   const eliminarItem = (id: number) => {
//     setItems(items.filter((item) => item.id !== id));
//   };

//   const editarItem = (id: number) => {
//     setEditandoId(id);
//   };

//   const guardarEdicion = (
//     id: number,
//     nuevoNombre: string,
//     nuevaCantidad: number,
//     nuevoPrecio: number
//   ) => {
//     setItems(
//       items.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               nombre: nuevoNombre,
//               cantidad: nuevaCantidad,
//               precio: nuevoPrecio,
//             }
//           : item
//       )
//     );
//     setEditandoId(null);
//   };

//   const agregarCategoria = () => {
//     if (
//       nuevaCategoriaInput.trim() !== "" &&
//       !categorias.includes(nuevaCategoriaInput)
//     ) {
//       setCategorias([...categorias, nuevaCategoriaInput]);
//       setNuevaCategoriaInput("");
//     }
//   };

//   const itemsFiltrados = items
//     .filter((item) => {
//       const cumpleFiltro =
//         filtro === "todos" ||
//         (filtro === "comprados" && item.comprado) ||
//         (filtro === "pendientes" && !item.comprado) ||
//         item.categoria === filtro;
//       const cumpleBusqueda = item.nombre
//         .toLowerCase()
//         .includes(busqueda.toLowerCase());
//       return cumpleFiltro && cumpleBusqueda;
//     })
//     .sort((a, b) => {
//       if (orden === "nombre") return a.nombre.localeCompare(b.nombre);
//       if (orden === "categoria") return a.categoria.localeCompare(b.categoria);
//       if (orden === "precio") return a.precio - b.precio;
//       return 0;
//     });

//   const totalItems = items.length;
//   const itemsComprados = items.filter((item) => item.comprado).length;
//   const costoTotal = items.reduce(
//     (sum, item) => sum + item.precio * item.cantidad,
//     0
//   );
//   const costoComprado = items
//     .filter((item) => item.comprado)
//     .reduce((sum, item) => sum + item.precio * item.cantidad, 0);

//   return (
//     <div className="md:container mx-auto md:p-6 lg:p-8">
//       <h1 className="text-base md:text-2xl font-bold flex items-center justify-center py-2">
//         <ShoppingCart className="mr-2" />
//         Lista de Compras
//       </h1>

//       <div className="w-full">
//         <Tabs defaultValue="lista" className="w-full">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="lista">Lista de Compras</TabsTrigger>
//             <TabsTrigger value="agregar">Agregar Item</TabsTrigger>
//           </TabsList>
//           <TabsContent value="lista">
//             <Collapsible
//               open={isFilterOpen}
//               onOpenChange={setIsFilterOpen}
//               className="w-full space-y-2"
//             >
//               <div className="flex items-center justify-between">
//                 <h4 className="text-sm font-semibold">Búsqueda y Filtros</h4>
//                 <CollapsibleTrigger asChild>
//                   <Button variant="ghost" size="sm" className="w-9 p-0">
//                     {isFilterOpen ? (
//                       <ChevronUp className="h-4 w-4" />
//                     ) : (
//                       <ChevronDown className="h-4 w-4" />
//                     )}
//                     <span className="sr-only">Toggle</span>
//                   </Button>
//                 </CollapsibleTrigger>
//               </div>
//               <CollapsibleContent className="space-y-2">
//                 <div className="flex flex-col tems-center space-y-2 sm:space-y-0 sm:space-x-2">
//                   <div className="w-full flex items-center space-x-2">
//                     <Search className="h-4 w-4 flex-shrink-0" />
//                     <Input
//                       type="text"
//                       placeholder="Buscar por nombre"
//                       value={busqueda}
//                       onChange={(e) => setBusqueda(e.target.value)}
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
//                     <div className="w-full sm:w-1/2 flex items-center space-x-2">
//                       <Filter className="h-4 w-4 flex-shrink-0" />
//                       <Select value={filtro} onValueChange={setFiltro}>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Filtrar por" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="todos">Todos</SelectItem>
//                           <SelectItem value="comprados">Comprados</SelectItem>
//                           <SelectItem value="pendientes">Pendientes</SelectItem>
//                           {categorias.map((cat) => (
//                             <SelectItem key={cat} value={cat}>
//                               {cat}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="w-full sm:w-1/2 flex items-center space-x-2">
//                       <Select value={orden} onValueChange={setOrden}>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Ordenar por" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="nombre">Nombre</SelectItem>
//                           <SelectItem value="categoria">Categoría</SelectItem>
//                           <SelectItem value="precio">Precio</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </div>
//               </CollapsibleContent>
//             </Collapsible>

//             {/* INFO */}
//             <div className="space-y-2 text-muted-foreground text-xs md:text-sm py-4 xl:flex xl:justify-between xl:items-center">
//               <p className="flex justify-center items-center gap-4">
//                 <span className="flex items-center">
//                   <span>
//                     <ShoppingCart />
//                   </span>
//                   <span className="hidden md:inline">Productos</span>:{" "}
//                   {totalItems}
//                 </span>
//                 <span className="flex items-center">
//                   <span>
//                     <Check />
//                   </span>
//                   <span className="hidden md:inline">Comprados</span>:{" "}
//                   {itemsComprados}
//                 </span>
//                 <span className="flex items-center">
//                   <span>
//                     <X />
//                   </span>
//                   <span className="hidden md:inline">Pendientes</span>:{" "}
//                   {totalItems - itemsComprados}
//                 </span>
//               </p>
//               <p className="flex justify-center items-center gap-4">
//                 <span className="flex items-center justify-center">
//                   <span></span>
//                   <DollarSign />
//                   <span className="hidden md:flex">Costo total estimado</span>:
//                   ${costoTotal.toFixed(2)}
//                 </span>
//                 <span className="flex items-center">
//                   <span>
//                     <HandCoins />
//                   </span>
//                   <span className="hidden md:inline">Pagar</span>: $
//                   {costoComprado.toFixed(2)}
//                 </span>
//                 <span className="flex items-center">
//                   <span>
//                     <Diff />
//                   </span>
//                   <span className="hidden md:inline">Diferencia</span>: $
//                   {(costoTotal - costoComprado).toFixed(2)}
//                 </span>
//               </p>
//             </div>

//             <ul className="mt-4 space-y-2">
//               {itemsFiltrados.map((item) => (
//                 <li
//                   key={item.id}
//                   className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 bg-secondary rounded"
//                 >
//                   {editandoId === item.id ? (
//                     <div className="w-full flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
//                       <Input
//                         value={item.nombre}
//                         onChange={(e) =>
//                           setItems(
//                             items.map((i) =>
//                               i.id === item.id
//                                 ? { ...i, nombre: e.target.value }
//                                 : i
//                             )
//                           )
//                         }
//                         className="w-full sm:w-1/3"
//                       />
//                       <Input
//                         type="number"
//                         value={item.cantidad}
//                         onChange={(e) =>
//                           setItems(
//                             items.map((i) =>
//                               i.id === item.id
//                                 ? { ...i, cantidad: Number(e.target.value) }
//                                 : i
//                             )
//                           )
//                         }
//                         className="w-full sm:w-20"
//                       />
//                       <Input
//                         type="number"
//                         value={item.precio}
//                         onChange={(e) =>
//                           setItems(
//                             items.map((i) =>
//                               i.id === item.id
//                                 ? { ...i, precio: Number(e.target.value) }
//                                 : i
//                             )
//                           )
//                         }
//                         className="w-full sm:w-24"
//                       />
//                       <Button
//                         onClick={() =>
//                           guardarEdicion(
//                             item.id,
//                             item.nombre,
//                             item.cantidad,
//                             item.precio
//                           )
//                         }
//                       >
//                         <Save className="h-4 w-4 mr-2" />
//                         Guardar
//                       </Button>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex items-center space-x-2 mb-2 sm:mb-0">
//                         <Checkbox
//                           id={`item-${item.id}`}
//                           checked={item.comprado}
//                           onCheckedChange={() => toggleComprado(item.id)}
//                         />
//                         <label
//                           htmlFor={`item-${item.id}`}
//                           className={`${
//                             item.comprado
//                               ? "line-through text-muted-foreground"
//                               : ""
//                           }`}
//                         >
//                           {item.nombre} ({item.cantidad}) - {item.categoria} - $
//                           {item.precio.toFixed(2)}
//                         </label>
//                       </div>
//                       <div className="flex space-x-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => editarItem(item.id)}
//                         >
//                           <Edit2 className="h-4 w-4 mr-2" />
//                           Editar
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => eliminarItem(item.id)}
//                         >
//                           <Trash2 className="h-4 w-4 mr-2" />
//                           Eliminar
//                         </Button>
//                       </div>
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-4 space-y-2 text-sm text-muted-foreground">
//               <p>
//                 Total de artículos: {totalItems} | Comprados: {itemsComprados} |
//                 Pendientes: {totalItems - itemsComprados}
//               </p>
//               <p>
//                 Costo total estimado: ${costoTotal.toFixed(2)} | Comprado: $
//                 {costoComprado.toFixed(2)} | Pendiente: $
//                 {(costoTotal - costoComprado).toFixed(2)}
//               </p>
//             </div>
//           </TabsContent>
//           <TabsContent value="agregar">
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="nombre-item">Nombre del artículo</Label>
//                   <Input
//                     id="nombre-item"
//                     type="text"
//                     placeholder="Nombre del artículo"
//                     value={nuevoItem}
//                     onChange={(e) => setNuevoItem(e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="cantidad-item">Cantidad</Label>
//                   <Input
//                     id="cantidad-item"
//                     type="number"
//                     min="1"
//                     value={nuevaCantidad}
//                     onChange={(e) => setNuevaCantidad(parseInt(e.target.value))}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="categoria-item">Categoría</Label>
//                   <Select
//                     value={nuevaCategoria}
//                     onValueChange={setNuevaCategoria}
//                   >
//                     <SelectTrigger id="categoria-item">
//                       <SelectValue placeholder="Seleccionar categoría" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {categorias.map((cat) => (
//                         <SelectItem key={cat} value={cat}>
//                           {cat}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="precio-item">Precio estimado</Label>
//                   <Input
//                     id="precio-item"
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     value={nuevoPrecio}
//                     onChange={(e) => setNuevoPrecio(parseFloat(e.target.value))}
//                   />
//                 </div>
//               </div>
//               <Button onClick={agregarItem} className="w-full">
//                 Agregar a la lista
//               </Button>
//               <div className="pt-4 border-t">
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <Button variant="outline" className="w-full">
//                       <PlusCircle className="mr-2 h-4 w-4" />
//                       Agregar nueva categoría
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent>
//                     <DialogHeader>
//                       <DialogTitle>Agregar nueva categoría</DialogTitle>
//                     </DialogHeader>
//                     <div className="flex items-center space-x-2">
//                       <Input
//                         type="text"
//                         placeholder="Nueva categoría"
//                         value={nuevaCategoriaInput}
//                         onChange={(e) => setNuevaCategoriaInput(e.target.value)}
//                       />
//                       <Button onClick={agregarCategoria}>Agregar</Button>
//                     </div>
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

export default function Component() {
  // const [items, setItems] = useState<ItemCompra[]>(() => {
  //   const savedItems = localStorage.getItem("listaCompras");
  //   return savedItems ? JSON.parse(savedItems) : [];
  // });
  const [items, setItems] = useState<ItemCompra[]>();
  // const [categorias, setCategorias] = useState<string[]>(() => {
  //   const savedCategorias = localStorage.getItem("categorias");
  //   return savedCategorias
  //     ? JSON.parse(savedCategorias)
  //     : [
  //         "Frutas y Verduras",
  //         "Carnes y Pescados",
  //         "Lácteos",
  //         "Panadería",
  //         "Bebidas",
  //         "Limpieza",
  //         "Otros",
  //       ];
  // });
  // const [categorias, setCategorias] = useState<string[]>([
  //   "Frutas y Verduras",
  //   "Carnes y Pescados",
  //   "Lácteos",
  //   "Panadería",
  //   "Bebidas",
  //   "Limpieza",
  //   "Otros",
  // ]);
  const [categorias, setCategorias] = useState<string[]>(() => {
    // Inicializa categorías desde localStorage
    if (typeof window !== "undefined") {
      const savedCategorias = localStorage.getItem("listoAPP-categorias");
      return savedCategorias
        ? JSON.parse(savedCategorias)
        : [
            "Otros",
            "Frutas y Verduras",
            "Carnes y Pescados",
            "Lácteos",
            "Panadería",
            "Bebidas",
            "Limpieza",
          ];
    }
    return [
      "Otros",
      "Frutas y Verduras",
      "Carnes y Pescados",
      "Lácteos",
      "Panadería",
      "Bebidas",
      "Limpieza",
    ];
  });
  const [nuevoItem, setNuevoItem] = useState("");
  const [nuevaCantidad, setNuevaCantidad] = useState(1);
  const [nuevaCategoria, setNuevaCategoria] = useState(categorias[0]);
  const [nuevoPrecio, setNuevoPrecio] = useState(0);
  const [filtro, setFiltro] = useState("todos");
  const [orden, setOrden] = useState("nombre");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [nuevaCategoriaInput, setNuevaCategoriaInput] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem("listoAPP-items");
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        if (Array.isArray(parsedItems)) {
          setItems(parsedItems);
        } else {
          setItems([]);
        }
      } else {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && items !== undefined) {
      localStorage.setItem("listoAPP-items", JSON.stringify(items));
    }
  }, [items]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const savedCategorias = localStorage.getItem("listoAPP-categorias");
  //     if (savedCategorias) {
  //       const parsedCategorias = JSON.parse(savedCategorias);
  //       if (Array.isArray(parsedCategorias)) {
  //         setCategorias(parsedCategorias);
  //       } else {
  //         setCategorias([]);
  //       }
  //     } else {
  //       setCategorias([]);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined" && categorias !== undefined) {
  //     localStorage.setItem("listoAPP-categorias", JSON.stringify(categorias));
  //   }
  // }, [categorias]);

  // Guardar categorías en localStorage cuando cambian
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("listoAPP-categorias", JSON.stringify(categorias));
    }
  }, [categorias]);

  const agregarItem = () => {
    if (nuevoItem.trim() !== "") {
      setItems((prevItems) => [
        ...(prevItems || []),
        {
          id: Date.now(),
          nombre: nuevoItem,
          cantidad: nuevaCantidad,
          categoria: nuevaCategoria,
          comprado: false,
          precio: nuevoPrecio,
        },
      ]);
      setNuevoItem("");
      setNuevaCantidad(1);
      setNuevoPrecio(0);
      toast.success("Producto agregado satisfactoriamente.");
    }
  };

  const toggleComprado = (id: number) => {
    setItems(
      (prevItems) =>
        prevItems?.map((item) =>
          item.id === id ? { ...item, comprado: !item.comprado } : item
        ) ?? []
    );
  };

  // const eliminarItem = (id: number) => {
  //   setItems((prevItems) => prevItems?.filter((item) => item.id !== id) ?? []);
  // };

  const eliminarItem = (id: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems?.filter((item) => item.id !== id) ?? [];
      if (updatedItems.length < (prevItems?.length ?? 0)) {
        toast.success("Artículo eliminado con éxito");
      }
      return updatedItems;
    });
  };

  const editarItem = (id: number) => {
    setEditandoId(id);
  };

  const guardarEdicion = (
    id: number,
    nuevoNombre: string,
    nuevaCantidad: number,
    nuevoPrecio: number
  ) => {
    setItems((prevItems) =>
      prevItems?.map((item) =>
        item.id === id
          ? {
              ...item,
              nombre: nuevoNombre,
              cantidad: nuevaCantidad,
              precio: nuevoPrecio,
            }
          : item
      )
    );
    setEditandoId(null);
    toast.success("Producto editado satisfactoriamente.");
  };

  const agregarCategoria = () => {
    if (
      nuevaCategoriaInput.trim() !== "" &&
      !categorias.includes(nuevaCategoriaInput)
    ) {
      setCategorias((prevCategorias) => [
        ...prevCategorias,
        nuevaCategoriaInput,
      ]);
      setNuevaCategoriaInput("");
      toast.success("Categoria agregada satisfactoriamente.");
    }
  };

  const eliminarCategoria = (categoria: string) => {
    const itemsEnCategoria =
      items?.filter((item) => item.categoria === categoria) ?? [];
    if (itemsEnCategoria.length > 0) {
      // Si hay items en esta categoría, moverlos a "Otros"
      const nuevosItems =
        items?.map((item) =>
          item.categoria === categoria ? { ...item, categoria: "Otros" } : item
        ) ?? [];
      setItems(nuevosItems);
    }
    setCategorias(categorias.filter((cat) => cat !== categoria));
    if (nuevaCategoria === categoria) {
      setNuevaCategoria("Otros");
    }
    if (filtro === categoria) {
      setFiltro("todos");
    }
    toast.success("Categoria eliminada satisfactoriamente.");
  };

  const vaciarLista = () => {
    setItems([]);
  };

  const itemsFiltrados =
    items
      ?.filter((item) => {
        const cumpleFiltro =
          filtro === "todos" ||
          (filtro === "comprados" && item.comprado) ||
          (filtro === "pendientes" && !item.comprado) ||
          item.categoria === filtro;
        const cumpleBusqueda = item.nombre
          .toLowerCase()
          .includes(busqueda.toLowerCase());
        return cumpleFiltro && cumpleBusqueda;
      })
      .sort((a, b) => {
        if (orden === "nombre") return a.nombre.localeCompare(b.nombre);
        if (orden === "categoria")
          return a.categoria.localeCompare(b.categoria);
        if (orden === "precio") return a.precio - b.precio;
        return 0;
      }) || [];

  const totalItems = items?.length;
  const itemsComprados = items?.filter((item) => item.comprado).length;
  const costoTotal =
    items?.reduce((sum, item) => sum + item.precio * item.cantidad, 0) ?? 0;
  const costoComprado =
    items
      ?.filter((item) => item.comprado)
      .reduce((sum, item) => sum + item.precio * item.cantidad, 0) ?? 0;

  return (
    <div className="md:container mx-auto md:p-6 lg:p-8">
      <h1 className="text-base md:text-2xl font-bold flex items-center justify-center py-2">
        <ShoppingCart className="mr-2" />
        Lista de Compras
      </h1>

      <div className="w-full">
        <Tabs defaultValue="lista" className="w-full my-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lista">Lista de Compras</TabsTrigger>
            <TabsTrigger value="agregar">Agregar Item</TabsTrigger>
          </TabsList>
          <TabsContent value="lista">
            <div className="flex justify-between items-center mb-4">
              <Collapsible
                open={isFilterOpen}
                onOpenChange={setIsFilterOpen}
                className="w-full space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold w-full">
                    Filtros y Búsqueda
                  </h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                      {isFilterOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="ml-2">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Vaciar Lista
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará
                          permanentemente todos los items de tu lista de
                          compras.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={vaciarLista}>
                          Vaciar Lista
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <CollapsibleContent className="space-y-2">
                  <div className="grid grid-cols-1">
                    <div className="w-full flex items-center space-y-2 space-x-2">
                      <Search className="h-4 w-4 flex-shrink-0" />
                      <Input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="w-full flex items-center space-y-2 space-x-2">
                        <Filter className="h-4 w-4 flex-shrink-0" />
                        <Select value={filtro} onValueChange={setFiltro}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filtrar por" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="comprados">Comprados</SelectItem>
                            <SelectItem value="pendientes">
                              Pendientes
                            </SelectItem>
                            {categorias.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full flex items-center space-y-2 space-x-2">
                        <Select value={orden} onValueChange={setOrden}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Ordenar por" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nombre">Nombre</SelectItem>
                            <SelectItem value="categoria">Categoría</SelectItem>
                            <SelectItem value="precio">Precio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2"> */}
                  {/* <div className="w-full sm:w-1/2 flex items-center space-x-2">
                      <Search className="h-4 w-4 flex-shrink-0" />
                      <Input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full"
                      />
                    </div> */}
                  {/* <div className="w-full sm:w-1/2 flex items-center space-x-2">
                      <Filter className="h-4 w-4 flex-shrink-0" />
                      <Select value={filtro} onValueChange={setFiltro}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Filtrar por" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos</SelectItem>
                          <SelectItem value="comprados">Comprados</SelectItem>
                          <SelectItem value="pendientes">Pendientes</SelectItem>
                          {categorias.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div> */}
                  {/* </div> */}
                  {/* <Select value={orden} onValueChange={setOrden}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nombre">Nombre</SelectItem>
                      <SelectItem value="categoria">Categoría</SelectItem>
                      <SelectItem value="precio">Precio</SelectItem>
                    </SelectContent>
                  </Select> */}
                </CollapsibleContent>
              </Collapsible>
              {/* <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="ml-2">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Vaciar Lista
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Esto eliminará
                      permanentemente todos los items de tu lista de compras.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={vaciarLista}>
                      Vaciar Lista
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog> */}
            </div>

            {/* INFO */}
            {/* <div className="space-y-2 text-muted-foreground text-xs md:text-sm py-4 xl:flex xl:justify-between xl:items-center">
              <p className="flex justify-center items-center gap-4">
                <span className="flex items-center">
                  <span>
                    <ShoppingCart />
                  </span>
                  <span className="hidden md:inline">Productos</span>:{" "}
                  {totalItems !== undefined && totalItems !== undefined
                    ? totalItems
                    : 0}
                </span>
                <span className="flex items-center">
                  <span>
                    <Check />
                  </span>
                  <span className="hidden md:inline">Comprados</span>:{" "}
                  {itemsComprados !== undefined && itemsComprados !== undefined
                    ? itemsComprados
                    : 0}
                </span>
                <span className="flex items-center">
                  <span>
                    <X />
                  </span>
                  <span className="hidden md:inline">Pendientes</span>:{" "}
                  {totalItems !== undefined && itemsComprados !== undefined
                    ? totalItems - itemsComprados
                    : 0}
                </span>
              </p>
              <p className="flex justify-center items-center gap-4">
                <span className="flex items-center justify-center">
                  <span></span>
                  <DollarSign />
                  <span className="hidden md:flex">Costo total estimado</span>:
                  ${costoTotal.toFixed(2)}
                </span>
                <span className="flex items-center">
                  <span>
                    <HandCoins />
                  </span>
                  <span className="hidden md:inline">Pagar</span>: $
                  {costoComprado.toFixed(2)}
                </span>
                <span className="flex items-center">
                  <span>
                    <Diff />
                  </span>
                  <span className="hidden md:inline">Diferencia</span>: $
                  {(costoTotal - costoComprado).toFixed(2)}
                </span>
              </p>
            </div> */}

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <Collapsible
                open={isStatsOpen}
                onOpenChange={setIsStatsOpen}
                className="w-full space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-5 w-5" />
                    <h4 className="font-semibold">Resumen de la Lista</h4>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                      {isStatsOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2">
                  <div className="text-sm xl:flex xl:items-center xl:justify-between">
                    <div className="md:flex items-center md:gap-6">
                      <p className="flex items-center gap-1">
                        <ShoppingCart className="w-4 h-4" />{" "}
                        <span>Total de artículos:</span>
                        <span className="font-medium">
                          {totalItems !== undefined && totalItems !== undefined
                            ? totalItems
                            : 0}
                        </span>
                      </p>
                      <p className="flex items-center gap-6">
                        <div className="flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          <span>Comprados:</span>
                          <span className="font-medium">{itemsComprados}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <X className="w-4 h-4" />
                          <span>Pendientes:</span>
                          <span className="font-medium">
                            {totalItems !== undefined &&
                            itemsComprados !== undefined
                              ? totalItems - itemsComprados
                              : 0}
                          </span>
                        </div>
                      </p>
                    </div>
                    <div className="md:flex items-center md:gap-6">
                      <p className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>Costo total estimado:</span>
                        <span className="font-medium">
                          ${costoTotal.toFixed(2)}
                        </span>
                      </p>
                      <p className="flex items-center gap-6">
                        <div className="flex items-center gap-1">
                          <HandCoins className="w-4 h-4" />
                          <span>Comprado:</span>
                          <span className="font-medium">
                            ${costoComprado.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Diff className="w-4 h-4" />
                          <span>Diferencia:</span>
                          <span className="font-medium">
                            {(costoTotal - costoComprado).toFixed(2)}
                          </span>
                        </div>
                      </p>
                    </div>
                    {/* <div className="md:flex items-center md:gap-6">
                      <p className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>Costo total estimado:</span>
                        <span className="font-medium">
                          ${costoTotal.toFixed(2)}
                        </span>
                      </p>
                      <p className="flex flex-col md:flex-row md:items-center">
                        <div className="flex flex-row items-center gap-1">
                          <HandCoins className="w-4 h-4" />
                          <span>Comprado:</span>
                          <span className="font-medium">
                            ${costoComprado.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                          <Diff className="w-4 h-4" />
                          <span>Pendiente:</span>{" "}
                          <span className="font-medium">
                            ${(costoTotal - costoComprado).toFixed(2)}
                          </span>
                        </div>
                      </p>
                    </div> */}
                    {/* <p>
                      Total de artículos:{" "}
                      <span className="font-medium">
                        {totalItems !== undefined && totalItems !== undefined
                          ? totalItems
                          : 0}
                      </span>
                    </p> */}
                    {/* <p className="flex items-center gap-2">
                      Comprados:{" "}
                      <span className="font-medium">{itemsComprados}</span> |
                      Pendientes:{" "}
                      <span className="font-medium">
                        {totalItems !== undefined &&
                        itemsComprados !== undefined
                          ? totalItems - itemsComprados
                          : 0}
                      </span>
                    </p> */}
                    {/* <p>
                      Costo total estimado:{" "}
                      <span className="font-medium">
                        ${costoTotal.toFixed(2)}
                      </span>
                    </p> */}
                    {/* <p className="flex items-center gap-2">
                      Comprado:{" "}
                      <span className="font-medium">
                        ${costoComprado.toFixed(2)}
                      </span>{" "}
                      | Pendiente:{" "}
                      <span className="font-medium">
                        ${(costoTotal - costoComprado).toFixed(2)}
                      </span>
                    </p> */}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <ScrollArea className="py-4">
              <ul className="space-y-4">
                {itemsFiltrados.map((item) => (
                  <li key={item.id} className="bg-secondary rounded-lg">
                    {editandoId === item.id ? (
                      <div className="p-4 space-y-4">
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                          <Input
                            value={item.nombre}
                            onChange={(e) =>
                              setItems(
                                (prevItems) =>
                                  prevItems?.map((i) =>
                                    i.id === item.id
                                      ? { ...i, nombre: e.target.value }
                                      : i
                                  ) ?? []
                              )
                            }
                            className="w-full sm:w-2/3"
                          />
                          <Input
                            type="number"
                            value={item.cantidad}
                            onChange={(e) =>
                              setItems(
                                (prevItems) =>
                                  prevItems?.map((i) =>
                                    i.id === item.id
                                      ? {
                                          ...i,
                                          cantidad: Number(e.target.value),
                                        }
                                      : i
                                  ) ?? []
                              )
                            }
                            className="w-full sm:w-20"
                          />
                          <Input
                            type="number"
                            value={item.precio}
                            onChange={(e) =>
                              setItems(
                                (prevItems) =>
                                  prevItems?.map((i) =>
                                    i.id === item.id
                                      ? { ...i, precio: Number(e.target.value) }
                                      : i
                                  ) ?? []
                              )
                            }
                            className="w-full sm:w-24"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button
                            onClick={() =>
                              guardarEdicion(
                                item.id,
                                item.nombre,
                                item.cantidad,
                                item.precio
                              )
                            }
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Guardar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                          <Checkbox
                            id={`item-${item.id}`}
                            checked={item.comprado}
                            onCheckedChange={() => toggleComprado(item.id)}
                          />
                          <div>
                            <label
                              htmlFor={`item-${item.id}`}
                              className={`font-medium ${
                                item.comprado
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }`}
                            >
                              {item.nombre}
                            </label>
                            <div className="text-sm text-muted-foreground">
                              <span className="mr-2">
                                {item.cantidad} unidades
                              </span>
                              <span>${item.precio.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>{item.categoria}</Badge>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => editarItem(item.id)}
                          >
                            <Edit2 className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => eliminarItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </ScrollArea>

            {/* <ul className="mt-4 space-y-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {itemsFiltrados.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 bg-secondary rounded"
                >
                  {editandoId === item.id ? (
                    <div className="w-full flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <Input
                        value={item.nombre}
                        onChange={(e) =>
                          setItems(
                            (prevItems) =>
                              prevItems?.map((i) =>
                                i.id === item.id
                                  ? { ...i, nombre: e.target.value }
                                  : i
                              ) ?? []
                          )
                        }
                        className="w-full sm:w-2/3"
                      />
                      <Input
                        type="number"
                        value={item.cantidad}
                        onChange={(e) =>
                          setItems(
                            (prevItems) =>
                              prevItems?.map((i) =>
                                i.id === item.id
                                  ? { ...i, cantidad: Number(e.target.value) }
                                  : i
                              ) ?? []
                          )
                        }
                        className="w-full sm:w-20"
                      />
                      <Input
                        type="number"
                        value={item.precio}
                        onChange={(e) =>
                          setItems(
                            (prevItems) =>
                              prevItems?.map((i) =>
                                i.id === item.id
                                  ? { ...i, precio: Number(e.target.value) }
                                  : i
                              ) ?? []
                          )
                        }
                        className="w-full sm:w-24"
                      />
                      <Button
                        onClick={() =>
                          guardarEdicion(
                            item.id,
                            item.nombre,
                            item.cantidad,
                            item.precio
                          )
                        }
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Guardar
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <Checkbox
                          id={`item-${item.id}`}
                          checked={item.comprado}
                          onCheckedChange={() => toggleComprado(item.id)}
                          className="w-5 h-5"
                        />
                        <label
                          htmlFor={`item-${item.id}`}
                          className={`${
                            item.comprado
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                        >
                          <p className="font-bold">{item.nombre}</p>
                          <p>
                            <span>Cantidad:({item.cantidad})</span> |{" "}
                            <span>
                              Precio:${(item.cantidad * item.precio).toFixed(2)}
                            </span>
                          </p>
                        </label>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => editarItem(item.id)}
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => eliminarItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul> */}
          </TabsContent>
          <TabsContent value="agregar">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre-item">Nombre del artículo</Label>
                  <Input
                    id="nombre-item"
                    type="text"
                    placeholder="Nombre del artículo"
                    value={nuevoItem}
                    onChange={(e) => setNuevoItem(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cantidad-item">Cantidad</Label>
                  <Input
                    id="cantidad-item"
                    type="number"
                    min="1"
                    value={nuevaCantidad}
                    onChange={(e) => setNuevaCantidad(parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria-item">Categoría</Label>
                  <Select
                    value={nuevaCategoria}
                    onValueChange={setNuevaCategoria}
                  >
                    <SelectTrigger id="categoria-item">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="precio-item">Precio unidad</Label>
                  <Input
                    id="precio-item"
                    type="number"
                    min="0"
                    step="0.01"
                    value={nuevoPrecio}
                    onChange={(e) => setNuevoPrecio(parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <Button onClick={agregarItem} className="w-full">
                Agregar a la lista
              </Button>
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-2">
                  Gestionar Categorías
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {categorias.map((cat) => (
                    <div
                      key={cat}
                      className="flex items-center bg-secondary rounded-full px-3 py-1"
                    >
                      <span className="mr-2">{cat}</span>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              ¿Eliminar categoría?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              ¿Estás seguro de que quieres eliminar la categoría
                              &quot;{cat}&quot;? Los items en esta categoría se
                              moverán a &quot;Otros&quot;.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => eliminarCategoria(cat)}
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Nueva categoría"
                    value={nuevaCategoriaInput}
                    onChange={(e) => setNuevaCategoriaInput(e.target.value)}
                  />
                  <Button onClick={agregarCategoria}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
