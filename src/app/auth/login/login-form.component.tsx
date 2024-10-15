import { Form } from "formik";
import { FormikInputField, FormikSubmitButton } from "@/ui";
// import { LoginCreateApiError } from "./form.config";

interface LoginFormProps {
  error?:  any;
}

export function LogInForm({ error }: LoginFormProps) {
  return (
    <Form>
      <div className="flex flex-col gap-1">
        <FormikInputField
          name="email"
          // apiError={error?.validationErrors?.username}
          inputFieldProps={{
            placeholder: "Enter user Email",
            inputClassName: "öutlined-none py-3",
          }}
        />
        <FormikInputField
          name="password"
          // apiError={error?.validationErrors?.password}
          inputFieldProps={{
            placeholder: "Enter password",
            inputClassName: "öutlined-none py-3",
          }}
        />
        <span className="text-right text-xs color-gray cursor-pointer">
          Forget Password?
        </span>

        <div className="w-full mx-auto mt-3">
          <FormikSubmitButton
            className="bg-blue-500 hover:bg-blue-600 transition  delay-100 ease-in-out text-white w-full py-3 rounded-md"
            text="Login"
          />
        </div>
      </div>
    </Form>
  );
}
