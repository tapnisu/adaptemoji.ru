import { APIError, AdaptemojiApi } from "../lib/api";
import { FormEventHandler, useState } from "react";

const adaptemojiApi = new AdaptemojiApi();

export default function Converter() {
  const [file, setFile] = useState<File>();

  const [resize, setResize] = useState(true);
  const [negative, setNegative] = useState(false);

  const [adaptiveEmoji, setAdaptiveEmoji] = useState<Blob | undefined>();

  const [busy, setBusy] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!file) return alert("File not found!");

    setBusy(true);

    adaptemojiApi
      .convert(file, resize, negative)
      .then((res) => {
        if (!res || (res as APIError).status)
          return alert((res as APIError).message);

        setAdaptiveEmoji(res as Blob);
      })
      .catch((err) => alert(err));

    setBusy(false);
  };

  return (
    <article>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Image
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : undefined)
              }
              required
            />
          </label>

          <label>Options</label>

          <label>
            <input
              type="checkbox"
              onChange={() => setResize(!resize)}
              defaultChecked={true}
            />
            Resize
          </label>

          <label>
            <input type="checkbox" onChange={() => setNegative(!negative)} />
            Negative
          </label>
        </fieldset>

        <button type="submit" aria-busy={busy}>
          Convert
        </button>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {adaptiveEmoji != undefined ? (
            <img
              src={URL.createObjectURL(adaptiveEmoji)}
              alt="Adaptive emoji"
            />
          ) : (
            <></>
          )}
        </div>
      </form>
    </article>
  );
}
