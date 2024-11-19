import TextInput from "./TextInput";
import FileInput from "./FileInput";
import TextareaInput from "./TextareaInput";
import { Button } from "@/components/ui/button";
import LoadingButton from "../LoadingButton";
import { IoMdCheckmark } from "react-icons/io";

interface Props {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setHashtags: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  imageError: string | null;
  titleError: string | null;
  hashtagsError: string | null;
  descriptionError: string | null;
  loading: boolean;
  successMessage: string | null;
  hashtags: string;
}

const CreateBlogForm: React.FC<Props> = ({
  description,
  setDescription,
  title,
  setTitle,
  handleImageChange,
  handleSubmit,
  imageError,
  titleError,
  descriptionError,
  loading,
  successMessage,
  hashtags,
  setHashtags,
  hashtagsError,
}) => {
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  return (
    <form
      onSubmit={handleSubmit}
      encType='multipart/form-data'
      className='md:w-[50vw] sm:w-[70vw] w-[95vw] mx-auto flex flex-col'>
      <FileInput onChange={handleImageChange} error={imageError} />
      <div className='flex md:flex-row flex-col items-center mx-auto md:gap-5 gap-3 w-full'>
        <TextInput
          label='Title'
          value={title}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setTitle(e.target.value)
          }
          placeholder='Enter your Title'
          error={titleError}
        />

        <TextInput
          id='hashtags'
          label='You can add hashtags to your posts for SEO purposes'
          placeholder='Seperate hashtags by comma'
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          error={hashtagsError}
        />
      </div>
      <TextareaInput
        label='Description'
        value={description}
        onChange={handleDescriptionChange}
        placeholder='Enter your description'
        error={descriptionError}
      />

      {successMessage && (
        <p className='text-green-500 text-sm mb-4 flex items-center justify-center border border-green-500 rounded-md py-2 px-3 gap-1'>
          <IoMdCheckmark className='font-semibold text-xl' /> {successMessage}
        </p>
      )}
      <Button
        type='submit'
        className='md:w-[20vw] w-auto'
        disabled={loading}
        variant='outline'>
        {loading ? <LoadingButton /> : "Create "}
      </Button>
    </form>
  );
};

export default CreateBlogForm;
