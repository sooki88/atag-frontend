import ActionButtonGray from '@/components/common/button/ActionButtonGray';
import SectionLayout from './SectionLayout';
import React, { useState } from 'react';
import ActionButton from '@/components/common/button/ActionButton';
import { PreviewImageItemType } from '@/types/common';
import { ExportRequestFormFormat } from '@/utils/constants';
import { fetchWithInterceptor } from '@/utils/fetchWithInterceptor';
import { API_ROUTE } from '@/utils/routes';

interface RequestForExpertProps {
  selectedImages: PreviewImageItemType[] | [];
  setProgressStage: React.Dispatch<React.SetStateAction<string>>;
}

export default function RequestForExpert({ selectedImages, setProgressStage }: RequestForExpertProps) {
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleClickRequest = async () => {
    const selectedImagesWorks = selectedImages.map((selectedImage) => {
      return {
        image: selectedImage.image,
        language: 'Korean',
        keywords: selectedImage.keywords,
      };
    });
    setLoading(true);

    const ExportRequestForm = { ...ExportRequestFormFormat, works: selectedImagesWorks, detail: value };
    const options = {
      method: 'POST',
      body: JSON.stringify(ExportRequestForm),
    };

    try {
      const response = await fetchWithInterceptor(API_ROUTE.POST, options);
      const result = await response.json();
    } catch (error) {
      alert('에러');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStage = () => {
    setProgressStage('one');
  };

  return (
    <div className="flex flex-col gap-40 w-full p-40">
      <ActionButtonGray text="뒤로가기" size="w-144 h-54" type="back" onClick={handleChangeStage} />
      <SectionLayout title="해설진 작성 세부 요청서">
        <textarea
          placeholder="작성에 참고할 구체적인 지점들, 혹은 원하시는 방향성이 있으시다면 자유롭게 작성해주세요."
          className="w-full h-338 px-24 py-17 border-1  border-grey/4 rounded-4 text-grey/7 focus:border-primary-500 resize-none focus:outline-none mb-20"
          onChange={handleChangeTextarea}
        />
        <ActionButton text="확인" size="w-full h-54" onClick={handleClickRequest} />
      </SectionLayout>
    </div>
  );
}
