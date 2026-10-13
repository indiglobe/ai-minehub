import { uploadFile } from "@/utils/upload/file";
import { tryCatch } from "@repo/utils/try-catch";
import { createFileRoute } from "@tanstack/react-router";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const Route = createFileRoute("/api/upload/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const [formDataError, formData] = await tryCatch(request.formData());

        if (formDataError) {
          return Response.json(
            { message: "Invalid multipart form data." },
            { status: 400 },
          );
        }

        const file = formData.get("file");

        if (!(file instanceof File)) {
          return Response.json(
            { message: "Payment proof file is required." },
            { status: 400 },
          );
        }

        if (!file.type.startsWith("image/")) {
          return Response.json(
            { message: "Only image files are allowed." },
            { status: 400 },
          );
        }

        if (file.size === 0 || file.size > MAX_FILE_SIZE) {
          return Response.json(
            {
              message:
                "Image must be greater than 0 bytes and no larger than 5 MB.",
            },
            { status: 400 },
          );
        }

        const [uploadError, publicURL] = await tryCatch(uploadFile(file));

        if (uploadError) {
          console.error("Payment proof upload failed:", uploadError);

          return Response.json(
            { message: "Failed to upload payment proof." },
            { status: 500 },
          );
        }

        return Response.json({ publicURL }, { status: 200 });
      },
    },
  },
});
