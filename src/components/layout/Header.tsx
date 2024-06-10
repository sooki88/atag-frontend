'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import ActionButton from '../common/button/ActionButton';
import { HEADER_MENU, PATH } from '@/utils/routes';
import Link from 'next/link';
import ProfileDropDown from './ProfileDropDown';
import { GetUserInfoType } from '@/types/common';
import { API_ROUTE } from '@/utils/routes';

export default function Header() {
  const [user, setUser] = useState<GetUserInfoType | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const loginRequiredPages = [PATH.DASHBOARD, PATH.CREATE_URL, PATH.CREATE_IMAGE, PATH.MYPAGE, PATH.MYPAGE_PAYMENT];
  // 추후 고객센터 공개 사용자 범위 확인 후 수정할 예정

  const getUseInfo = () => {
    const token = localStorage.getItem('token');

    if (!token && loginRequiredPages.includes(pathname)) {
      router.push(PATH.LOGIN);
    } else if (token) {
      fetchUserInfo(token);
    }
  };

  useEffect(() => {
    getUseInfo();
  }, [pathname]);

  useEffect(() => {
    getUseInfo();
  }, []);

  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch(API_ROUTE.GET_USER_INFO, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.result.user as GetUserInfoType);
      } else {
        throw new Error(data.message || '사용자 정보를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error fetching user info:', (error as Error).message);
      setUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push(PATH.LOGIN);
  };

  const handleClick = (path: string) => {
    if (path === PATH.DASHBOARD && pathname === PATH.DASHBOARD) {
      window.location.reload();
    } else {
      router.replace(path);
    }
  };

  const last_menu_num = HEADER_MENU.length - 1;

  return (
    <header className="sticky top-0 right-0 left-0 flex items-center justify-center h-63 z-sticky bg-white shadow-lg">
      <div className="flex justify-between w-full max-w-980 px-20">
        <Link href="/">
          <Image width={100} height={30} src="/images/logo-icon.svg" alt="Logo" />
        </Link>
        <div className="flex items-center">
          <ul className="flex items-center h-28 text-bold text-[#4D4D4D]">
            {HEADER_MENU.map((menu, index) => (
              <li key={index} className="px-16">
                {/* <Link href={menu.path}>{menu.title}</Link> */}
                <div onClick={() => handleClick(menu.path)}>{menu.title}</div>
                {index !== last_menu_num && <span className="h-14 w-1 bg-[#212121]" />}
              </li>
            ))}
          </ul>
          {user ? (
            <ProfileDropDown user={user} handleLogout={handleLogout} />
          ) : (
            <Link href={PATH.LOGIN}>
              <ActionButton text="시작하기" size="w-117 h-35 text-13 font-bold ml-20" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
