import Link from "next/link";

interface BlogContentProps {
  description: string; // Description is passed as a prop
}

const Description = ({ description }: BlogContentProps) => {
  return (
    <div className='px-4 lg:px-0 mt-12 mx-auto text-lg leading-relaxed dark:text-gray-400'>
      {/* 
        Split the description by newline characters (`\n`), filter out empty lines, and map over each line.
        Each line will be rendered differently based on its content.
      */}
      {(description || "") // Default to an empty string if description is null or undefined
        .split("\n") // Split the description into an array of lines
        .filter((line) => line.trim() !== "") // Filter out empty lines
        .map((line, index) => {
          // Check if the line starts with "##" (indicating a heading)
          if (line.startsWith("##")) {
            return (
              <p
                key={index}
                className='font-bold text-xl mt-6 mb-3  text-gray-700 dark:text-gray-200'>
                {line.replace("##", "").trim()}{" "}
                {/* Remove "##" and display the rest of the line as a bold heading */}
              </p>
            );
          }

          // Check if the line starts with a number (indicating it might be a numbered list or a heading)
          if (/^\d/.test(line.trim())) {
            return (
              <h2
                key={index}
                className='font-extrabold pt-6 text-gray-700 dark:text-gray-200'>
                {line}{" "}
                {/* Render as a large, bold h2 element for numbered list items or headings */}
              </h2>
            );
          }

          // Check if the line starts with a letter followed by a period (e.g., a., b., c., ...)
          if (/^[a-d]\./i.test(line.trim())) {
            return (
              <p
                key={index}
                className='list-disc text-gray-700 dark:text-gray-200'>
                <span className='font-semibold'>
                  {line.slice(0, 2)} {/* Display the letter and period */}
                </span>
                {line.slice(2).trim()} {/* Display the rest of the line */}
              </p>
            );
          }

          // Regex to detect URLs in the line
          const urlRegex = /(https?:\/\/[^\s]+)/g;

          // If the line contains a URL, split the line at the URLs and make them clickable links
          if (urlRegex.test(line)) {
            return (
              <p key={index} className='pb-6'>
                {line.split(urlRegex).map((part, i) =>
                  urlRegex.test(part) ? ( // Check if the part is a URL
                    <Link
                      key={i}
                      href={part} // Set the URL as the href
                      target='_blank' // Open link in a new tab
                      rel='noopener noreferrer' // Security best practice for opening links in new tabs
                      className='text-blue-500 underline'>
                      {part} {/* Display the URL as a clickable link */}
                    </Link>
                  ) : (
                    <span key={i}>{part}</span> // Display other text normally
                  )
                )}
              </p>
            );
          }

          // For all other lines, render them as normal text paragraphs
          return (
            <p key={index} className='pb-2'>
              {line} {/* Render regular lines as text paragraphs */}
            </p>
          );
        })}
    </div>
  );
};

export default Description;
