import Button from "@/components/Micro/Button";
import React from "react";
import { MdSend } from "react-icons/md";
import { TbChristmasTree } from "react-icons/tb";

import { useAuthState } from "react-firebase-hooks/auth";
import { Logout, auth } from "@/lib/firebase";
import Image from "next/image";
import useChat from "@/lib/hooks/useChat";
import { useRouter } from "next/router";
import Link from "next/link";

const prompts = [
  "Hello Santa! Am I on the Nice List?",
  "SANTA, what is Your Favourite Cookie?",
  "How Do You Deliver Presents to Everyone in One Night?",
  "Can I Meet the Rudolph The Red Nose Reindeer?",
];

const Chat = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogOut = () => {
    Logout();
    router.push("/login");
  };

  const { loading, prompt, send, setPrompt, messages, error } = useChat();

  return (
    <main className="bg-[url('/Welcome.svg')] bg-cover h-screen overflow-hidden">
      <div className="bg-black/50 h-screen w-screen overflow-hidden px-8">
        <div className="flex flex-col h-full overflow-hidden container mx-auto ">
          <nav className="w-full flex items-center justify-between pt-2">
            <div className="cursor-pointer text-6xl text-green-700">
              <Link href={"/"}>
                <Image src="/nav.png" alt="" width={110} height={50} />
              </Link>
            </div>
            <Button className="h-fit w-32" onClick={handleLogOut}>
              Log Out
            </Button>{" "}
          </nav>

          <div
            id="messages"
            className="flex-grow overflow-y-auto w-full flex space-y-2 flex-col mt-3 "
          >
            {messages.map((msg, i) => {
              return (
                <div key={i} className="flex flex-col  text-white">
                  <div className="flex items-center  space-x-2">
                    {msg.role === "user" ? (
                      <>
                        <Image
                          src={user?.photoURL || ""}
                          width={30}
                          height={30}
                          className="rounded-full"
                          alt="Profile"
                        />
                        <span className="font-semibold">
                          {user ? user.displayName : "You"}
                        </span>
                      </>
                    ) : (
                      <>
                        <Image
                          src={"/santa-pic.svg"}
                          width={30}
                          height={30}
                          className="rounded-full -scale-x-100 border border-white"
                          alt="Profile"
                        />
                        <span className="font-semibold">Santa Claus</span>
                      </>
                    )}
                  </div>
                  <div className="pl-10">{(msg.content as string) || ""}</div>
                </div>
              );
            })}

            {loading ? (
              <div className="flex items-center space-x-2 text-white">
                <Image
                  src={"/santa-pic.svg"}
                  width={30}
                  height={30}
                  className="rounded-full -scale-x-100 border border-white"
                  alt="Profile"
                />
                <span className="font-semibold">
                  Santa Claus is replying you...
                </span>
              </div>
            ) : null}
            {error ? (
              <div className="flex items-center space-x-2 text-white w-full flex-col justify-center space-y-2 text-center">
                <p className="font-semibold text-center">An error occurred.</p>
                <Button onClick={() => send()}>Try Again</Button>
              </div>
            ) : null}
          </div>
          {messages.length === 0 ? (
            <div className="sm:block hidden">
              <h1 className="text-white text-3xl font-extrabold py-3">
                Tap on a question to ask Santa
              </h1>

              <div className="grid grid-cols-2 gap-5">
                {prompts.map((p, i) => (
                  <Button onClick={() => send(p)} key={i}>
                    {p}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="pt-5 relative">
            <textarea
              disabled={loading}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="resize-none p-5 w-full rounded-xl border-none outline-none"
              rows={2}
              placeholder={loading ? "Loading..." : "Chat with Santa Claus"}
            ></textarea>
            <Button
              disabled={loading}
              onClick={() => send()}
              className="rounded-full absolute right-5 top-1/2 -translate-y-1/2 w-16"
            >
              <MdSend />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chat;
