"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

const SaveLinkForm = ({ id }: any) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
    url: Yup.string().url("Invalid URL").required("URL is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/saveLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userId: id,
        }),
      });

      const { success, link } = await response.json();

      if (success) {
        console.log("Link saved:", link);
      } else {
        console.error("Error saving link:", link);
      }
    } catch (error) {
      console.error("Error saving link:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/2 px-3 mb-4">
          <label htmlFor="title" className="text-white">
            Name
          </label>
          <Input
            type="text"
            {...register("title")}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.title && (
            <div className="text-red-700">{errors.title.message}</div>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3 mb-4">
          <label htmlFor="description" className="text-white">
            Description
          </label>
          <Input
            type="text"
            {...register("description")}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.description && (
            <div className="text-red-700">{errors.description.message}</div>
          )}
        </div>
        <div className="w-full px-3 mb-4">
          <label htmlFor="url" className="text-white">
            Link URL
          </label>
          <Input
            type="text"
            id="url"
            {...register("url")}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.url && (
            <div className="text-red-700">{errors.url.message}</div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Button type="submit" className="mr-2">
          Save
        </Button>
        <Button onClick={() => reset()}>Reset</Button>
      </div>
    </form>
  );
};

export default SaveLinkForm;
