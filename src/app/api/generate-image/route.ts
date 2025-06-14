import axios from "axios";
import FormData from "form-data";
import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request) {
  const { keyword } = await req.json();
  const payload = {
    prompt: `Create Image With ${keyword}`,
    output_format: "png",
  };

  const response = await axios.postForm(
    `https://api.stability.ai/v2beta/stable-image/generate/core`,
    axios.toFormData(payload, new FormData()),
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
}
