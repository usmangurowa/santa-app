import Image from "next/image";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import Button from "@/components/Micro/Button";
import { FaMicrosoft, FaApple } from "react-icons/fa6";
const index = () => {
  const router = useRouter();

  return (
    <main className="bg-[url('/GetStarted.svg')] bg-cover">
      <div className="flex min-h-screen items-center justify-center p-2">
      <div className="flex flex-col justify-center items-center space-y-5 bg-[#293A47] max-w-sm min-h-[480px] rounded-[133px] h-full w-full p-5">
          <div className="flex items-center space-x-5">
            <Image src="/Group 2.svg" alt="paws" width={50} height={50} />
            <h1 className="text-white font-medium text-2xl">Create An Account</h1>
            <Image src="/Group 1.svg" alt="paws" width={50} height={50} />
          </div>

          <Button className="flex items-center justify-center w-full sm:text-xl">
            <span>
              <FcGoogle className="mr-2" />
            </span>
            Continue with Google
          </Button>
          <Button className="flex items-center justify-center w-full sm:text-xl">
            <span>
              <FaMicrosoft className="mr-2" />
            </span>
            Continue with Microsoft
          </Button>
          <Button className="flex items-center justify-center w-full sm:text-xl">
            <span>
              <FaApple className="mr-2 text-gray-200" />
            </span>
            Continue with Apple
          </Button>

          <div className="text-center pt-5 text-white">
            <p>Already have an account?</p>
            <div
              onClick={() => router.push("/login")}
              className="cursor-pointer text-[#58CC02]"
            >
              Login
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default index;
