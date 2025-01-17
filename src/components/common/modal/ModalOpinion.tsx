import { createPortal } from 'react-dom';
import TextInputField from '../../main/support/TextInputField';
import { useState } from 'react';
import { fetchWithInterceptor } from '@/utils/fetchWithInterceptor';
import { API_ROUTE } from '@/utils/routes';
import ModalConfirm from './ModalConfirm';
import ActionButtonSkyBlue from '../button/ActionButtonSkyBlue';
import ActionButton from '../button/ActionButton';
import Image from 'next/image';
import { ERROR_MESSAGE, OPINION_TEXT_INPUT } from '@/utils/constants';
import OpinionTextarea from '@/components/main/support/OpinionTextarea';
import ModalChoose from './ModalChoose';

interface ModalOpinionProps {
  onClose: () => void;
}

export default function ModalOpinion({ onClose }: ModalOpinionProps) {
  const [value, setValue] = useState({ title: '', writer: '', email: '', content: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

  const actionButtonDisabled = loading || Boolean(value.email.length === 0 || value.content.length === 0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'content' && value.length > 1000) return;

    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    const dataToSend = {
      title: value.title,
      writer: value.writer,
      email: value.email,
      content: value.content,
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    };

    try {
      setLoading(true);

      const response = await fetchWithInterceptor(API_ROUTE.OPINION, options);
      const result = await response.json();

      if (response.ok || response.status === 201) {
        setShowModalConfirm(true);
      } else if (response.status === 400 || result.message === 'email must be an email') {
        setShowModalError(true);
      }
    } catch (error) {
      console.error('고객 의견을 전송하는데 실패했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      onClick={handleClose}
      className="fixed inset-0 flex justify-center items-center h-full w-full bg-overlay z-overlay">
      <div className="relative flex flex-col items-center justify-center p-50 w-600 gap-17 z-modal bg-white shadow-2xl rounded-4">
        <h1 className="text-22 font-bold text-grey/7 mb-20">고객센터 문의하기</h1>
        {OPINION_TEXT_INPUT.map((item) => (
          <div key={item.name} className="flex flex-col gap-17">
            <TextInputField name={item.name} label={item.label} onChange={handleChange} />
            <hr className="w-full border-1 border-grey/2" />
          </div>
        ))}
        <OpinionTextarea
          name="content"
          label="문의사항"
          placeholder="문의사항을 작성해주세요."
          onChange={handleChange}
          maxLength={1000}
          count={value.content.length}
        />
        <hr className="w-full border-1 border-grey/2" />
        <div className="flex gap-30">
          <ActionButtonSkyBlue text="취소" size="w-111 h-42" onClick={onClose} />
          <ActionButton text="전송하기" size="w-111 h-42" onClick={handleSubmit} disabled={actionButtonDisabled} />
        </div>
        <button className="absolute -right-52 top-0 w-48 h-48" onClick={onClose}>
          <Image fill src="/images/modal-close.svg" alt="모달창 닫기 버튼" />
        </button>
      </div>
      {showModalError && (
        <ModalChoose
          title="전송실패"
          description={ERROR_MESSAGE.OPINION_EMAIL_REGEX}
          rightButtonText="확인"
          onClose={() => setShowModalError(false)}
        />
      )}
      {showModalConfirm && (
        <ModalConfirm
          title="안내"
          description="고객센터에 문의가 접수되었습니다."
          buttonText="확인"
          onClose={() => onClose()}
        />
      )}
    </div>,
    document.body
  );
}
