import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { WorkType } from '@/types/common';

export default async function ExportPdf(sortId: string, selectedWorks: WorkType[]) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // 폰트에서 304 에러가 발생하거나 200이 되더라고 멈춥니다.
  const fontUrl = '/fonts/NotoSansKR/NotoSansKR-Regular.woff';
  const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
  const customFont = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 30;

  page.drawText('다운로드 되는지 테스트 용도입니다.', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: customFont,
    color: rgb(0, 0.53, 0.71),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
// import { WorkType } from '@/types/common';

// export default async function ExportPdf(sortId: string, selectedWorks: WorkType[]) {
//   // 새 PDFDocument 생성
//   const pdfDoc = await PDFDocument.create();

//   // Times Roman 폰트 임베드
//   const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

//   // 문서에 빈 페이지 추가
//   const page = pdfDoc.addPage();

//   // 페이지의 너비와 높이 가져오기
//   const { width, height } = page.getSize();

//   // 페이지 상단에 텍스트 그리기
//   const fontSize = 30;
//   page.drawText('ffffff', {
//     x: 50,
//     y: height - 4 * fontSize,
//     size: fontSize,
//     font: helveticaFont,
//     color: rgb(0, 0.53, 0.71),
//   });

//   // PDFDocument를 바이트(Uint8Array)로 직렬화
//   const pdfBytes = await pdfDoc.save();

//   // 브라우저에서 PDF 문서 다운로드 트리거
//   download(pdfBytes, 'pdf-lib_creation_example.pdf', 'application/pdf');
// }

// // download 함수 구현
// const download = (pdfBytes, filename, type) => {
//   const blob = new Blob([pdfBytes], { type });
//   const link = document.createElement('a');
//   link.href = window.URL.createObjectURL(blob);
//   link.download = filename;
//   link.click();
// };
