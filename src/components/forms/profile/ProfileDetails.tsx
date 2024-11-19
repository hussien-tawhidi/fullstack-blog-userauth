import React from "react";

interface ProfileDetailsProps {
  name: string;
  age: number;
  email: string;
  role: string;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  name,
  age,
  email,
  role,
}) => {
  return (
    <div className='mt-20 text-center border-b pb-12'>
      <h1 className='text-4xl font-medium text-gray-700 dark:text-gray-300'>
        {name}{" "}
        <span className='font-light text-gray-500 dark:text-gray-300'>
          {age}
        </span>
      </h1>
      <p className='font-light text-gray-600 dark:text-gray-300 mt-3'>
        {email}
      </p>
      <p className='mt-8 text-gray-500 dark:text-gray-300'>
        Post as <span>{role}</span>
      </p>
      <p className='mt-2 text-gray-600 dark:text-gray-300'>
        University of Computer Science
      </p>
      <p className='text-gray-600 text-center font-light lg:px-16 dark:text-gray-300'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam a
        repellat ullam facilis perspiciatis eos autem quibusdam voluptas quod
        fugiat, odio voluptatem laborum. Tempore unde enim doloremque nihil
        quasi corrupti distinctio rem. Fugit, accusantium? Corporis ad
        consectetur laborum necessitatibus quae, suscipit at, non ducimus illum
        ab nisi. Laudantium praesentium mollitia maiores itaque molestias beatae
        fugiat, dolore voluptate veritatis ratione tempore, quaerat corrupti
        nulla in natus officia eveniet porro ad non asperiores! Unde nostrum
        eligendi, quibusdam animi reprehenderit nihil at impedit facilis.
        Recusandae dolorem modi nihil illum temporibus numquam, iste expedita
        repellendus eveniet voluptatum aperiam! Aliquam alias nihil laborum
        iusto voluptatem?
      </p>{" "}
    </div>
  );
};

export default ProfileDetails;
