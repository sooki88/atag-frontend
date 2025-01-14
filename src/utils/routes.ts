import { GetPostRequestParamType, GetSupportFaqParamType } from '@/types/common';

export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FIND_CLIENT: '/find/client-id',
  FIND_PWD: '/find/password',
  CHANGE_FIND_PWD: 'change/findPassword',
  DASHBOARD: '/dashboard',
  CREATE_URL: '/create/url',
  CREATE_IMAGE: '/create/image',
  SUPPORT_NOTICE: '/support/notice',
  SUPPORT_FAQ: '/support/faq',
  MYPAGE: '/mypage',
  MYPAGE_PAYMENT: '/mypage/payment',
  PLANS: '/plans',
  POLICY_PRIVACY: '/policy/privacy',
  POLICY_SERVICE: '/policy/service',
};

export const HEADER_MENU = [
  {
    title: '워크스페이스',
    option: [
      { title: '대체텍스트 생성', path: PATH.CREATE_URL },
      { title: '대시보드', path: PATH.DASHBOARD },
    ],
  },
  { title: '요금제', option: PATH.PLANS },
  {
    title: '고객센터',
    option: [
      { title: '공지사항', path: PATH.SUPPORT_NOTICE },
      { title: 'FAQ', path: PATH.SUPPORT_FAQ },
    ],
  },
];

export const API_ROUTE = {
  UPLOAD: `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`,
  SCRAP_IMAGES: (url: string) => `${process.env.NEXT_PUBLIC_API_BASE_URL}/scrap/images?url=${url}`,
  POST: `${process.env.NEXT_PUBLIC_API_BASE_URL}/post`,
  GET_POST: ({ target, search, limit, page }: GetPostRequestParamType) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/post?target=${target}&search=${search}&limit=${limit}&page=${page}`,
  GET_POST_DETAIL: (postId: string) => `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/detail/${postId}`,
  INSPECT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/inspect`,
  GET_INSPECT: ({ search, limit, page }: GetPostRequestParamType) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/inspect?search=${search}&limit=${limit}&page=${page}`,
  GET_INSPECT_DETAIL: (inspectId: string) => `${process.env.NEXT_PUBLIC_API_BASE_URL}/inspect/detail/${inspectId}`,
  LOGIN: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/signin`,
  SIGN_UP: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/signup`,
  GET_CLIENT_ID: (clientId: string) => `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/check/client-id/${clientId}`,
  GET_EMAIL: (email: string) => `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/check/email/${email}`,
  GET_USER_INFO: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/info`,
  FIND_ID: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/find/client-id`,
  FIND_PWD: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/find/password`,
  CHANGE_PWD: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/change/password`,
  CHANGE_INFO: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/change/info`,
  DELETE_IMG: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/img`,
  GET_SUPPORT_FAQ: ({ type, limit, page }: GetSupportFaqParamType) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/support/faq?type=${type}&limit=${limit}&page=${page}`,
  GET_SUPPORT_NOTICE: ({ limit, page }: GetSupportFaqParamType) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/support/notice?limit=${limit}&page=${page}}`,
  OPINION: `${process.env.NEXT_PUBLIC_API_BASE_URL}/opinion`,
  GET_PAYMENT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment`,
  GET_PAYMENT_DETAIL: (paymentId: string) => `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/detail/${paymentId}`,
};
