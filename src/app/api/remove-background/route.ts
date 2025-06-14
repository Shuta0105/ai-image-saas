import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";
import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadForm = new FormData();
    uploadForm.append("image", buffer, file.name); // ここが重要！
    uploadForm.append("output_format", "png");

    const response = await axios.postForm(
      `https://api.stability.ai/v2beta/stable-image/edit/remove-background`,
      uploadForm,
      {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "image/*",
        },
      }
    );

    if (response.status === 200) {
      const optimizedImage = await sharp(response.data)
        .resize(1280, 720) // 幅1280px、高さ720pxにリサイズ
        .png({ quality: 80, compressionLevel: 9 }) // PNG形式に変換、品質80%、圧縮レベル9（最大圧縮）
        .toBuffer(); // バッファとして出力

      const base64 = optimizedImage.toString("base64");
      return NextResponse.json({
        image: `data:image/png;base64,${base64}`,
      });
    } else {
      throw new Error(`${response.status}: ${response.data.toString()}`);
    }
  } catch (error) {
    console.log(error);
  }
}
