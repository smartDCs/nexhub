export function opciones(fileName) {
  const responsive = "simple";
  const tableBodyHeight = "200px";
  const tableBodyMaxHeight = "100%";
  const options = {
    search: true,
    download: true,
    print: false,
    viewColumns: false,
    filter: true,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    selectableRows: "none",
    textLabels: {
      body: {
        noMatch: "No se encontraron coincidencias",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Siguiente",
        previous: "Atras",
        rowsPerPage: "Filas:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todo",
        title: "Filtros",
        reset: "Limpiar filtros",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar columnas",
      },
      selectedRows: {
        text: "Fila(s) seleccionadas",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    },
    downloadOptions: {
      filename: fileName,
    },
  };
  return options;
}
