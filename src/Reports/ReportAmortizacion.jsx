import { useContext } from "react";
import { PDFViewer } from "@react-pdf/renderer";

import { AmortizacionContext } from "../context/amortizacion/AmortizacionContext";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { styles } from "../assets/AmortizacionStyles";

import number_to_words from "@darth777/number_to_words";
import logo1 from "../assets/Icons/logo1.png";
import dayjs from "dayjs";

function ReportAmortizacion() {
  const { datosUsuario, datosCredito, datosBeneficiario, tablaAmortizacion } =
    useContext(AmortizacionContext);
  const valor = number_to_words(datosCredito.monto).split("con");
  if (valor.length === 1) {
    valor[1] = "cero";
  }
  dayjs.locale("es");
  const dia = dayjs().date();
  const mes = dayjs().format("MMMM");
  const year = dayjs().format("YYYY");

  return (
    <PDFViewer className="reportViewer">
      <Document>
        <Page size="A4" style={styles.page}>
          {/** Header */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              <Image src={logo1} style={styles.logo} />

              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  marginTop: "50px",
                }}
              >
                <Text>Pagaré</Text>
              </View>
              <View style={styles.datosPagare}>
                <Text>
                  Yo, <Text style={styles.negrilla}>{datosUsuario.nombre}</Text>
                  , con domicilio en{" "}
                  <Text style={styles.negrilla}>{datosUsuario.addr}</Text>,
                  identificado con CI.{" "}
                  <Text style={styles.negrilla}>{datosUsuario.ci}</Text>, en
                  adelante "El Deudor", reconozco deber y me obligo a pagar
                  incondicionalmente a <Text style={styles.negrilla}>{datosBeneficiario.nombre}</Text>, con domicilio
                  en <Text style={styles.negrilla}>{datosBeneficiario.addr}</Text>, identificado con CI.
                  <Text style={styles.negrilla}>{datosBeneficiario.ci}</Text>, en adelante "El Acreedor", o a su orden,
                  la cantidad de $
                  <Text style={styles.negrilla}>{datosCredito.monto}</Text>
                  <Text style={{ textTransform: "uppercase" }}>
                    {" "}
                    ({valor[0]} dólares con {valor[1]} centavos)
                  </Text>
                  , por motivo de{" "}
                  <Text style={styles.negrilla}>{datosCredito.objeto}</Text>,
                  más los intereses pactados a la tasa del{" "}
                  {datosCredito.interes}% anual, desde la fecha de este pagaré
                  hasta su completo pago.
                  <Text>
                    {"\n\n"}
                    El Deudor se compromete a efectuar el pago en{" "}
                    {datosCredito.plazo} cuotas de acuerdo a la tabla de
                    amortización adjunta, comenzando a partir del{" "}
                    {datosUsuario.fecha}.
                  </Text>
                  <Text>
                    {"\n\n"}
                    El incumplimiento en el pago de cualquiera de las cuotas o
                    del total adeudado, facultará a El Acreedor a exigir el
                    saldo pendiente, sin necesidad de declaración previa de
                    incumplimiento y sin perjuicio de las acciones legales que
                    correspondan.
                  </Text>
                  <Text>
                    {"\n\n"}
                    El presente pagaré se rige por las leyes de ECUADOR, y
                    cualquier controversia que surja en relación con el mismo
                    será sometida a la jurisdicción de los tribunales
                    competentes de la ciudad de Latacunga.
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.datosCotizacion}>
            <Text>TABLA DE AMORTIZACION</Text>
          </View>

          {/**Tabla de amortizacion */}

          <View style={styles.table}>
            <View style={styles.PaymentRow}>
              <Text
                style={{ width: "8%", marginTop: "2mm", marginBottom: "2mm" }}
              >
                Nº
              </Text>
              <Text
                style={{ width: "17%", marginTop: "2mm", marginBottom: "2mm" }}
              >
                FECHA
              </Text>
              <Text
                style={{ width: "17%", marginTop: "2mm", marginBottom: "2mm" }}
              >
                INTERÉS $
              </Text>
              <Text
                style={{ width: "17%", marginTop: "2mm", marginBottom: "2mm" }}
              >
                CAPITAL $
              </Text>
              <Text
                style={{ width: "17%", marginTop: "2mm", marginBottom: "2mm" }}
              >
                CUOTA $
              </Text>
              <Text
                style={{ width: "22%", marginTop: "2mm", marginBottom: "2mm" }}
              >
                SALDO RESTANTE
              </Text>
            </View>
            {/**Filas de la cotizacion */}

            {tablaAmortizacion.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={{ width: "8%", fontSize: "11" }}>
                  {item.numero}
                </Text>

                <Text style={{ width: "17%", fontSize: "11" }}>
                  {item.date}
                </Text>

                <Text style={{ width: "17%", fontSize: "11" }}>
                  {item.interest}
                </Text>

                <Text style={{ width: "17%", fontSize: "11" }}>
                  {item.capital}
                </Text>

                <Text style={{ width: "17%", fontSize: "11" }}>
                  {item.principal}
                </Text>

                <Text style={{ width: "22%", fontSize: "11" }}>
                  {item.remainingBalance}
                </Text>
              </View>
            ))}
          </View>
          <View style={{ display: "table" }}>
            <View style={styles.tableTotales}>
              <Text style={styles.totales}>Interes Total</Text>
              <Text style={styles.totales1}>
                {" "}
                $ {datosCredito.interesTotal}
              </Text>
            </View>
          </View>
          {/**Observaciones */}
          <View style={styles.observaciones}>
            <Text style={{ fontSize: 12 }}>
              {"\n"}
              Firmado en Latacunga, a los {dia} días del mes de {mes} del año{" "}
              {year}.
            </Text>
            <Text></Text>
            <View style={styles.signatureArea}>
              <Text style={styles.firma}>{datosBeneficiario.nombre}{'\n'}CI.:{datosBeneficiario.ci}{'\n'}Teléfono:{datosBeneficiario.telefono}</Text>
              <Text></Text>
              <Text style={styles.firma}>{datosUsuario.nombre}{'\n'}CI.:
              {datosUsuario.ci}{'\n'}Teléfono:
              {datosUsuario.telefono}</Text>
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
          <Text
            fixed
            style={{
              position: "absolute",
              fontSize: "8",
              color: "grey",
              bottom: "10mm",
              right: "15mm",
            }}
          >
            {" "}
            Desarrollado por {"<2DEVS/>"} 2024
          </Text>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default ReportAmortizacion;
