import { APIError, AdaptemojiApi } from "../lib/api";
import { FormEventHandler, useState } from "react";

const adaptemojiApi = new AdaptemojiApi();

export default function Converter() {
  const [file, setFile] = useState<File>();

  const [resize, setResize] = useState(true);
  const [negative, setNegative] = useState(false);

  const [adaptiveEmoji, setAdaptiveEmoji] = useState<Blob>();

  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!file) return alert("File not found!");

    setBusy(true);

    adaptemojiApi
      .convert(file, resize, negative)
      .then((res) => {
        if (!res || (res as APIError).status)
          return setErrorMessage((res as APIError).message);

        setAdaptiveEmoji(res as Blob);
      })
      .catch((err) => setErrorMessage(err));

    setBusy(false);
  };

  return (
    <>
      <dialog open={errorMessage != undefined}>
        <article>
          <h2>Error happened!</h2>
          <p>{errorMessage}</p>
          <footer>
            <button onClick={() => setErrorMessage(undefined)}>OK</button>
          </footer>
        </article>
      </dialog>

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
    </>
  );
}
