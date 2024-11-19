// components/AccountForm.tsx
import { useForm } from "react-hook-form";
import Input from "../Input";
import { Button } from "@/components/ui/button";
import LoadingButton from "../LoadingButton";
interface AccountFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export default function CreateUserForm({
  onSubmit,
  isLoading,
}: AccountFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        htmlFor='name'
        type='text'
        placeholder='Your Name ...'
        register={register("name")}
        error={errors.name?.message}
        label={""}
      />
      <Input
        htmlFor='email'
        type='email'
        placeholder='domain@example.com'
        register={register("email")}
        error={errors.email?.message}
      />
      <Input
        htmlFor='password'
        type='password'
        placeholder='Your password ...'
        register={register("password")}
        error={errors.password?.message}
      />
      <Input
        htmlFor='confirmPassword'
        type='password'
        placeholder='Confirm your password ...'
        register={register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
      <div className='my-2'>
        <Button
          type='submit'
          disabled={isLoading}
          className='btn btn-primary w-full'>
          {isLoading ? <LoadingButton /> : "Register"}
        </Button>
      </div>
    </form>
  );
}
