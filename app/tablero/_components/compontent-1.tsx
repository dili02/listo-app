"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ItemCompra {
  id: number;
  nombre: string;
  cantidad: number;
  categoria: string;
  comprado: boolean;
  precio: number;
}

export default function Component() {
  const [items, setItems] = useState<ItemCompra[]>(() => {
    const savedItems = localStorage.getItem("listaCompras");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [categorias, setCategorias] = useState<string[]>(() => {
    const savedCategorias = localStorage.getItem("categorias");
    return savedCategorias
      ? JSON.parse(savedCategorias)
      : [
          "Frutas y Verduras",
          "Carnes y Pescados",
          "Lácteos",
          "Panadería",
          "Bebidas",
          "Limpieza",
          "Otros",
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
  const [openCombobox, setOpenCombobox] = useState(false);

  useEffect(() => {
    localStorage.setItem("listaCompras", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }, [categorias]);

  const agregarItem = () => {
    if (nuevoItem.trim() !== "") {
      setItems([
        ...items,
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
    }
  };

  const toggleComprado = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, comprado: !item.comprado } : item
      )
    );
  };

  const eliminarItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
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
    setItems(
      items.map((item) =>
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
  };

  const agregarCategoria = () => {
    if (
      nuevaCategoriaInput.trim() !== "" &&
      !categorias.includes(nuevaCategoriaInput)
    ) {
      setCategorias([...categorias, nuevaCategoriaInput]);
      setNuevaCategoria(nuevaCategoriaInput);
      setNuevaCategoriaInput("");
      setOpenCombobox(false);
    }
  };

  const eliminarCategoria = (categoria: string) => {
    if (categoria === "Otros") return; // Prevent deleting the "Otros" category
    const nuevasCategorias = categorias.filter((cat) => cat !== categoria);
    setCategorias(nuevasCategorias);
    setItems(
      items.map((item) =>
        item.categoria === categoria ? { ...item, categoria: "Otros" } : item
      )
    );
    if (nuevaCategoria === categoria) {
      setNuevaCategoria("Otros");
    }
    if (filtro === categoria) {
      setFiltro("todos");
    }
  };

  const vaciarLista = () => {
    setItems([]);
  };

  const itemsFiltrados = items
    .filter((item) => {
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
      if (orden === "categoria") return a.categoria.localeCompare(b.categoria);
      if (orden === "precio") return a.precio - b.precio;
      return 0;
    });

  const totalItems = items.length;
  const itemsComprados = items.filter((item) => item.comprado).length;
  const costoTotal = items.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );
  const costoComprado = items
    .filter((item) => item.comprado)
    .reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-center">
            <ShoppingCart className="mr-2" />
            Lista de Compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="lista" className="w-full">
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
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">
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
                  </div>
                  <CollapsibleContent className="space-y-2">
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <div className="w-full sm:w-1/2 flex items-center space-x-2">
                        <Search className="h-4 w-4 flex-shrink-0" />
                        <Input
                          type="text"
                          placeholder="Buscar por nombre"
                          value={busqueda}
                          onChange={(e) => setBusqueda(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div className="w-full sm:w-1/2 flex items-center space-x-2">
                        <Filter className="h-4 w-4 flex-shrink-0" />
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openCombobox}
                              className="w-full justify-between"
                            >
                              {filtro}
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Buscar categoría..." />
                              <CommandEmpty>
                                No se encontró la categoría.
                              </CommandEmpty>
                              <CommandGroup>
                                <CommandItem
                                  onSelect={() => setFiltro("todos")}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      filtro === "todos"
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  Todos
                                </CommandItem>
                                <CommandItem
                                  onSelect={() => setFiltro("comprados")}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      filtro === "comprados"
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  Comprados
                                </CommandItem>
                                <CommandItem
                                  onSelect={() => setFiltro("pendientes")}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      filtro === "pendientes"
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  Pendientes
                                </CommandItem>
                                {categorias.map((categoria) => (
                                  <CommandItem
                                    key={categoria}
                                    onSelect={() => setFiltro(categoria)}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        filtro === categoria
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {categoria}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCombobox}
                          className="w-full justify-between"
                        >
                          {orden === "nombre"
                            ? "Nombre"
                            : orden === "categoria"
                            ? "Categoría"
                            : "Precio"}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Buscar orden..." />
                          <CommandEmpty>No se encontró el orden.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem onSelect={() => setOrden("nombre")}>
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  orden === "nombre"
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              Nombre
                            </CommandItem>
                            <CommandItem onSelect={() => setOrden("categoria")}>
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  orden === "categoria"
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              Categoría
                            </CommandItem>
                            <CommandItem onSelect={() => setOrden("precio")}>
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  orden === "precio"
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              Precio
                            </CommandItem>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </CollapsibleContent>
                </Collapsible>
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
                </AlertDialog>
              </div>

              <ScrollArea className="h-[50vh] w-full rounded-md border p-4">
                <ul className="space-y-4">
                  {itemsFiltrados.map((item) => (
                    <li
                      key={item.id}
                      className="bg-card rounded-lg shadow-sm transition-all hover:shadow-md"
                    >
                      {editandoId === item.id ? (
                        <div className="p-4 space-y-4">
                          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                            <Input
                              value={item.nombre}
                              onChange={(e) =>
                                setItems(
                                  items.map((i) =>
                                    i.id === item.id
                                      ? { ...i, nombre: e.target.value }
                                      : i
                                  )
                                )
                              }
                              className="w-full sm:w-1/3"
                              placeholder="Nombre del artículo"
                            />
                            <Input
                              type="number"
                              value={item.cantidad}
                              onChange={(e) =>
                                setItems(
                                  items.map((i) =>
                                    i.id === item.id
                                      ? {
                                          ...i,
                                          cantidad: Number(e.target.value),
                                        }
                                      : i
                                  )
                                )
                              }
                              className="w-full sm:w-20"
                              placeholder="Cantidad"
                            />
                            <Input
                              type="number"
                              value={item.precio}
                              onChange={(e) =>
                                setItems(
                                  items.map((i) =>
                                    i.id === item.id
                                      ? { ...i, precio: Number(e.target.value) }
                                      : i
                                  )
                                )
                              }
                              className="w-full sm:w-24"
                              placeholder="Precio"
                              step="0.01"
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
                            <Badge variant="secondary">{item.categoria}</Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => editarItem(item.id)}
                            >
                              <Edit2 className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button
                              variant="ghost"
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

              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Resumen de la Lista</span>
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div className="space-y-1 text-sm">
                  <p>
                    Total de artículos:{" "}
                    <span className="font-medium">{totalItems}</span>
                  </p>
                  <p>
                    Comprados:{" "}
                    <span className="font-medium">{itemsComprados}</span> |
                    Pendientes:{" "}
                    <span className="font-medium">
                      {totalItems - itemsComprados}
                    </span>
                  </p>
                  <p>
                    Costo total estimado:{" "}
                    <span className="font-medium">
                      ${costoTotal.toFixed(2)}
                    </span>
                  </p>
                  <p>
                    Comprado:{" "}
                    <span className="font-medium">
                      ${costoComprado.toFixed(2)}
                    </span>{" "}
                    | Pendiente:{" "}
                    <span className="font-medium">
                      ${(costoTotal - costoComprado).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
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
                      onChange={(e) =>
                        setNuevaCantidad(parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoria-item">Categoría</Label>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCombobox}
                          className="w-full justify-between"
                        >
                          {nuevaCategoria}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Buscar categoría..." />
                          <CommandEmpty>
                            No se encontró la categoría.
                            <Button
                              className="mt-2 w-full"
                              onClick={agregarCategoria}
                              disabled={!nuevaCategoriaInput.trim()}
                            >
                              Agregar {nuevaCategoriaInput}
                            </Button>
                          </CommandEmpty>
                          <CommandGroup>
                            {categorias.map((categoria) => (
                              <CommandItem
                                key={categoria}
                                onSelect={() => {
                                  setNuevaCategoria(categoria);
                                  setOpenCombobox(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    nuevaCategoria === categoria
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {categoria}
                                {categoria !== "Otros" && (
                                  <Button
                                    variant="ghost"
                                    className="ml-auto h-8 w-8 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      eliminarCategoria(categoria);
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                        <div className="p-2 border-t">
                          <div className="flex items-center space-x-2">
                            <Input
                              placeholder="Nueva categoría"
                              value={nuevaCategoriaInput}
                              onChange={(e) =>
                                setNuevaCategoriaInput(e.target.value)
                              }
                            />
                            <Button
                              onClick={agregarCategoria}
                              disabled={!nuevaCategoriaInput.trim()}
                            >
                              Agregar
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="precio-item">Precio estimado</Label>
                    <Input
                      id="precio-item"
                      type="number"
                      min="0"
                      step="0.01"
                      value={nuevoPrecio}
                      onChange={(e) =>
                        setNuevoPrecio(parseFloat(e.target.value))
                      }
                    />
                  </div>
                </div>
                <Button onClick={agregarItem} className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Agregar a la lista
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
