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

  const handleClick = () => {
    generatePDF(pdfRef, { filename: pdfTitle?.title, canvas: { mimeType: 'image/jpeg' } });
    onClose();
  };

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center h-full w-full bg-overlay z-overlay">
      <div className="flex flex-col gap-16 w-420 h-594 p-24 bg-white overflow-hidden text-16">
        <div ref={pdfRef}>
          <h1 className="text-28">{pdfTitle?.title}</h1>
          <div className="flex flex-col">
            {selectedWorks.map((work) => {
              return (
                <div key={work.id} className="flex">
                  <img src={work.image} alt="work.id" className="w-80 h-80" />
                  {/* 이미지가 modal에서는 보이는데 다운로드한 pdf파일에서는 안보이는 에러 */}
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
