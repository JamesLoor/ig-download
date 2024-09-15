import { title, subtitle } from "@/components/primitives";
import { DownloadIcon, PasteIcon, SearchIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { useState } from "react";

export default function IndexPage() {
  const [url, setUrl] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };

  const handleDownload = async () => {
    try {
      const modifiedUrl = url.replace("www.instagram", "www.ddinstagram");
      const data = await fetch(modifiedUrl);
      console.log(data);
      alert("Download video from: " + url);
    } catch (error) {
      console.error("Failed to download video: ", error);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-12 py-8 md:py-10">
        <div className="flex flex-col max-w-lg text-center justify-center gap-1">
          <h1 className={title()}>
            Descarga tu contenido
            <br />
            <span className={title({ color: "violet" })}>favorito</span> de
            Instagram
          </h1>

          <div className={subtitle()}>Guardalos en tu dispositivo</div>
        </div>

        <div className="flex flex-col gap-4 max-w-screen-sm w-full sm:flex-row">
          <Input
            size="lg"
            type="search"
            aria-label="Search"
            placeholder="Instagram Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            startContent={
              <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Tooltip content="Paste">
            <Button size="lg" isIconOnly onClick={handlePaste}>
              <PasteIcon className="text-base text-default-600 pointer-events-none flex-shrink-0" />
            </Button>
          </Tooltip>

          <Tooltip content="Download">
            <Button
              size="lg"
              isIconOnly
              onClick={handleDownload}
              disabled={!url}
            >
              <DownloadIcon className="text-base text-default-600 pointer-events-none flex-shrink-0" />
            </Button>
          </Tooltip>
        </div>
      </section>
    </DefaultLayout>
  );
}
