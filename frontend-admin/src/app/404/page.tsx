import { Inter } from 'next/font/google';
import NotFoundButton from './Button';

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
          404
        </h2>
        <p className="text-center leading-[28px]">
          URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.
          <br />
          Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì dùng URL đã lưu.
        </p>

        <NotFoundButton />
      </div>
    </div>
  );
}
