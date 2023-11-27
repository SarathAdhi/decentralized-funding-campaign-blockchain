import { Button, Flex } from "@chakra-ui/react";
import { FileUpload } from "@components/elements/FileUpload";
import { Input } from "@components/elements/Input";
import { TextArea } from "@components/elements/TextArea";
import { PageLayout } from "@layouts/PageLayout";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { Component } from "types/page";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";
import { parseError } from "@utils/parse";
import { contractAddress } from "@utils/constants";
import { Trash } from "@styled-icons/boxicons-solid/Trash";
import withAuth from "@hoc/withAuth";
import { useRouter } from "next/router";

const fileTypes = ["JPG", "PNG", "GIF"];

const initialValues = {
  name: "",
  title: "",
  description: "",
  image: "",
  target: "",
  date: "",
};

const Grid: React.FC<Component> = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-2 md:gap-4">{children}</div>
);

type CampaignProps = {
  name: string;
  title: string;
  description: string;
  target: string;
  date: string;
  image: string;
};

const CreateCampaignPage = () => {
  const [formData, setFormData] = useState<CampaignProps>(initialValues);
  const { push } = useRouter();

  const toast = useToast();

  const { contract } = useContract(contractAddress);
  const { mutateAsync: createCampaign, isLoading } = useContractWrite(
    contract,
    "createCampaign"
  );

  const isFormNotValid = !Object.values(formData).every(
    (value) => value !== ""
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await createCampaign({
        args: [
          formData.name,
          formData.title,
          formData.description,
          formData.image,
          ethers.utils.parseUnits(formData.target, 18),
          new Date(formData.date).getTime(),
        ],
      });

      setFormData(initialValues);
      toast({
        title: "Transaction successful",
        description: "Campaign created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      push("/");
    } catch (err) {
      toast({
        title: "Transaction failed",
        description: parseError(err),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <PageLayout title="">
      <form
        className="p-5 rounded-lg grid gap-4 bg-gray-800"
        onSubmit={handleSubmit}
      >
        <Grid>
          <Input
            label="Your Name"
            name="name"
            placeholder="Sarath Adhithya"
            onChange={({ target }) =>
              setFormData({ ...formData, name: target.value })
            }
            isRequired
          />

          <Input
            label="Campaign Title"
            name="title"
            placeholder="Write a catchy title"
            onChange={({ target }) =>
              setFormData({ ...formData, title: target.value })
            }
            isRequired
          />
        </Grid>

        <TextArea
          label="Campaign Description"
          name="description"
          placeholder="Write a Description"
          onChange={({ target }) =>
            setFormData({ ...formData, description: target.value })
          }
          isRequired
        />

        <Grid>
          <Input
            label="Target Amount"
            name="target"
            type="number"
            min="0"
            max="10"
            placeholder="0.5 (in ETH)"
            onChange={({ target }) =>
              setFormData({ ...formData, target: target.value })
            }
            isRequired
          />

          <Input
            label="End Date"
            type="date"
            name="date"
            onChange={({ target }) =>
              setFormData({ ...formData, date: target.value })
            }
            isRequired
          />
        </Grid>

        <FileUpload
          label="Campaign image"
          name="image"
          types={fileTypes}
          setValue={(value) => setFormData({ ...formData, image: value })}
          isRequired
        />

        <Flex gap={4} mt="5">
          <Button
            type="submit"
            bgColor="green"
            color="white"
            _hover={{ bgColor: "green.600" }}
            _active={{ bgColor: "" }}
            isLoading={isLoading}
            disabled={isFormNotValid}
          >
            Submit
          </Button>

          <Button
            bgColor="red"
            color="white"
            _hover={{ bgColor: "red.600" }}
            _active={{ bgColor: "" }}
            type="reset"
            leftIcon={<Trash className="text-white w-5 h-5" />}
          >
            Clear
          </Button>
        </Flex>
      </form>
    </PageLayout>
  );
};

export default withAuth(CreateCampaignPage);
