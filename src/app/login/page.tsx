'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi'

interface ErrorResponse {
  message: string; 
}

interface User {
  name: string;
  // 필요한 다른 속성들을 추가 가능
}

export default function Login() {

  const[showPwd, setShowPwd] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    clientId: '',
    password: ''
  });
  const [user, setUser] = useState<User | null>(null);

  // 자동 리디렉션 로직
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/dashboard'); // 로그인 상태일 때 대시보드로 리디렉션
    }
  }, [router]);

  const pressShow = (e: MouseEvent) => {
    e.preventDefault();
    setShowPwd(!showPwd)
  }


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('https://gongbang.sigongan-ai.shop/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientId: loginData.clientId,
          password: loginData.password
        })
      });

      const result = await response.json();

      if (!response.ok) {
        const errorInfo: ErrorResponse = result as ErrorResponse;
        throw new Error(errorInfo.message || '로그인에 실패했습니다.' );
      }

      localStorage.setItem('token', result.result.token); // 토큰 저장
      setUser(result.result.user);
      router.replace('/dashboard'); // 성공 시 대시보드로 리디렉션
    } catch (error) {
      const serverError = error instanceof Error ? error.message : "알 수 없는 에러가 발생했습니다."
      console.error('로그인 실패:', serverError);
      setUser(null);
      setErrorMessage(serverError);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-63px)] bg-[#FAFBFC] px-6">
      <div className="w-full h-3/5 max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-15">로그인</h1>
        <h1 className='text-xl text-center text-gray-600 mb-40'>맞춤형 대체텍스트 제작소, 글공방에 오신 것을 환영합니다!</h1>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-10">
            <input className="border rounded-lg w-full py-10 px-15 text-gray-700 focus:outline-none" id="clientId" type= "text" placeholder="ID" value={loginData.clientId} onChange={handleChange} />
          </div>
          <div className="mb-15 mx-auto relative">
            <input className="border rounded-lg w-full py-10 px-15 text-gray-700 focus:outline-none" id="password" type={showPwd ? "text" : 'password'} placeholder="PW" value={loginData.password} onChange={handleChange}/>
            <button onClick = {e=>pressShow(e)} className='absolute bottom-15 right-15 text-gray-700'>
              {showPwd ? <FiEye /> : <FiEyeOff /> }
            </button>
          </div>
          <div className="flex items-center justify-end mb-15">
            <Link className="inline-block align-baseline text-xl text-blue-500 hover:text-blue-800" href="/findID">
              아이디 찾기
            </Link>
            <h1 className="px-20 text-xl text-blue-500">|</h1>
            <a className="inline-block align-baseline text-xl text-blue-500 hover:text-blue-800" href="#">
              비밀번호 찾기
            </a>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white py-8 rounded-lg focus:outline-none" type="submit">
              로그인
            </button>
          <div className="text-center mt-15">
            <a className="inline-block align-baseline text-xl text-blue-500 hover:text-blue-800" href="/signup">
              아직 계정이 없으신가요?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}