"use client";

import {
  Check,
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  Pencil,
  Plus,
  Save,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
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
} from "./alert-dialog";
import { Progress } from "./progress-bar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Input } from "./input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
// import { toast } from "sonner";

type Props = {};

interface ItemCompra {
  id: number;
  nombre: string;
  cantidad: number;
  categoria: string;
  comprado: boolean;
  precio: number;
}

export default function App({}: Props) {
  const [items, setItems] = React.useState<ItemCompra[]>();
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [busqueda, setBusqueda] = React.useState("");
  const [categorias, setCategorias] = React.useState<string[]>(() => {
    // Inicializa categorías desde localStorage
    if (typeof window !== "undefined") {
      const savedCategorias = localStorage.getItem("listoAPP-categorias");
      return savedCategorias
        ? JSON.parse(savedCategorias)
        : [
            "Otros",
            "Frutas y Verduras",
            "Carnes",
            "Pescados",
            "Lácteos",
            "Panadería",
            "Bebidas",
            "Limpieza",
          ];
    }
    return [
      "Otros",
      "Frutas y Verduras",
      "Carnes",
      "Pescados",
      "Lácteos",
      "Panadería",
      "Bebidas",
      "Limpieza",
    ];
  });
  const [filtro, setFiltro] = React.useState("todos");
  const [orden, setOrden] = React.useState("nombre");
  const [editandoId, setEditandoId] = React.useState<number | null>(null);

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (typeof window !== "undefined" && items !== undefined) {
      localStorage.setItem("listoAPP-items", JSON.stringify(items));
    }
  }, [items]);

  const vaciarLista = () => {
    setItems([]);
  };

  const totalItems = items?.length || 0;

  const itemsInCart = items?.filter((item) => item.comprado).length || 0;

  const costoTotal =
    items?.reduce((sum, item) => sum + item.precio * item.cantidad, 0) || 0;

  const costoComprado =
    items
      ?.filter((item) => item.comprado)
      .reduce((sum, item) => sum + item.precio * item.cantidad, 0) || 0;

  const porcentajeCompletado =
    (totalItems ?? 0) === 0
      ? 0
      : Math.round(((itemsInCart ?? 0) / (totalItems ?? 0)) * 100);

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

  //   TODO: toast
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
    // toast.success("Producto editado satisfactoriamente.");
  };

  const editarItem = (id: number) => {
    setEditandoId(id);
  };

  //   TODO: toast
  const eliminarItem = (id: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems?.filter((item) => item.id !== id) ?? [];
      if (updatedItems.length < (prevItems?.length ?? 0)) {
        // toast.success("Artículo eliminado con éxito");
      }
      return updatedItems;
    });
  };

  //   TODO: toast
  const toggleComprado = (id: number) => {
    setItems(
      (prevItems) =>
        prevItems?.map((item) =>
          item.id === id ? { ...item, comprado: !item.comprado } : item
        ) ?? []
    );
  };

  return (
    <div className="max-w-lg mx-auto text-sm sm:text-base min-h-screen p-2 sm:px-0">
      <div className="sticky top-0 z-50 bg-[#DAD7CD]">
        <div className="grid grid-cols-2 gap-2 sm:gap-8">
          {/* TODO: create page */}
          <Link
            href="/app/manejar-lista"
            className="bg-[#588175] text-green-950 font-bold px-4 py-2 cursor-pointer rounded-md flex items-center justify-center"
          >
            <Plus /> PRODUCTO
          </Link>

          {/* **** ELIMINAR LISTA **** */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm sm:text-base font-medium ring-offset-bg-red-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-800 text-red-50 px-4 py-2">
                <Trash2 />
                LISTA
              </button>
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
                <AlertDialogCancel className="border border-red-500 text-red-500">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction onClick={vaciarLista} className="bg-red-500">
                  Vaciar Lista
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {/* **** RESUME **** */}
        <div className="bg-[#588175] text-black text-sm sm:text-base rounded-md p-4 my-4">
          <div className="flex items-center justify-center gap-2">
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            <p className="uppercase font-bold">
              total de productos en el carro
            </p>
          </div>

          <div className="flex items-center justify-between my-4 font-extrabold text-lg">
            <p>
              <span>{itemsInCart}</span> / <span>{totalItems}</span>
            </p>
            <p>
              $<span>{costoComprado.toFixed(2)}</span> / $
              <span>{costoTotal?.toFixed(2)}</span>
            </p>
          </div>

          <Progress value={porcentajeCompletado} />

          {itemsInCart !== 0 &&
            totalItems !== 0 &&
            itemsInCart === totalItems && (
              <div className="flex items-center gap-1 py-2 w-full">
                <p className="flex items-center justify-center w-full gap-1">
                  <span>ya estas</span>
                  <AppLogo />
                  <span>para pagar</span>
                </p>
              </div>
            )}
        </div>

        {/* **** SEARCH & FILTERS **** */}
        <div className="flex justify-between items-center my-4 text-xs sm:text-base bg-[#DAD7CD]">
          <Collapsible
            open={isFilterOpen}
            onOpenChange={setIsFilterOpen}
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              {/* **** FILTERS **** */}
              <div className="flex items-center gap-2">
                <h4 className="font-semibold w-full text-base">
                  Filtros y Búsqueda
                </h4>
                <CollapsibleTrigger asChild>
                  <button className="">
                    {isFilterOpen ? (
                      <ChevronUp className="h-6 w-6" />
                    ) : (
                      <ChevronDown className="h-6 w-6" />
                    )}
                    <span className="sr-only">Toggle</span>
                  </button>
                </CollapsibleTrigger>
              </div>
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="grid grid-cols-1">
                <div className="grid grid-cols-2 gap-2">
                  {/* <p className="col-span-2 text-base">Filtrar productos por:</p> */}
                  <div className="w-full flex items-center space-y-2 space-x-2">
                    {/* <Filter className="h-4 w-4 flex-shrink-0" /> */}
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
                  </div>
                  <div className="w-full flex items-center space-y-2 space-x-2">
                    {/* <Filter className="h-4 w-4 flex-shrink-0" /> */}
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
                <div className="w-full flex items-center space-y-2 space-x-2 mt-2">
                  {/* <Search className="h-4 w-4 flex-shrink-0" /> */}
                  <Input
                    type="text"
                    placeholder="Buscar por nombre del producto"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <ul className="space-y-4 mt-4 relative">
        {itemsFiltrados.map((item) => (
          <li key={item.id}>
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
                  <button
                    onClick={() =>
                      guardarEdicion(
                        item.id,
                        item.nombre,
                        item.cantidad,
                        item.precio
                      )
                    }
                    className="bg-[#3A5A40] w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm sm:text-base font-medium ring-offset-bg-red-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-2 rounded shadow-2xl flex items-center gap-2">
                <div className="w-16 h-16">
                  {item.comprado ? (
                    <div className="w-full h-full bg-[#588175] text-black flex items-center justify-center rounded">
                      <ShoppingCart className="w-8 h-8" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-red-900 flex items-center justify-center rounded">
                      <ShoppingCart className="w-8 h-8 text-red-100" />
                    </div>
                  )}
                </div>
                <div className="w-full text-sm sm:text-base">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{item.nombre}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="bg-transparent text-black pr-0 h-1">
                          <EllipsisVertical />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <button
                              //   variant="link"
                              className="flex items-center gap-2"
                              onClick={() => editarItem(item.id)}
                            >
                              <Pencil />
                              <span>Editar</span>
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <button
                              //   variant="link"
                              className="flex items-center gap-2"
                              onClick={() => eliminarItem(item.id)}
                            >
                              <Trash2 />
                              <span>Eliminar</span>
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {item.comprado ? (
                              <div>
                                <button
                                  onClick={() => toggleComprado(item.id)}
                                  //   variant="link"
                                  className="flex items-center gap-2"
                                >
                                  <Trash2 />
                                  <span>Sacar del carrito</span>
                                </button>
                              </div>
                            ) : (
                              <div>
                                <button
                                  onClick={() => toggleComprado(item.id)}
                                  //   variant="link"
                                  className="flex items-center gap-2"
                                >
                                  <ShoppingCart />
                                  <span>Guardar en el carrito</span>
                                </button>
                              </div>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p>{item.categoria}</p>
                  <p className="flex items-center justify-between">
                    <span>Cantidad: ({item.cantidad})</span>
                    <span>$ {item.precio}</span>
                  </p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AppLogo() {
  return (
    <div className="uppercase flex items-center gap-0">
      <span className="text-lg">list</span>
      <span className="bg-black text-white rounded-full ">
        <Check className="h-4 w-4" />
      </span>
    </div>
  );
}
