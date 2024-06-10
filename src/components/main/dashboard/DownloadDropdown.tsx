import ModalPdfPreview from '@/components/common/modal/ModalPdfPreview';
import { WorkType } from '@/types/common';
import ExportDatas from '@/utils/ExportDatas';
import { DOWNLOAD_SORT } from '@/utils/constants';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { DashboardContext } from './DashboradContextMain';

interface DonwloadDropdownProps {
  selectedWorks: WorkType[];
  disabled: boolean;
}

export default function DownloadDropdown({ selectedWorks, disabled }: DonwloadDropdownProps) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const { sort } = useContext(DashboardContext);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setShowDropDown((prev) => !prev);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropDown(false);
    }, 150);
  };

  const handleClickExport = (exportForm: string) => {
    toggleDropdown;

    if (exportForm === 'pdf') {
      setShowPdfPreview(true);
    } else {
      ExportDatas(exportForm, selectedWorks);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        onBlur={handleBlur}
        disabled={disabled}
        className={`flex items-center justify-between w-158 h-54 pl-24 pr-12 rounded-4 ${disabled ? 'bg-[#C9D9FB]' : 'bg-brand/mainblue-0'}`}>
        <div className="text-white">다운로드</div>
        <Image
          src={showDropDown ? '/images/arrow-line-s-t-white.svg' : '/images/arrow-line-s-white.svg'}
          alt="분류 드롭 박스 여닫는 버튼"
          width={26}
          height={26}
        />
      </button>
      {showDropDown && (
        <div className="absolute top-56 -right-0.5 flex flex-col w-158 bg-white rounded-4 border-1 border-grey/4 z-dropdown">
          {DOWNLOAD_SORT.map((sort) => (
            <div
              key={sort.id}
              onClick={() => handleClickExport(sort.id)}
              className="flex items-center w-full pl-24 h-50 text-grey/7 hover:bg-slate-100">
              {sort.name}
            </div>
          ))}
        </div>
      )}
      {showPdfPreview && (
        <ModalPdfPreview sortId={sort.id} selectedWorks={selectedWorks} onClose={() => setShowPdfPreview(false)} />
      )}
    </div>
  );
}

//

// import { WorkType } from '@/types/common';
// import ExportDatas from '@/utils/ExportDatas';
// import { DOWNLOAD_SORT } from '@/utils/constants';
// import Image from 'next/image';
// import { useContext, useRef, useState } from 'react';
// import { DashboardContext } from './DashboradContextMain';
// import ExportPdf from '@/utils/ExportPdf';
// import { getResultDetailTitle } from '@/utils/getResultDetailTitle';
// import generatePDF from 'react-to-pdf';

// interface DonwloadDropdownProps {
//   selectedWorks: WorkType[];
//   disabled: boolean;
// }

// export default function DownloadDropdown({ selectedWorks, disabled }: DonwloadDropdownProps) {
//   const [showDropDown, setShowDropDown] = useState(false);

//   const pdfRef = useRef<HTMLDivElement>(null);

//   const { sort } = useContext(DashboardContext);

//   const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.stopPropagation();
//     event.preventDefault();
//     setShowDropDown((prev) => !prev);
//   };

//   const handleBlur = () => {
//     setTimeout(() => {
//       setShowDropDown(false);
//     }, 150);
//   };

//   const handleClickExport = (exportForm: string) => {
//     toggleDropdown;
//     if (exportForm === 'pdf') {
//       const pdfTitle = getResultDetailTitle(sort.id, true, false);

//       generatePDF(pdfRef, { filename: pdfTitle?.title });
//       // ExportPdf(sort.id, selectedWorks);
//     } else {
//       ExportDatas(exportForm, selectedWorks);
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={toggleDropdown}
//         onBlur={handleBlur}
//         disabled={disabled}
//         className={`flex items-center justify-between w-158 h-54 pl-24 pr-12 rounded-4 ${disabled ? 'bg-[#C9D9FB]' : 'bg-brand/mainblue-0'}`}>
//         <div className="text-white">다운로드</div>
//         <Image
//           src={showDropDown ? '/images/arrow-line-s-t-white.svg' : '/images/arrow-line-s-white.svg'}
//           alt="분류 드롭 박스 여닫는 버튼"
//           width={26}
//           height={26}
//         />
//       </button>
//       {showDropDown && (
//         <div className="absolute top-56 -right-0.5 flex flex-col w-158 bg-white rounded-4 border-1 border-grey/4 z-dropdown">
//           {DOWNLOAD_SORT.map((sort) => (
//             <div
//               key={sort.id}
//               onClick={() => handleClickExport(sort.id)}
//               className="flex items-center w-full pl-24 h-50 text-grey/7 hover:bg-slate-100">
//               {sort.name}
//             </div>
//           ))}
//         </div>
//       )}
//       <div ref={pdfRef} className="-z-50">
//         PDF 테스트
//       </div>
//     </div>
//   );
// }
