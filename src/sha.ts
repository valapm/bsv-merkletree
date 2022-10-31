import crypto from "crypto";

export function sha256(value: string, encoding: BufferEncoding = "hex") {
  const buf = Buffer.from(value, encoding);
  return crypto.createHash("sha256").update(buf).digest().toString("hex");
}

export function sha256d(value: string, encoding?: BufferEncoding) {
  return sha256(sha256(value, encoding));
}
