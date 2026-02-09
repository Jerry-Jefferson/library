import SignInPic from "@/public/tableBook.jpg";
import { AuthPageContainer } from "@/src/components/client/authPageContainer/AuthPageContainer";
import { SignInForm } from "@/src/components/client/SignInForm/SignInForm";

export default function SignIn() {
  return (
    <AuthPageContainer alt="sign in picture" src={SignInPic}>
      <SignInForm />
    </AuthPageContainer>
  );
}
