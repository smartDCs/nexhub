import React from 'react'
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import ComprobantePago from './ComprobantePago';
function Report() {
  return (
    <PDFViewer className='reportViewer'>
    <ComprobantePago />
  </PDFViewer>
  )
}

export default Report