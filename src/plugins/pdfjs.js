import * as PDFJS from "pdfjs-dist";

PDFJS.GlobalWorkerOptions.workerSrc ="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.7.107/build/pdf.worker.min.js";
export default ({ app }, inject) => {
  inject("pdfjsLib", PDFJS);
};
