import { PATH } from './routes';

export const CREATE_TABS = [
  { title: 'URL 입력', id: 'url' },
  { title: '이미지 업로드', id: 'image' },
];

export const CREAT_IMAGE_SECTION = [
  {
    title: '웹사이트 URL로 대체텍스트 생성하기',
    description: [
      '대체텍스트 생성을 원하는 웹사이트의 URL주소를 입력한 후,',
      '대체텍스트 생성이 필요한 이미지를 선택해주세요.',
    ],
  },
  {
    title: '이미지 파일로 대체텍스트 생성하기',
    description: [
      '대체텍스트 생성을 원하는 이미지 파일을 업로드 하세요.',
      '권장 이미지 해상도는 가로 + 세로 영역 5000px 이하 입니다.',
    ],
  },
];

export const URL_TABLE_HEADER = [
  { text: 'URL 주소', value: 'urlAddress' },
  { image: '/images/mingcute_close-fill.svg', value: 'delete' },
];

export const IMAGE_TABLE_HEADER = [
  { text: '이미지', value: 'image' },
  { text: '기존 대체 텍스트', value: 'alt' },
  { text: '문체 선택', value: 'tone' },
  { text: '맞춤형 키워드', value: 'keyword' },
];

export const URL_PREVIEW_TABLE_HEADER = [
  { text: '이미지', value: 'thumbnail' },
  { text: '기존 대체 텍스트', value: 'thumbnail' },
  { text: '언어 선택', value: 'thumbnail' },
  { text: '맞춤형 키워드', value: 'thumbnail' },
];

export const TONE = [
  { text: 'informal(~사진)', value: 'informal' },
  { text: 'honorific(~사진입니다)', value: 'honorific' },
  { text: 'polite(~사진이에요)', value: 'polite' },
  { text: 'plain(~사진이다)', value: 'plain' },
];

export const TABLE_BODY_NUMBER = {
  URL_LIST: 5,
  URL_IMAGE_LIST: 5,
};

export const WorkItemFormFormat = {
  image: '',
  language: 'Korean',
  keywords: [],
};

export const ExpertRequestFormFormat = {
  title: '해설진 생성 요청',
  target: 'comment',
  works: [
    {
      image: '',
      language: 'Korean',
      keywords: [],
    },
  ],
  detail: '',
};

export const AiRequestFormFormat = {
  title: 'ai 생성 요청',
  target: 'ai',
  works: [
    {
      image: '',
      language: 'Korean',
      keywords: [],
    },
  ],
};

export const OpinionFormFormat = {
  clientId: '',
  email: '',
  content: '',
  files: [],
};

export const ERROR_MESSAGE = {
  KEYWORDS_LENGTH: '10자 이내로 입력해 주세요.',
  KEYWORDS_COUNT: '키워드는 3개까지 입력할 수 있어요.',
  OPINION_EMAIL_REGEX: '이메일을 제대로 입력했는지 확인해주세요.',
  UPLOAD_FILE_SIZE: '파일 크기가 50MB를 초과합니다.',
  UPLOAD_FILE_FORMAT: '파일 형식은  JPEF, PNG, GIF, WEBP만 가능합니다.',
  UPLOAD_FILE_DUPLICATION: '이미 업로드된 중복 파일입니다.',
};

export const DASHBOARD_SORT = [
  { id: 'ai', name: 'AI 생성' },
  { id: 'inspect', name: '해설진 검수' },
  { id: 'comment', name: '해설진 작성' },
];

export const ISPECT_SORT = [
  { id: 'ai', name: 'AI 생성' },
  { id: 'inspect', name: '해설진 검수' },
];

export const DOWNLOAD_SORT = [
  { id: 'csv', name: 'CSV' },
  { id: 'json', name: 'JSON' },
  { id: 'txt', name: 'TXT' },
];

export const DASHBOARD_LIMIT = '10';

export const SUPPORT_TAB = [
  { id: 'notice', text: '공지사항' },
  { id: 'faq', text: 'FAQ' },
];

export const FAQ_TAB = [
  { id: 'all', text: '전체' },
  { id: 'service', text: '서비스 설명' },
  { id: 'usage', text: '홈페이지 사용방법' },
  { id: 'payment', text: '결제 및 요금제' },
  { id: 'etc', text: '기타' },
];

export const FAQ_HEADER = [
  { text: '질문', value: 'title' },
  { text: '답변', value: 'content' },
];

export const NOTICE_HEADER = [
  { text: '작성일', value: 'createdAt' },
  { text: '제목', value: 'title' },
];

export const PAYMENT_HEADER = [
  { text: '번호', value: 'index' },
  { text: '요금제 종류', value: 'rate' },
  { text: '결제일', value: 'createdAt' },
  { text: '결제금액', value: 'amount' },
  { text: '결제방법', value: 'method' },
];

export const PLANS_INFO = [
  { title: 'BASIC', credits: '100 credits', rate: '₩ 3,990원', period: '/ 1달', recommend: false },
  { title: 'STANDARD', credits: '300 credits', rate: '₩ 9,900원', period: '/ 1달', recommend: true },
  { title: 'PREMIUM', credits: '500 credits', rate: '₩ 14,990원', period: '/ 1달', recommend: false },
  { title: '개별 Credit 구매하기', credits: '20 credits', rate: '₩ 990원', period: '', recommend: false },
];

export const MYPAGE_SIDEMENU = [
  { url: PATH.MYPAGE, text: '개인정보 수정' },
  { url: PATH.MYPAGE_PAYMENT, text: '결제 정보' },
];

export const TEMP_PLANS_INFO = [
  {
    credits: '100 credits',
    rate: '₩ 3,990원',
    amount: 3990,
    recommend: false,
    title: '',
    period: '',
  },

  {
    credits: '300 credits',
    rate: '₩ 9,990원',
    amount: 9990,
    recommend: true,
    title: '',
    period: '',
  },

  {
    credits: '500 credits',
    rate: '₩ 14,990원',
    amount: 14990,
    recommend: false,
    title: '',
    period: '',
  },
];

export const OPINION_TEXT_INPUT = [
  { label: '제목', name: 'title' },
  { label: '작성자', name: 'writer' },
  { label: '이메일', name: 'email' },
];

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
