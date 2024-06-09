'use client';

import PostIdTable from '@/components/main/dashboard/PostIdTable';
import PostIdTitle from '@/components/main/dashboard/PostIdTitle';
import RequestExpertForm from '@/components/main/dashboard/RequestExpertForm';
import { PostType, WorkType } from '@/types/common';
import { fetchWithInterceptor } from '@/utils/fetchWithInterceptor';
import { API_ROUTE } from '@/utils/routes';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostId() {
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<PostType>();
  const [selectedWorks, setSelectedWorks] = useState<WorkType[]>([]);
  const [requestExpertPage, setRequestExpertPage] = useState(false); // ai 대체텍스트 생성 결과 확인에서 '검수요청'시 보여지는 '해설진 검수 세부 요청서'페이지

  const pathname = usePathname();
  const parts = pathname.split('/');
  const postId = parts[2];

  const { isComplete, target, works, detail } = post ? post : { isComplete: false, target: '', works: [], detail: '' };
  const selectedTotal = selectedWorks.length;

  const getPosts = async () => {
    setLoading(true);

    const options = { method: 'GET' };

    try {
      const response = await fetchWithInterceptor(API_ROUTE.GET_POST_DETAIL(postId), options);
      const result = await response.json();

      setPost(result.result.post);
    } catch (error) {
      console.error('생성 결과를 가져오는데 실패했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex flex-col w-1092 min-h-800 pt-40 pb-40 gap-60 bg-white">
      <PostIdTitle
        target={target}
        isComplete={isComplete}
        requestExpertPage={requestExpertPage}
        setRequestExpertPage={setRequestExpertPage}
        selectedTotal={selectedTotal}
        selectedWorks={selectedWorks}
      />
      {requestExpertPage ? (
        <RequestExpertForm selectedWorks={selectedWorks} setRequestExpertPage={setRequestExpertPage} />
      ) : (
        <div className="flex flex-col gap-23">
          <PostIdTable
            works={works}
            selectable={target === 'ai' ? true : false}
            selectedWorks={selectedWorks}
            setSelectedWorks={setSelectedWorks}
            showTableNum={target === 'ai' || isComplete ? 10 : 5}
          />
          {target === 'ai' ? <span className="text-grey/7">Selected : {selectedTotal}</span> : ''}
          {!isComplete && (
            <div className="flex flex-col gap-6 px-40 text-grey/6">
              <h3>작성 요청 내용</h3>
              <textarea
                value={detail}
                className="w-full h-146 px-24 py-17 border-1 border-grey/4 rounded-4 text-grey/6 resize-none focus:outline-none"
                readOnly
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
