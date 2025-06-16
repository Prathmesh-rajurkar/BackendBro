import { BackgroundLines } from "@/components/ui/background-lines";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
     <BackgroundLines className="flex  items-center justify-center w-full flex-col px-4">
    <div className="flex justify-center items-center flex-col gap-4">
      <div>
        <h1
          style={{ fontFamily: "var(--font-belanosima)" }}
          className="text-6xl  mb-6 text-center bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent"
        >
          backendbro
        </h1>
      </div>
      <div>
        <SignUp
          appearance={{
            baseTheme: dark,
            elements: {
              card: {
                backdropFilter: "blur(5px) saturate(180%)",
                WebkitBackdropFilter: "blur(5px) saturate(180%)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }
            },
          }}
        />
      </div>
    </div>
  </BackgroundLines>
  );
}
