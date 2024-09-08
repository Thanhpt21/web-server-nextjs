import Link from "next/link";

interface IProps {
    config: any; 
}
  

const TopHeader = ({config}: IProps) => {
    return (
      <div className="w-full h-[30px] bg-black hidden md:block container mx-auto px-4 md:px-8 lg:px-16">
        <div className="h-full container  flex justify-between items-center">
          <div className="text-white text-[14px]">
           {config?.data?.data[0]?.name} Kính chào quý khách
          </div>
          <div className="flex gap-2">
            <Link
              href={"/about"}
              className="text-white text-[12px] hover:text-main"
            >
              Về chúng tôi
            </Link>
            <Link
             href={"/news"}
              className="text-white text-[12px] hover:text-main"
            >
              Tin tức
            </Link>
            <Link
             href={"/contact"}
              className="text-white text-[12px] hover:text-main"
            >
              Liên hệ
            </Link>
            
            <Link
             href={`/auth/login`}
              className="text-white text-[12px] hover:text-main"
            >
              Đăng nhập / Đăng ký
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default TopHeader;