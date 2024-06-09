import { WorkType } from '@/types/common';
import { getResultDetailTitle } from '@/utils/getResultDetailTitle';
import { useRef } from 'react';
import ActionButton from '../button/ActionButton';
import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import { createPortal } from 'react-dom';

interface ModalPdfPreviewProps {
  sortId: string;
  selectedWorks: WorkType[];
  onClose: () => void;
}

export default function ModalPdfPreview({ sortId, selectedWorks, onClose }: ModalPdfPreviewProps) {
  const pdfRef = useRef<HTMLDivElement>(null);

  const pdfTitle = getResultDetailTitle(sortId, true, false);

  // const options = {
  //   filename: pdfTitle?.title,
  //   resolution: Resolution.HIGH,
  //   page: {
  //     margin: Margin.NONE,
  //     format: 'A4',
  //     orientation: 'portrait', // landscape 가능
  //   },
  //   canvas: {
  //     mimeType: 'image/jpeg', // 기본값(성능 굿) 추가로 'image/png'도 가능
  //     qualityRatio: 1,
  //   },
  // };

  const handleClick = () => {
    generatePDF(pdfRef, { filename: pdfTitle?.title, canvas: { mimeType: 'image/jpeg' } });
    onClose();
  };

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center h-full w-full bg-overlay z-overlay">
      <div className="flex flex-col gap-16 w-420 h-594 p-24 bg-white overflow-hidden text-16">
        {/* <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl max-w-full overflow-hidden"> */}
        <div ref={pdfRef}>
          <h1 className="text-28">{pdfTitle?.title}</h1>
          <div className="flex flex-col">
            {selectedWorks.map((work) => {
              return (
                <div key={work.id} className="flex">
                  <img src={work.image} alt="work.id" className="w-80 h-80" />
                </div>
              );
            })}
          </div>
        </div>
        <ActionButton text="PDF 다운로드하기" size="w-180 h-50" onClick={handleClick} />
      </div>
    </div>,
    document.body
  );
}
