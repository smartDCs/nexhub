import React from 'react'
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import PdfCotizacion from './PdfCotizacion';
function ReportCotizacion() {
  return (
    <PDFViewer className='reportViewer'>
    <PdfCotizacion />
  </PDFViewer>
  )
}

export default ReportCotizacion