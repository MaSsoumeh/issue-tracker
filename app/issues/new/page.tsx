"use client";

import AlertBox from "@/app/components/AlertBox";
import Button from "@/app/components/Button";
import RHFTextEditor from "@/app/components/RHFTextEditor";
import RHFTextField from "@/app/components/RHFTextField";
import { postIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoCheckmarkSharp } from "react-icons/io5";
import { z } from "zod";

type IssueForm = z.infer<typeof postIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<IssueForm>({
    resolver: zodResolver(postIssueSchema),
  });

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("an unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      {error ? <AlertBox message={error} /> : null}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-2">
        <RHFTextField
          placeholder="Title"
          controller={{ control, name: "title" }}
        />
        <RHFTextEditor
          placeholder="Description"
          controller={{ control, name: "description" }}
        />
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          icon={IoCheckmarkSharp}
        >
          Submit Issue
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
