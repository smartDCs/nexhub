import { StyleSheet } from "@react-pdf/renderer";
export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "15mm",
    // paddingBottom:"15mm"
  },
  ContenedorDatos: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  datosTributarios: {
    width: "280px",

    flexDirection: "column",

    fontSize: 14,

    marginRight: "15mm",

    border: "1 solid grey",
    borderRadius: 3,
    marginBottom: "5mm",
  },
  datosCotizacion: {
    width: "280px",
    fontFamily: "Helvetica",
    flexDirection: "column",

    position: "relative",
    fontSize: 14,
    marginLeft: "15mm",

    marginBottom: "5mm",
    border: "1 solid grey",
    borderRadius: 3,
  },
  negrilla: {
    fontWeight: "bold",
    fontSize: 12,
  },
  signatureArea: {
    flexDirection: "row",
    paddingTop: 50,
    fontSize: 11,
    justifyContent: "space-between",
  },
  firma: {
    paddingLeft: 60,
    paddingRight: 60,
    borderTop: "1 solid black",
  },
  logo: {
    width: 74,
    height: 40,
    marginTop: "15mm",
    //position: "absolute",
    left: "15mm",
  },
  datos: {
    //display: "flex",
    flexDirection: "row",
    //  justifyContent:"space-between",

    width: "50%",
  },
  labeldatos: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 5,
    width: "20mm",
  },
  textdatos: {
    fontSize: 11,
    textAlign: "left",
    marginTop: 5,
    width: "60mm",
  },

  labelPago: {
    fontWeight: "bold",
    textAlign: "center",
  },
  table: {
    display: "table",

    marginTop: "5mm",
    border: "1px solid grey",
   
  },
  tableRow: {
    marginBottom: "2mm",
    flexDirection: "row",
    textAlign: "center",
  },
  PaymentRow: {
    flexDirection: "row",
    fontSize: 11,
    textAlign: "center",
    //marginTop: "5mm",
    border: "1 solid grey",
    backgroundColor: "#464566",
    color: "white",
  },

  observaciones: {
    border: "1 solid grey",
    marginTop: "10mm",
    padding: 10,
    textAlign: "justify",
  },
  totales: {
    width: "20%",
    backgroundColor: "#464566",
    color: "white",
    verticalAlign: "center",
  },
  tableTotales: {

    flexDirection: "row",
    textAlign: "center",
    justifyContent: "flex-end",
    fontSize: 14,
   
  },
  totales1: {
    width: "25%",
    border:"1px solid grey",
    verticalAlign: "center",
    fontWeight:"bold"
  },
  footer:{
    flexDirection:"row",
    display: "flex",
  color:"grey",
    position: 'absolute',
    paddingLeft:"15mm",
fontSize:8,
bottom:"10mm",

fontStyle:'italic'
  },
});
