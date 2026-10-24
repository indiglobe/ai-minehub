import * as ftp from "basic-ftp";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { tryCatch } from "@repo/utils/try-catch";
import { env } from "@repo/env/server";
import { STATIC_FILE_UPLOAD_DIR } from "@repo/utils/const/static-file-upload-path";

export async function uploadFile(file: File): Promise<string> {
  // ==============================================================
  // THIS IS JUST FOR SIMULATION IN DEV ENV, NEVER USE THIS IN PROD
  // ==============================================================
  if (process.env.NODE_ENV === "development") {
    return `https://via.placeholder.com/640x480.png`;
  }
  // ==============================================================
  // THIS IS JUST FOR SIMULATION IN DEV ENV, NEVER USE THIS IN PROD
  // ==============================================================

  const ext = path.extname(file.name) || ".jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

  const tempPath = path.join(os.tmpdir(), fileName);
  const client = new ftp.Client();

  const [writeFileError] = await tryCatch(
    fs.writeFile(tempPath, Buffer.from(await file.arrayBuffer())),
  );

  if (writeFileError) {
    console.error("Error in writeFileError in uploadFile");
    throw writeFileError;
  }

  const [sharedHostingAccessError] = await tryCatch(
    client.access({
      host: env.FTP_HOST,
      port: env.FTP_PORT,
      user: env.FTP_USER,
      password: env.FTP_PASSWORD,
      secure: false,
    }),
  );

  if (sharedHostingAccessError) {
    console.error("Error in sharedHostingAccessError in uploadFile");
    throw sharedHostingAccessError;
  }

  const [ensureDirError] = await tryCatch(
    client.ensureDir(STATIC_FILE_UPLOAD_DIR),
  );

  if (ensureDirError) {
    console.error("Error in ensureDirError in uploadFile");
    throw ensureDirError;
  }

  const [uploadFromError] = await tryCatch(
    client.uploadFrom(tempPath, `${STATIC_FILE_UPLOAD_DIR}/${fileName}`),
  );

  if (uploadFromError) {
    console.error("Error in uploadFromError in uploadFile");
    throw uploadFromError;
  }

  const [unlinkError] = await tryCatch(fs.unlink(tempPath));

  if (unlinkError) {
    console.error("Error in unlinkError in uploadFile");
    throw unlinkError;
  }

  return `${env.WEB_APP_HOST}${STATIC_FILE_UPLOAD_DIR.split("/public_html/storage")[1]}${fileName}`;
}
