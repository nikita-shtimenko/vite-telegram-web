import LogoTelegram from "@/components/LogoTelegram";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import FormPhone from "./components/FormPhone";

function App() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center pb-6 pt-12 md:pt-10">
      <LogoTelegram widht={174} height={174} />
      <h1 className="mt-8 text-3xl font-normal">Войти в Telegram</h1>
      <h2 className="mt-2 text-balance text-center font-light opacity-50">
        Пожалуйста, подтвердите код страны и введите свой номер телефона.
      </h2>
      <FormPhone className="mt-6 md:mt-12" />
    </MaxWidthWrapper>
  );
}

export default App;
