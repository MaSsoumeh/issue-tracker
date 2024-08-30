import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import { Link, Table } from "../components";
import { statusColor } from "../utils";
import IssueStatus from "./_components/IssueStatus";
import IssueActions from "./new/IssueActions";

const IssuePage = async () => {
  const issues = await prisma?.issue.findMany();

  return (
    <div>
      <IssueActions />

      <Table
        columns={[
          {
            field: "title",
            headerName: "Issue",
            renderCell: ({ row }) => (
              <div className="flex-column space-y-2">
                <Link href={`issues/${row.id}`}>{row.title}</Link>
                <div className="block lg:hidden">
                  <IssueStatus status={row?.status} />
                </div>
              </div>
            ),
          },
          {
            field: "status",
            headerName: "Status",
            renderCell: ({ row }) => (
              <Badge color={statusColor[row?.status as Status]}>
                {row?.status}
              </Badge>
            ),
          },
          {
            field: "createdAt",
            headerName: "Created",
            renderCell: ({ row }) => row.createdAt.toDateString(),
          },
        ]}
        rows={issues}
      />
    </div>
  );
};

export default IssuePage;
export const dynamic = "force-dynamic";
// export const revalidate = 0;