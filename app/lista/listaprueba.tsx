{
  /* <div className="h-[25vh] p-4 w-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="bg-[#588175] text-secondary-foreground rounded p-4 h-full w-full">
            <div className="flex items-center justify-between font-extrabold text-lg mb-4">
              <p>
                <span>{itemsInCart}</span> / <span>{totalItems}</span>
              </p>
              <p>
                $<span>{costoComprado.toFixed(2)}</span> / $
                <span>{costoTotal?.toFixed(2)}</span>
              </p>
            </div>

            {itemsInCart !== 0 &&
            totalItems !== 0 &&
            itemsInCart === totalItems ? (
              <div className="flex items-center gap-1 pt-2 w-full">
                <p className="flex items-center justify-center w-full gap-1">
                  <span>ya estas</span>
                  <AppLogo />
                  <span>para pagar</span>
                </p>
              </div>
            ) : (
              <Progress value={porcentajeCompletado} />
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 h-full w-full">
            <div className="w-full flex items-center space-y-2 space-x-2">
              <Select value={filtro} onValueChange={setFiltro}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filtrar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="comprados">En Carro</SelectItem>
                  <SelectItem value="pendientes">Fuera de Carro</SelectItem>
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
      </div> */
}

{
  /* <div className="h-[65vh] px-4">
        <ScrollArea className="h-full">
          <Tabs defaultValue="lista" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lista">Lista de Compras</TabsTrigger>
              <TabsTrigger value="categorias">Categorias</TabsTrigger>
            </TabsList>

            <TabsContent value="lista">
              <ul className="space-y-4 text-sm sm:text-base">
                {itemsFiltrados.map((item) => (
                  <li key={item.id}>
                    <Card>
                      {editandoId === item.id ? (
                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={item.nombre}
                              onChange={(e) =>
                                setItems(
                                  items?.map((i) =>
                                    i.id === item.id
                                      ? { ...i, nombre: e.target.value }
                                      : i
                                  )
                                )
                              }
                              className="w-full"
                              placeholder="Nombre del artículo"
                            />
                            <Input
                              type="number"
                              value={item.cantidad}
                              onChange={(e) =>
                                setItems(
                                  items?.map((i) =>
                                    i.id === item.id
                                      ? {
                                          ...i,
                                          cantidad: Number(e.target.value),
                                        }
                                      : i
                                  )
                                )
                              }
                              className="w-full"
                              placeholder="Cantidad"
                            />
                            <Input
                              type="number"
                              value={item.precio}
                              onChange={(e) =>
                                setItems(
                                  items?.map((i) =>
                                    i.id === item.id
                                      ? { ...i, precio: Number(e.target.value) }
                                      : i
                                  )
                                )
                              }
                              className="w-full"
                              placeholder="Precio"
                              step="0.01"
                            />
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={openCombobox}
                                  className="w-full sm:w-auto justify-between"
                                >
                                  {item.categoria}
                                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Buscar categoría..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No se encontró la categoría.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {categorias.map((categoria) => (
                                        <CommandItem
                                          key={categoria}
                                          onSelect={() =>
                                            setItems((prevItems) =>
                                              prevItems?.map((i) =>
                                                i.id === item.id
                                                  ? {
                                                      ...i,
                                                      categoria: categoria,
                                                    }
                                                  : i
                                              )
                                            )
                                          }
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              item.categoria === categoria
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {categoria}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="flex justify-end">
                            <Button
                              onClick={() =>
                                guardarEdicion(
                                  item.id,
                                  item.nombre,
                                  item.cantidad,
                                  item.precio,
                                  item.categoria
                                )
                              }
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Guardar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-2">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <div className="">
                                <span>
                                  {item.comprado ? (
                                    <ShoppingCart className="text-green-600" />
                                  ) : (
                                    <ShoppingCart className="text-red-600" />
                                  )}
                                </span>
                              </div>
                              <p className="text-primary font-bold">
                                {item.nombre}
                              </p>
                            </div>
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
                                      variant="ghost"
                                      className="flex items-center gap-2"
                                      onClick={() => editarItem(item.id)}
                                    >
                                      <Pencil className="h-4 w-4" />
                                      <span className="">Editar</span>
                                    </Button>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Button
                                      variant="ghost"
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
                                          onClick={() =>
                                            toggleComprado(item.id)
                                          }
                                          variant="ghost"
                                          className="flex items-center gap-2"
                                        >
                                          <ShoppingCart />
                                          <span>Sacar del carrito</span>
                                        </Button>
                                      </div>
                                    ) : (
                                      <div>
                                        <Button
                                          onClick={() =>
                                            toggleComprado(item.id)
                                          }
                                          variant="ghost"
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
                          <div className="flex items-center justify-between">
                            <p>({item.cantidad})</p>
                            <p>$ {item.precio}</p>
                          </div>
                        </div>
                      )}
                    </Card>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="categorias">
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-2">
                  Gestionar Categorías
                </h3>
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
                <div className="flex flex-wrap gap-2 mt-4">
                  {categorias.map((cat) => (
                    <div
                      key={cat}
                      className="flex items-center bg-secondary rounded-full px-3 py-1 text-xs sm:text-base"
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
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div> */
}

{
  /* <div className="h-[10vh] p-4 flex items-center justify-between gap-4">
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Producto</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={nuevoItem}
                    onChange={(e) => setNuevoItem(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cantidad-item" className="text-right">
                    Cantidad
                  </Label>
                  <Input
                    id="cantidad-item"
                    type="number"
                    min="1"
                    value={nuevaCantidad}
                    onChange={(e) => setNuevaCantidad(parseInt(e.target.value))}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="precio-item" className="text-right">
                    Precio
                  </Label>
                  <Input
                    id="precio-item"
                    type="number"
                    min="0"
                    step="0.01"
                    value={nuevoPrecio}
                    onChange={(e) => setNuevoPrecio(parseFloat(e.target.value))}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoria-item" className="text-right">
                    Categoría
                  </Label>
                  <div className="col-span-3">
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
                </div>
              </div>
              <DialogFooter>
                <Button onClick={agregarItem}>Agregar Producto</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Input
          type="text"
          placeholder="Buscar por nombre del producto"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full"
        />

        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="destructive">
                <Trash2 />
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
                <AlertDialogAction onClick={vaciarLista} className="bg-red-500">
                  Vaciar Lista
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div> */
}
