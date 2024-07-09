import { Inter } from 'next/font/google';
import ForbiddenButton from './Button';

const inter = Inter({
  weight: ['300', '400', '500', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Page() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="max-w-sm flex flex-col mx-auto items-center gap-4">
        <h2
          style={{
            textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            fontFamily: inter.style.fontFamily,
          }}
          className="text-[#CBFFF9] font-extrabold text-center text-[88px]"
        >
          403
        </h2>
        <p className="text-center leading-[28px]">
          Bạn không có quyền để truy cập vào nội dung này. <br /> Vui lòng thử lại bằng một tài khoản khác hoặc liên hệ
          với chúng tôi để được hỗ trợ
        </p>
        <ForbiddenButton />
      </div>
    </div>
  );
}
