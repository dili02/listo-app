"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsable";
import {
  Check,
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  Filter,
  Pencil,
  PlusCircle,
  Save,
  Search,
  ShoppingCart,
  Trash2,
  User,
  X,
} from "lucide-react";
import { Progress } from "./progress-bar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Label } from "@/components/ui/label";

type Props = {};

interface ItemCompra {
  id: number;
  nombre: string;
  cantidad: number;
  categoria: string;
  comprado: boolean;
  precio: number;
}

export default function Apppp({}: Props) {
  const [items, setItems] = React.useState<ItemCompra[]>();
  const [categorias, setCategorias] = React.useState<string[]>(() => {
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
  const [nuevoItem, setNuevoItem] = React.useState("");
  const [nuevaCantidad, setNuevaCantidad] = React.useState(1);
  const [nuevaCategoria, setNuevaCategoria] = React.useState(categorias[0]);
  const [nuevoPrecio, setNuevoPrecio] = React.useState(0);
  const [filtro, setFiltro] = React.useState("todos");
  const [orden, setOrden] = React.useState("nombre");
  const [editandoId, setEditandoId] = React.useState<number | null>(null);
  const [busqueda, setBusqueda] = React.useState("");
  const [nuevaCategoriaInput, setNuevaCategoriaInput] = React.useState("");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isStatsOpen, setIsStatsOpen] = React.useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = React.useState<
    string | null
  >(null);

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

  const vaciarLista = () => {
    setItems([]);
  };

  //   TODO: toast
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
      //   toast.success("Categoria agregada satisfactoriamente.");
    }
  };

  //   TODO: toast
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
      //   toast.success("Producto agregado satisfactoriamente.");
    }
  };

  //   TODO: toast
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
    // toast.success("Categoria eliminada satisfactoriamente.");
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

  const totalItems = items?.length;

  const itemsInCart = items?.filter((item) => item.comprado).length;

  const costoTotal =
    items?.reduce((sum, item) => sum + item.precio * item.cantidad, 0) || 0;

  const costoComprado =
    items
      ?.filter((item) => item.comprado)
      .reduce((sum, item) => sum + item.precio * item.cantidad, 0) || 0;

  // calcular el porcentaje de items en el carro para la progress bar
  const porcentajeCompletado =
    (totalItems ?? 0) === 0
      ? 0
      : Math.round(((itemsInCart ?? 0) / (totalItems ?? 0)) * 100);

  return (
    <div className="max-w-lg mx-auto">
      <Tabs defaultValue="lista" className="">
        <TabsList className="grid w-full grid-cols-2 text-[#344E41]">
          <TabsTrigger value="lista">Lista de Compras</TabsTrigger>
          <TabsTrigger value="agregar">Agregar Producto</TabsTrigger>
        </TabsList>

        <TabsContent value="lista">
          {/* **** RESUME **** */}
          <div className="bg-[#588175] text-black rounded p-4 my-4">
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <p className="text-xs sm:text-base uppercase font-bold">
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

            {/* <div className="flex items-center gap-1 py-2 w-full">
        <p className="flex items-center justify-center w-full gap-1">
          <span>ya estas</span>
          <span>
            <AppLogo />
          </span>
          <span>para pagar</span>
        </p>
      </div> */}
          </div>

          {/* **** SEARCH & FILTERS **** */}
          <div className="flex justify-between items-center my-4 text-xs sm:text-base">
            <Collapsible
              open={isFilterOpen}
              onOpenChange={setIsFilterOpen}
              className="w-full space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                {/* **** FILTERS **** */}
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold w-full">Filtros y Búsqueda</h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                      {isFilterOpen ? (
                        <ChevronUp className="h-6 w-6" />
                      ) : (
                        <ChevronDown className="h-6 w-6" />
                      )}
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      //   size="sm"
                      className="ml-2 sm:text-lg"
                    >
                      <Trash2 className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
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
                      <AlertDialogCancel className="border border-red-500 text-red-500">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={vaciarLista}
                        className="bg-red-500"
                      >
                        Vaciar Lista
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <CollapsibleContent className="space-y-2">
                <div className="grid grid-cols-1">
                  <div className="w-full flex items-center space-y-2 space-x-2">
                    {/* <Search className="h-4 w-4 flex-shrink-0" /> */}
                    <Input
                      type="text"
                      placeholder="Buscar por nombre del producto"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <p className="col-span-2">Filtrar productos por:</p>
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
                  {/* <div className="grid grid-cols-1 gap-2">
                    <div className="w-full flex items-center space-y-2 space-x-2">
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
                    </div>
                    <div className="w-full flex items-center space-y-2 space-x-2">
                      <Filter className="h-4 w-4 flex-shrink-0" />
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
                  </div> */}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <ul className="space-y-4 mt-4">
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
                      <Button
                        onClick={() =>
                          guardarEdicion(
                            item.id,
                            item.nombre,
                            item.cantidad,
                            item.precio
                          )
                        }
                        className="bg-[#3A5A40] w-full"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Guardar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-2 rounded shadow-2xl flex items-center gap-2">
                    <div className="w-16 h-16">
                      {item.comprado ? (
                        <div className="w-full h-full bg-green-900 flex items-center justify-center rounded">
                          <ShoppingCart className="w-8 h-8 text-green-100" />
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
                            <Button className="bg-transparent text-black pr-0 h-1">
                              <EllipsisVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                              <DropdownMenuItem>
                                <Button
                                  variant="link"
                                  className="flex items-center gap-2"
                                  onClick={() => editarItem(item.id)}
                                >
                                  <Pencil />
                                  <span>Editar</span>
                                </Button>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Button
                                  variant="link"
                                  className="flex items-center gap-2"
                                  onClick={() => eliminarItem(item.id)}
                                >
                                  <Trash2 />
                                  <span>Eliminar</span>
                                </Button>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {item.comprado ? (
                                  <div>
                                    <Button
                                      onClick={() => toggleComprado(item.id)}
                                      variant="link"
                                      className="flex items-center gap-2"
                                    >
                                      <Trash2 />
                                      <span>Sacar del carrito</span>
                                    </Button>
                                  </div>
                                ) : (
                                  <div>
                                    <Button
                                      onClick={() => toggleComprado(item.id)}
                                      variant="link"
                                      className="flex items-center gap-2"
                                    >
                                      <ShoppingCart />
                                      <span>Guardar en el carrito</span>
                                    </Button>
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
        </TabsContent>

        <TabsContent value="agregar">
          <div className="space-y-2">
            <div className="grid grid-cols-1 gap-4">
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
              <div className="grid grid-cols-2 gap-2">
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

              <Button
                onClick={agregarItem}
                className="w-full bg-[#3A5A40] text-[#A3B18A]"
              >
                Agregar a la lista
              </Button>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-2">
                Gestionar Categorías
              </h3>

              <div className="flex items-center space-x-2 mb-4">
                <Input
                  type="text"
                  placeholder="Nueva categoría"
                  value={nuevaCategoriaInput}
                  onChange={(e) => setNuevaCategoriaInput(e.target.value)}
                />
                <Button
                  onClick={agregarCategoria}
                  className="bg-[#3A5A40] text-[#A3B18A]"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Agregar
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {categorias.map((cat) => (
                  <div
                    key={cat}
                    className="flex items-center bg-green-100 text-black rounded-full px-3 py-1"
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
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ResumeComponent() {
  return (
    <div className="bg-[#588175] rounded p-4 mt-2">
      <div className="flex items-center justify-center gap-4">
        <ShoppingCart />
        <p className="text-lg">total de productos en el carro</p>
      </div>

      <div className="flex items-center justify-between">
        <p>22/22</p>
        <p>$22,00</p>
      </div>

      <Progress value={75} />

      {/* <div className="flex items-center gap-1 py-2 w-full">
        <p className="flex items-center justify-center w-full gap-1">
          <span>ya estas</span>
          <span>
            <AppLogo />
          </span>
          <span>para pagar</span>
        </p>
      </div> */}
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
