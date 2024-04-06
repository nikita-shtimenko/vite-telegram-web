import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { usePhoneNumberStore } from "@/lib/store/phoneNumber";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import parsePhoneNumber from "libphonenumber-js";
import FormConfirmation from "@/components/FormConfirmation";

const KPage = () => {
  const navigate = useNavigate();
  const { value } = usePhoneNumberStore();
  const phoneNumber = parsePhoneNumber(value);

  useEffect(() => {
    if (value === "") {
      navigate("/");
    }
  });

  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center pt-20">
      <span className="text-9xl">🐵</span>
      <h1 className="mt-8 text-3xl font-semibold">
        {phoneNumber?.formatInternational()}
      </h1>
      <h2 className="mt-2 text-balance text-center font-light opacity-50">
        Мы отправили вам сообщение в Telegram с кодом.
      </h2>
      <FormConfirmation className="mt-6 md:mt-12" />
    </MaxWidthWrapper>
  );
};
export default KPage;
