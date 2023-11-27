import { FileUploader } from "react-drag-drop-files";
import { InputProps, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useStorage } from "@thirdweb-dev/react";

type Props = {
  label?: string;
  types: string[];
  setValue: (value: string) => void;
} & InputProps;

export const FileUpload: React.FC<Props> = ({
  label,
  name,
  className,
  types,
  setValue,
  ...rest
}) => {
  const storage = useStorage();

  const [isImageUploading, setIsImageUploading] = useState(false);

  const toast = useToast();

  async function handleChange(file: File) {
    setIsImageUploading(true);

    const data = await storage?.upload(file);
    const fileUrl = data?.split("://")[1];

    const imageLink = `https://ipfs.io/ipfs/${fileUrl}`;

    setValue(imageLink);
    setIsImageUploading(false);
  }

  return (
    <div className="w-full flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-base font-semibold text-gray-300"
        >
          {label} {rest.isRequired && "*"}
        </label>
      )}

      <div className="flex items-center gap-5">
        <FileUploader
          classes="w-full"
          handleChange={handleChange}
          types={types}
          label={rest.value && `Replace ${label}`}
          onSizeError={() =>
            toast({
              title: "Error occured while uploading image",
              description: "File size is too large!",
              status: "error",
              duration: 3000,
              isClosable: true,
            })
          }
          onTypeError={() =>
            toast({
              title: "Error occured while uploading image",
              description: "File type is not supported!",
              status: "error",
              duration: 3000,
              isClosable: true,
            })
          }
        />

        {isImageUploading && (
          <div className="flex items-center gap-2">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="md"
              className="flex-shrink-0"
            />
            <p className="text-white font-semibold">
              Uploading Image to IPFS...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
