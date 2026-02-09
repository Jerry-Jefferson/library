import SignUpPic from "@/public/greeneryBook.jpg";
import { AuthPageContainer } from "@/src/components/client/authPageContainer/AuthPageContainer";
import { SignUpForm } from "@/src/components/client/signUpForm/SignUpForm";

export default function SignUp() {
  return (
    <AuthPageContainer alt="sign up picture" src={SignUpPic}>
      <SignUpForm />
    </AuthPageContainer>
  );
}
