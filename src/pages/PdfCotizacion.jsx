import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { styles } from "../assets/QuoteStyles";

import logo1 from "../assets/Icons/logo1.png";
function PdfCotizacion() {
  let numero = 122232;
  let Cbanco = "PICHINCHA";
  let Tbanco = "INTERNACIONAL";
  let Cdoc = 434252;
  let Tdoc = 546464;
  let cliente = "Juanito Perez";
  let emisor = "Elaborado por";
  let fecha = dayjs().format("YYYY/MM/DD");
  let validez = 8;

  const data = [
    {
      item: 1,
      code: "INSELEC",
      description: "Mano de obra por instalación de acometida 3x8+10 AWG",
      unity: "m",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 2,
      code: "INSELEC",
      description: "Punto de tomacorriente 110V",
      unity: "u",
      cantidad: 3,
      price1: 523,
      price2: 1569,
    },
    {
      item: 3,
      code: "INSELEC",
      description: "Punto de iluminación",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 4,
      code: "INSELEC",
      description: "Punto de red CAT-6",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 5,
      code: "INSELEC",
      description: "Mano de obra por instalación de acometida 3x10+10 AWG",
      unity: "m",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 6,
      code: "INSELEC",
      description:
        "Mano de obra por instalación de varilla de puesta a tierra con GEM conductivo",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 7,
      code: "INSELEC",
      description: "Punto de tomacorriente 220V",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 8,
      code: "INSELEC",
      description: "Mano de obra por instalación acometida 3x6+10 AWG",
      unity: "m",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 9,
      code: "INSELEC",
      description: "Armado de tablero eléctrico de 1 a 12 circuitos",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 10,
      code: "INSELEC",
      description: "Armado de tablero eléctrico de 13 a 24 circuitos",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 11,
      code: "INSELEC",
      description: "Instalación y configuración de videoportero analógico",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 12,
      code: "INSELEC",
      description: "Instalación y configuración de videoportero IP",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 1,
      code: "INSELEC",
      description: "Mano de obra por instalación de acometida 3x8+10 AWG",
      unity: "m",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 2,
      code: "INSELEC",
      description: "Punto de tomacorriente 110V",
      unity: "u",
      cantidad: 3,
      price1: 523,
      price2: 1569,
    },
    {
      item: 3,
      code: "INSELEC",
      description: "Punto de iluminación",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 4,
      code: "INSELEC",
      description: "Punto de red CAT-6",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 5,
      code: "INSELEC",
      description: "Mano de obra por instalación de acometida 3x10+10 AWG",
      unity: "m",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 6,
      code: "INSELEC",
      description:
        "Mano de obra por instalación de varilla de puesta a tierra con GEM conductivo",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 7,
      code: "INSELEC",
      description: "Punto de tomacorriente 220V",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 8,
      code: "INSELEC",
      description: "Mano de obra por instalación acometida 3x6+10 AWG",
      unity: "m",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 9,
      code: "INSELEC",
      description: "Armado de tablero eléctrico de 1 a 12 circuitos",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 10,
      code: "INSELEC",
      description: "Armado de tablero eléctrico de 13 a 24 circuitos",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 11,
      code: "INSELEC",
      description: "Instalación y configuración de videoportero analógico",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 12,
      code: "INSELEC",
      description: "Instalación y configuración de videoportero IP",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
  ];
  return (
    <Document>
      <Page size="A4" style={styles.page} >
        {/** Header */}
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            <Image src={logo1} style={styles.logo} />
            <View>
              <View style={styles.datosTributarios}>
                <Text style={{ margin: "5mm", marginBottom: "0" }}>
                  <Text style={styles.negrilla}>Dirección: </Text>

                  <Text style={{ fontSize: "10" }}>
                    Av. Unidad Nacional y Avellanos, Edf. San José
                  </Text>
                </Text>
                <Text style={{ margin: "5mm", marginBottom: "0" }}>
                  <Text style={styles.negrilla}>E-mail: </Text>

                  <Text style={{ fontSize: "10" }}>domotizarq@outlook.es</Text>
                </Text>
                <Text style={{ margin: "5mm" }}>
                  <Text style={styles.negrilla}>RUC: </Text>

                  <Text style={{ fontSize: "10" }}>0503251548001</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.datosCotizacion}>
            <Text
              style={{
                textAlign: "center",
                marginTop: "5mm",
                marginBottom: "5mm",
                fontWeight: "bold",
                fontSize: "18",
              }}
            >
              PROFORMA Nº {numero}
            </Text>
            <Text style={{ marginLeft: "5mm" }}>
              <Text style={styles.negrilla}>Fecha de emisión: </Text>
              <Text style={{ fontSize: "11" }}>{fecha}</Text>
            </Text>
            <Text
              style={{
                textAlign: "center",
                marginTop: "5mm",
                fontWeight: "bold",
                fontSize: "14",
              }}
            >
              FORMA DE PAGO
            </Text>

            <Text style={{ margin: "5mm", marginBottom: "0", fontSize: "11" }}>
              Efectivo, 50% anticipo y 50% contra entrega
            </Text>
            <Text
              style={{
                textAlign: "right",
                fontSize: "9",
                fontStyle: "italic",
                marginTop: "5mm",
                marginRight: "5mm",
                marginBottom: "0mm",
              }}
            >
              Válido por {validez} días
            </Text>
          </View>
        </View>
        {/* Personal data of client*/}
        <View style={styles.ContenedorDatos}>
          <View style={styles.datos}>
            <View style={styles.labeldatos}>
              <Text style={{ marginBottom: 1 }}>Nombre:</Text>
              <Text style={{ marginBottom: 1 }}>C.I./RUC.:</Text>
              <Text style={{ marginBottom: 1 }}>Dirección:</Text>
              <Text style={{ marginBottom: 1 }}>Telf./Cel.:</Text>
            </View>
            <View style={styles.textdatos}>
              <Text style={{ borderBottom: "1 solid grey" }}>{cliente}</Text>
              <Text style={{ borderBottom: "1 solid grey" }}>
                0123456789001
              </Text>
              <Text style={{ borderBottom: "1 solid grey" }}>
                Av. siempre viva 123{" "}
              </Text>
              <Text style={{ borderBottom: "1 solid grey" }}>0987654321</Text>
            </View>
          </View>
        </View>

        {/**Pay method */}

        <View style={styles.table}>
          <View style={styles.PaymentRow}>
            <Text
              style={{ width: "8%", marginTop: "2mm", marginBottom: "2mm" }}
            >
              ITEM
            </Text>
            <Text
              style={{ width: "10%", marginTop: "2mm", marginBottom: "2mm" }}
            >
              CÓDIGO
            </Text>
            <Text
              style={{ width: "40%", marginTop: "2mm", marginBottom: "2mm" }}
            >
              DESCRIPCIÓN
            </Text>
            <Text
              style={{ width: "15%", marginTop: "2mm", marginBottom: "2mm" }}
            >
              CANTIDAD
            </Text>
            <Text
              style={{ width: "7%", marginTop: "2mm", marginBottom: "2mm" }}
            >
              UNIDAD
            </Text>
            <Text
              style={{ width: "10%", marginTop: "2mm", marginBottom: "2mm" }}
            >
              PU.
            </Text>
            <Text
              style={{ width: "10%", marginTop: "2mm", marginBottom: "2mm" }}
            >
              PT.
            </Text>
          </View>
          {/**Filas de la cotizacion */}
          {data.map((item) => (
            <View style={styles.tableRow}>
              <Text style={{ width: "8%", fontSize: "11" }}>{item.item}</Text>

              <Text style={{ width: "10%", fontSize: "11" }}>{item.code}</Text>

              <Text
                style={{ width: "40%", fontSize: "11", textAlign: "justify" }}
              >
                {item.description}
              </Text>

              <Text style={{ width: "15%", fontSize: "11" }}>
                {item.cantidad}
              </Text>

              <Text style={{ width: "7%", fontSize: "11" }}>{item.unity}</Text>

              <Text style={{ width: "10%", fontSize: "11" }}>
                {item.price1}
              </Text>

              <Text style={{ width: "10%", fontSize: "11" }}>
                {item.price2}
              </Text>
            </View>
          ))}
        </View>
        <View style={{display:"table"}}>
          <View style={styles.tableTotales}>
            <Text style={styles.totales}>SUBTOTAL</Text>
            <Text style={styles.totales1}> $ 1543.86</Text>
          </View>
          <View style={styles.tableTotales}>
            <Text style={styles.totales}>IVA 15%</Text>
            <Text style={styles.totales1}>$ 231.69</Text>
          </View>
          <View style={styles.tableTotales}>
            <Text style={styles.totales}>TOTAL</Text>
            <Text style={styles.totales1}>$ 1775.44</Text>
          </View>
        </View>
        {/**Observaciones */}
        <View style={styles.observaciones}>
          <Text style={{ fontSize: 11 }}>Observaciones:</Text>
          <Text style={{ fontSize: 11 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            dicta sequi distinctio vitae adipisci, saepe corrupti magnam vero!
            Consequatur, quos. Repellat laborum labore eos alias neque impedit
            officia, debitis exercitationem!
          </Text>
          <View style={styles.signatureArea}>
            <Text style={styles.firma}>{emisor}</Text>
            <Text style={styles.firma}>{cliente}</Text>
          </View>
        </View>
{/**
 * Pie de página
 */}
<View style={styles.footer} fixed>
  <Text>
<Text>Documento sin validez tributaria</Text>

</Text>
</View>
<Text fixed style={{position:'absolute',fontSize:"8",color:"grey",bottom:"10mm", right:"15mm"}}> Desarrollado por {"<2DEVS/>"} 2024</Text>
      </Page>
    </Document>
  );
}

export default PdfCotizacion;
