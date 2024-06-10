import Image from 'next/image';
import React, { useState } from 'react';
import { PreviewImageItemType } from '@/types/common';
import { ERROR_MESSAGE } from '@/utils/constants';

interface FileInputFieldProps {
  previewImages: PreviewImageItemType[];
  setPreviewImages: React.Dispatch<React.SetStateAction<PreviewImageItemType[]>>;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function FileInputField({
  previewImages,
  setPreviewImages,
  setUploading,
  setToastMessage,
}: FileInputFieldProps) {
  const [isActive, setIsActive] = useState(false);

  const handleDragStart = () => setIsActive(true); // 드래그 할때
  const handleDragEnd = () => setIsActive(false); // 드래그 할때
  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault(); // 파일을 드래그하면 새창이 얼리는 것을 방지
  };

  const handleDropOrChange = (event: React.DragEvent<HTMLLabelElement> | React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsActive(false);
    setUploading(true);
    setToastMessage('');

    const files = 'dataTransfer' in event ? event.dataTransfer.files : event.target.files;
    if (!files || files.length === 0) {
      setUploading(false);
      return;
    }

    const newPreviewInfos: PreviewImageItemType[] = [];

    Array.from(files).forEach((file) => {
      const { name, size: byteSize, type } = file;

      const sizeInKB = (byteSize / 1024).toFixed(2) + 'KB';
      const alloewedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (!alloewedImageTypes.includes(type)) {
        setUploading(false);
        setToastMessage(ERROR_MESSAGE.UPLOAD_FILE_FORMAT);
        return;
      }

      if (byteSize > 50 * 1024 * 1024) {
        setUploading(false);
        setToastMessage(ERROR_MESSAGE.UPLOAD_FILE_SIZE);
        return;
      }

      const findDuplicatedImage = previewImages.find((image) => image.name === name);

      // 중복된 파일이 있는지 체크
      if (findDuplicatedImage) {
        setUploading(false);
        setToastMessage(ERROR_MESSAGE.UPLOAD_FILE_DUPLICATION);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const previewUrl = reader.result as string;
        newPreviewInfos.push({
          name,
          image: previewUrl,
          alt: '',
          language: '한국어',
          keywords: [],
          tone: 'informal',
          size: sizeInKB,
          file,
        });

        if (newPreviewInfos.length === files.length) {
          // 이미지 정보를 모두 수집한 후에 state를 업데이트합니다.
          setPreviewImages((prev) => [...prev, ...newPreviewInfos]);
          setUploading(false);
        }
      };
    });
  };

  return (
    <label
      htmlFor="image"
      onDragEnter={handleDragStart}
      onDragLeave={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDropOrChange}
      className={`flex flex-col w-full h-428 items-center justify-center gap-60 border-4 border-dashed rounded-8 z-DEFAULT ${
        isActive ? 'bg-grey/0 border-grey/4' : 'border-#CED3D6'
      }`}>
      <input type="file" id="image" className="hidden" multiple onChange={handleDropOrChange} />
      <div className="flex flex-col items-center gap-48">
        <Image src="/images/upload.svg" alt="이미지 업로드 아이콘" width={46} height={46} />
        <div className="flex flex-col items-center gap-15">
          <p className="font-bold text-grey/7">여기를 클릭해 파일을 불러오거나 Drag & Drop 하세요.</p>
          <span className="text-[#A9ACB4]">JPEF, PNG, GIP, WEBP up to 50MB</span>
        </div>
      </div>
      <div className="flex items-center justify-center w-233 h-70 text-17 text-brand/mainblue-d1 bg-[#F2F6FE] rounded-[0.25rem] border-1 border-brand/mainblue-d1">
        파일 업로드
      </div>
    </label>
  );
}
