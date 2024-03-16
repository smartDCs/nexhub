import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { styles } from "../assets/PdfStyles";
import nexhub from "../assets/Icons/nexhub.png";
import logo1 from "../assets/Icons/logo1.png";
function ComprobantePago() {
  let numero = 32;
  let Cbanco = "PICHINCHA";
  let Tbanco = "INTERNACIONAL";
  let Cdoc = 434252;
  let Tdoc = 546464;
  let cliente='Juanito Perez';
  let emisor="Elaborado por"
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/** Header */}
        <Image src={logo1} style={styles.logo} />
        <View style={styles.header}>
          <Text>RECIBO DE COBRO </Text>
          <Text>Nº {numero}</Text>
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
              <Text style={{ borderBottom: "1 solid grey" }}>
                {cliente}
              </Text>
              <Text style={{ borderBottom: "1 solid grey" }}>
                0123456789001
              </Text>
              <Text style={{ borderBottom: "1 solid grey" }}>
                Av. siempre viva 123{" "}
              </Text>
              <Text style={{ borderBottom: "1 solid grey" }}>0987654321</Text>
            </View>
          </View>
          <View style={styles.fechaviewer}>
            <View style={{ flexDirection: "row", paddingBottom: 10 }}>
              <Text>Fecha de emisión: </Text>

              <Text>{dayjs().format("YYYY/MM/DD")}</Text>
            </View>
          </View>
        </View>
        {/*column header */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.ColDetalles}>
              <Text style={styles.tableCell}>POR CONCEPTO DE:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>VALOR A PAGAR</Text>
            </View>
          </View>
          {/**Table body */}
          <View style={styles.tableRow}>
            <View style={styles.ColDetalles}>
              <Text style={styles.CellDetalles}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                dicta sequi distinctio vitae adipisci, saepe corrupti magnam
                vero! Consequatur, quos. Repellat laborum labore eos alias neque
                impedit officia, debitis exercitationem!
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.valueCell}>${300}</Text>
            </View>
          </View>
        </View>
        {/**Pay method */}

        <View style={styles.table}>
          <View style={styles.PaymentRow}>
            <View style={styles.PaymentCol}>
              <Text style={styles.tableCell}>FORMA DE PAGO:</Text>
            </View>
          </View>
          {/**Payments cols */}
          <View style={styles.PaymentRow}>
            <View style={styles.cashCol}>
              <Text>EFECTIVO</Text>
              <Text>${300}</Text>
            </View>
            <View style={styles.methodCol}>
              <View style={styles.PaymentRow}>
                <View style={styles.bankCol}>
                  <Text></Text>
                </View>
                <View style={styles.bankCol}>
                  <Text>CHEQUE</Text>
                </View>
                <View style={styles.bankCol}>
                  <Text>TRANSF.</Text>
                </View>
              </View>
              <View style={styles.PaymentRow}>
                <View style={styles.bankCol}>
                  <Text style={{ fontWeight: "bold" }}>BANCO</Text>
                </View>
                <View style={styles.bankCol}>
                  <Text>{Cbanco}</Text>
                </View>
                <View style={styles.bankCol}>
                  <Text>{Tbanco}</Text>
                </View>
              </View>
              <View style={styles.PaymentRow}>
                <View style={styles.bankCol}>
                  <Text>Nº DOC.</Text>
                </View>
                <View style={styles.bankCol}>
                  <Text>{Cdoc}</Text>
                </View>
                <View style={styles.bankCol}>
                  <Text>{Tdoc}</Text>
                </View>
              </View>
            </View>
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
          <View  style={styles.signatureArea}>
<Text style={styles.firma}>{emisor}</Text>
<Text style={styles.firma}>{cliente}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default ComprobantePago;
