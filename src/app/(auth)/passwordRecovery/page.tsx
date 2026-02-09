import PassRecoveryPic from "@/public/Shelf.jpg";
import { AuthPageContainer } from "@/src/components/client/authPageContainer/AuthPageContainer";
import { PasswordRecoveryForm } from "@/src/components/client/passwordRecoveryForm/PasswordRecoveryForm";

export default function PasswordRecovery() {
  return (
    <AuthPageContainer alt="password recovery picture" src={PassRecoveryPic}>
      <PasswordRecoveryForm />
    </AuthPageContainer>
  );
}
