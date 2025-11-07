import { CloseIcon, DateUtils, InlineIconButton, Table, ViewIcon } from "@povio/ui";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import z from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
});
type Post = z.infer<typeof postSchema>;

const posts: Post[] = [
  {
    id: "1",
    title: "Post 1",
    content: "Content 1",
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Post 2",
    content: "Content 2",
    createdAt: "2021-01-02T00:00:00.000Z",
    updatedAt: "2021-01-02T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Post 3",
    content: "Content 3",
    createdAt: "2021-01-03T00:00:00.000Z",
    updatedAt: "2021-01-03T00:00:00.000Z",
  },
];

const columnDefinitions: ColumnDef<Post>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Content",
    accessorKey: "content",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => DateUtils.formatDate(new Date(row.original.createdAt), "dd/MM/yyyy HH:mm"),
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
    cell: ({ row }) => DateUtils.formatDate(new Date(row.original.updatedAt), "dd/MM/yyyy HH:mm"),
  },
  {
    header: "Actions",
    cell: ({ row }) => <TableActions post={row.original} />,
  },
];

function TableActions({ post }: { post: Post }) {
  const handleDelete = () => {
    console.log("Delete", post.id);
  };

  const handleView = () => {
    console.log("View", post.id);
  };

  return (
    <div className="flex items-center gap-2">
      <InlineIconButton
        label="Delete"
        icon={CloseIcon}
        color="error"
        onPress={handleDelete}
      />
      <InlineIconButton
        label="View"
        icon={ViewIcon}
        color="primary"
        onPress={handleView}
      />
    </div>
  );
}

function TableExamplesPage() {
  return (
    <div className="flex flex-col gap-4 p-20">
      <Table
        items={posts}
        columns={columnDefinitions}
      />
    </div>
  );
}

export const Route = createFileRoute("/code-examples/table")({
  component: TableExamplesPage,
});
