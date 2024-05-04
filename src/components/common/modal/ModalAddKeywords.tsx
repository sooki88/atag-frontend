import { PreviewImageItemType } from '@/types/common';
import { ERROR_MESSAGE } from '@/utils/constants';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ModalAddKeywordsProps {
  item?: PreviewImageItemType;
  previewImages: PreviewImageItemType[];
  setPreviewImages: React.Dispatch<React.SetStateAction<PreviewImageItemType[]>>;
  onClose: () => void;
}

export default function ModalAddKeywords({ item, previewImages, setPreviewImages, onClose }: ModalAddKeywordsProps) {
  const [keywordTags, setKeywordTags] = useState<string[]>([]);
  const [errorText, setErrorText] = useState<string>('');

  const over3Keywords = keywordTags.length > 2;

  const handleClickDelete = (tag: string) => {
    const newTags = keywordTags.filter((word) => word !== tag);
    setKeywordTags(newTags);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length > 10) {
      setErrorText(ERROR_MESSAGE.KEYWORDS_LENGTH);
      return;
    }
    setErrorText('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.nativeEvent.isComposing) {
        // 한글 입력시 마지막 글자가 중복되는 현상을 해결해주는 코드
        return;
      }
      const inputKeyword = (event.target as HTMLInputElement).value.trim();
      if (inputKeyword.length > 10) {
        console.error(ERROR_MESSAGE.KEYWORDS_LENGTH);
        return;
      }

      setKeywordTags((prev) => [...prev, inputKeyword]);
      (event.target as HTMLInputElement).value = '';
    }
  };

  const handleClickClose = () => {
    const updatePreviewImages = previewImages.map((previewImage) => {
      if (previewImage.image === (item as PreviewImageItemType).image) {
        return { ...previewImage, keywords: keywordTags };
      } else {
        return previewImage;
      }
    });

    setPreviewImages(updatePreviewImages);

    onClose();
  };

  useEffect(() => {
    const itemKeywords = item?.keywords;
    if (itemKeywords) {
      setKeywordTags([...itemKeywords]);
    }
  }, []);

  return (
    <div className="relatvie flex flex-col w-260  p-20 gap-16 z-modal bg-white shadow-xl rounded-16 border-1 border-grey/3">
      <h2 className="text-12 text-grey/7 text-center">추가할 키워드를 입력하세요.</h2>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <input
            type="text"
            name="keywords"
            placeholder={over3Keywords ? ERROR_MESSAGE.KEYWORDS_COUNT : '키워드를 입력하세요.'}
            className="grow border-1 border-grey/4 rounded-4 h-30 px-12 w-220 focus:border-primary-500 text-12 text-grey/7 placeholder-text-grey/5"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            disabled={over3Keywords}
          />
          {errorText.length > 0 && <p className="text-sub/red-d1 text-11">{errorText}</p>}
        </div>
        <div className="flex gap-8 flex-wrap">
          {keywordTags.length !== 0 &&
            keywordTags.map((tag, index) => (
              <div
                key={index}
                className="inline-flex items-center justify-center gap-6 h-25 px-8 rounded-6 text-12 text-grey/7 bg-grey/3">
                {tag}
                <div onClick={() => handleClickDelete(tag)}>
                  <Image src="/images/Close.svg" width={12} height={12} alt="키워드 태그 삭제" />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="absolute left-260 top-0 w-30 h-30" onClick={handleClickClose}>
        <Image
          src="/images/Close-dark.svg"
          alt="맞춤형 키워드 입력 창 닫기 버튼"
          width={30}
          height={30}
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}