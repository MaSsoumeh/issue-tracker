import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const Edit = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button>
        <Pencil2Icon />
        Edit Issue
      </Button>
    </Link>
  );
};

export default Edit;
