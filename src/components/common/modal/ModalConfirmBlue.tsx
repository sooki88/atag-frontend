import Image from 'next/image';
import { createPortal } from 'react-dom';
import ActionButton from '../button/ActionButton';

interface ModalConfirm {
  title: string;
  description?: string;
  style?: string; // width, height 등
  buttonText?: string;
  onClose?: () => void;
}

export default function ModalConfirm({ title, description, style, buttonText, onClose }: ModalConfirm) {
  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center h-full w-full bg-overlay z-overlay">
      <div
        className={`flex flex-col items-center pt-70 pb-60 gap-40 z-modal bg-white shadow-2xl rounded-4 ${
          style ? style : 'w-700'
        }`}>
        <Image src="/images/icon-check.svg" alt="체크 아이콘" width={100} height={100} />
        <div className="flex flex-col gap-14 text-grey/7 text-center">
          <h2 className="text-27 font-bold text-center">{title}</h2>
          {description}
        </div>
        <ActionButton text={buttonText ? buttonText : '확인'} size="w-275 h-70 text-17" />
      </div>
    </div>,
    document.body
  );
}
