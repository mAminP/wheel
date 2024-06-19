"use client";

import { useState } from "react";
import SpinSendCode from "@/app/(main)/_components/SpinSendCode";
import SpinOTPCode from "@/app/(main)/_components/SpinOTPCode";
type Props = {};
export default function LoginAction(props: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  if (step === 1) {
    return (
      <SpinSendCode
        phoneNumber={phoneNumber}
        onSubmit={(phoneNumber) => {
          setPhoneNumber(phoneNumber);
          setStep(2);
        }}
      />
    );
  }
  if (step === 2 && phoneNumber) {
    return (
      <SpinOTPCode
        onBack={() => {
          setStep(1);
        }}
        phoneNumber={phoneNumber}
      />
    );
  }

  return <></>;
}
