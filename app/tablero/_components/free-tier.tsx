"use client";

import React, { useCallback } from "react";
import { useState, useEffect, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  ShoppingCart,
  Filter,
  DollarSign,
  Trash2,
  Edit2,
  Save,
  Check,
  X,
  Plus,
  List,
  HandCoins,
  Diff,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Props = {};

interface ItemCompra {
  id: number;
  nombre: string;
  cantidad: number;
  // categoria: string;
  comprado: boolean;
  precio: number;
}

export default function FreeTier({}: Props) {
  const [items, setItems] = useState<ItemCompra[] | []>([]);
  const [nuevoItem, setNuevoItem] = useState("");
  const [nuevaCantidad, setNuevaCantidad] = useState(1);
  //   const [nuevaCategoria, setNuevaCategoria] = useState(categorias[0]);
  const [nuevoPrecio, setNuevoPrecio] = useState(0);
  const [filtro, setFiltro] = useState("todos");
  const [orden, setOrden] = useState("nombre");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // Cargar los datos de localStorage solo cuando el componente se monte en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem("listoAPP");
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setItems(parsedItems);
        }
      }
    }
  }, []);

  // Guardar los datos en localStorage cada vez que cambie la lista de productos
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("listoAPP", JSON.stringify(items));
    }
  }, [items]);

  //   useEffect(() => {
  //     localStorage.setItem("listoAPP", JSON.stringify(items));
  //   }, [items]);

  const agregarItem = () => {
    if (nuevoItem.trim() !== "") {
      setItems([
        ...items,
        {
          id: Date.now(),
          nombre: nuevoItem,
          cantidad: nuevaCantidad,
          //   categoria: nuevaCategoria,
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
      items.map((item) =>
        item.id === id ? { ...item, comprado: !item.comprado } : item
      )
    );
  };

  const eliminarItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
    toast.error("Producto eliminado satisfactoriamente.");
  };

  const editarItem = (id: number) => {
    setEditandoId(id);
  };

  const guardarEdicion = useCallback(
    (
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
      toast.success("Producto editado satisfactoriamente.");
    },
    [items, setItems, setEditandoId]
  );

  const itemsFiltrados = items
    .filter((item) => {
      if (filtro === "todos") return true;
      if (filtro === "comprados") return item.comprado;
      if (filtro === "pendientes") return !item.comprado;
      //   return item.categoria === filtro;
    })
    .sort((a, b) => {
      if (orden === "nombre") return a.nombre.localeCompare(b.nombre);
      //   if (orden === "categoria") return a.categoria.localeCompare(b.categoria);
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

  const vaciarLista = () => {
    // Limpiar la lista de productos en el estado
    setItems([]);

    // Limpiar la lista de productos del localStorage
    localStorage.removeItem("listoAPP");

    // Mostrar la notificación de éxito
    toast.success("Lista de productos vaciada.");
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center justify-between gap-10 w-full md:w-1/3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus />
                <span className="">Agregar</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Producto a la Lista</DialogTitle>
                <DialogDescription>
                  Agregue un nuevo producto en su lista aquí. Haga clic en
                  agregar cuando haya terminado.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nombre-item" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="nombre-item"
                    className="col-span-3"
                    type="text"
                    placeholder="Nombre del artículo"
                    value={nuevoItem}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => setNuevoItem(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cantidad-item" className="text-right">
                    Cantidad
                  </Label>
                  <Input
                    id="cantidad-item"
                    className="col-span-3"
                    type="number"
                    min="1"
                    value={nuevaCantidad}
                    onChange={(e: { target: { value: string } }) =>
                      setNuevaCantidad(parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="precio-item" className="text-right">
                    Precio estimado
                  </Label>
                  <Input
                    id="precio-item"
                    className="col-span-3"
                    type="number"
                    min="0"
                    step="0.01"
                    value={nuevoPrecio}
                    onChange={(e: { target: { value: string } }) =>
                      setNuevoPrecio(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      agregarItem();
                      setNuevoItem("");
                      setNuevaCantidad(1);
                      setNuevoPrecio(0);
                    }}
                    className="w-full"
                  >
                    Agregar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            onClick={vaciarLista}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <Trash2 />
            <span className="">Vaciar</span>
          </Button>
        </div>

        <div className="w-full py-4 md:flex md:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-6 w-6" />
            <span>Fitros:</span>
          </div>
          <div className="flex items-center justify-between gap-4 w-full">
            <Select value={filtro} onValueChange={setFiltro}>
              <SelectTrigger className="">
                <SelectValue placeholder="Filtrar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="comprados">Comprados</SelectItem>
                <SelectItem value="pendientes">Pendientes</SelectItem>
              </SelectContent>
            </Select>
            <Select value={orden} onValueChange={setOrden}>
              <SelectTrigger className="">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nombre">Nombre</SelectItem>
                <SelectItem value="precio">Precio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* INFO */}
      <div className="space-y-2 text-muted-foreground py-4 2xl:flex 2xl:justify-between 2xl:items-center">
        <p className="flex justify-center items-center gap-4">
          <span className="flex items-center">
            <span>
              <ShoppingCart />
            </span>
            <span className="hidden md:inline">Productos</span>: {totalItems}
          </span>
          <span className="flex items-center">
            <span>
              <Check />
            </span>
            <span className="hidden md:inline">Comprados</span>:{" "}
            {itemsComprados}
          </span>
          <span className="flex items-center">
            <span>
              <X />
            </span>
            <span className="hidden md:inline">Pendientes</span>:{" "}
            {totalItems - itemsComprados}
          </span>
        </p>
        <p className="flex justify-center items-center gap-4">
          <span className="flex items-center">
            <span>
              <DollarSign />
            </span>
            <span className="hidden md:inline">Costo total estimado</span>: $
            {costoTotal.toFixed(2)}
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
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-3 py-3">
        {itemsFiltrados.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 bg-secondary rounded"
          >
            {editandoId === item.id ? (
              <>
                <Input
                  value={item.nombre}
                  onChange={(e: { target: { value: string } }) =>
                    setItems(
                      items.map((i) =>
                        i.id === item.id ? { ...i, nombre: e.target.value } : i
                      )
                    )
                  }
                  className="w-1/3"
                />
                <Input
                  type="number"
                  value={item.cantidad}
                  onChange={(e: { target: { value: string } }) =>
                    setItems(
                      items.map((i) =>
                        i.id === item.id
                          ? { ...i, cantidad: Number(e.target.value) }
                          : i
                      )
                    )
                  }
                  className="w-20"
                />
                <Input
                  type="number"
                  value={item.precio}
                  onChange={(e: { target: { value: string } }) =>
                    setItems(
                      items.map((i) =>
                        i.id === item.id
                          ? { ...i, precio: Number(e.target.value) }
                          : i
                      )
                    )
                  }
                  className="w-20"
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
                  <Save className="h-4 w-4" />
                  <span className="sr-only">Guardar</span>
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id={`item-${item.id}`}
                    checked={item.comprado}
                    onCheckedChange={() => toggleComprado(item.id)}
                    className="w-8 h-8"
                  />
                  <label
                    htmlFor={`item-${item.id}`}
                    className={`${
                      item.comprado ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    <p>{item.nombre}</p>
                    <p>
                      <span>({item.cantidad})</span> |{" "}
                      <span>${(item.cantidad * item.precio).toFixed(2)}</span>
                    </p>
                  </label>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/15"
                    onClick={() => editarItem(item.id)}
                  >
                    <Edit2 className="h-4 w-4" />
                    <span className="sr-only">Editar item</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="hover:bg-primary/15"
                    size="icon"
                    onClick={() => eliminarItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar item</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
