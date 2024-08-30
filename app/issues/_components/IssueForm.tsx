"use client";

import {
    AlertBox,
    Button,
    RHFTextEditor,
    RHFTextField,
} from "@/app/components";
import {issueSchema} from "@/app/issues/validationSchemas";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {IoCheckmarkSharp} from "react-icons/io5";
import {z} from "zod";
import {Issue} from "@prisma/client";

type IssueForm = z.infer<typeof issueSchema>;

const IssueForm = ({issue}: { issue?: Issue | null }) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {control, handleSubmit} = useForm<IssueForm>({
        resolver: zodResolver(issueSchema),
    });

    const onSubmit: SubmitHandler<IssueForm> = async (data) => {
        try {
            setIsLoading(true);
            if (issue)
                await axios.patch(`/api/issues/${issue.id}`,data)
            else
                await axios.post("/api/issues", data);
            router.push("/issues");
            router.refresh()
        } catch (error) {
            setError("an unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-lg">
            {error ? <AlertBox message={error}/> : null}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-2">
                <RHFTextField
                    placeholder="Title"
                    defaultValue={issue?.title}
                    controller={{control, name: "title"}}
                />
                <RHFTextEditor
                    placeholder="Description"
                    defaultValue={issue?.description}
                    controller={{control, name: "description"}}
                />
                <Button
                    disabled={isLoading}
                    isLoading={isLoading}
                    icon={IoCheckmarkSharp}
                >
                    {issue ? "Update Issue":"Submit New Issue"}
                </Button>
            </form>
        </div>
    );
};

export default IssueForm;
