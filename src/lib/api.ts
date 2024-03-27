export interface APIError {
  status: number;
  message: string;
}

export class AdaptemojiApi {
  baseUrl: string;

  constructor(baseUrl = "https://api.adaptemoji.ru/v1") {
    this.baseUrl = baseUrl;
  }

  async convert(
    file: File,
    resize = true,
    negative = false
  ): Promise<Blob | APIError> {
    const formData = new FormData();
    formData.append("blob", file, "img");

    const path = `${this.baseUrl}/convert?resize=${resize}&negative=${negative}`;

    const res = await fetch(path, {
      method: "POST",
      body: formData,
    });

    if (!res.ok)
      return {
        status: res.status,
        message: await res.text(),
      };

    return await res.blob();
  }
}
